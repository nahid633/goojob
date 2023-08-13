"use client"

import {useEffect, useRef, useState} from "react";
import * as PushAPI from '@pushprotocol/restapi';
import {initVideoCallData} from "@pushprotocol/restapi/src/lib/video";
import {ADDITIONAL_META_TYPE} from "@pushprotocol/restapi/src/lib/payloads";
import {usePushSocket} from "@/app/usePushSocket";
import VideoPlayer from "@/app/video-player";
import {produce} from "immer";
import {useAccount, useNetwork, useWalletClient} from "wagmi";
const env = 'staging';
import { ConnectButton } from '@rainbow-me/rainbowkit';
const ethers = require('ethers');
 const MyComponent = () => {
     const {address, isConnected} = useAccount();
     const {chain}  = useNetwork();
     // const [signer, setSigner]  = useState();
     const {pushSocket, isPushSocketConnected, latestFeedItem} = usePushSocket({env});
     const videoObjectRef = useRef();
     const recipientAddressRef = useRef();
     const chatIdRef = useRef();
     const [data, setData] = useState(initVideoCallData);

     const { data: signer, isError, isLoading } = useWalletClient()

     // init
    useEffect(() => {
        if (!signer || !address || !chain?.id) return;
        (async () => {
            const user = await PushAPI.user.get({
                account: address, // ethers.js signer
                env,
            });
            let pgpPrivateKey = null;
            if (user?.encryptedPrivateKey) {
                pgpPrivateKey = await PushAPI.chat.decryptPGPKey({
                    encryptedPGPPrivateKey: user.encryptedPrivateKey,
                    signer: signer,
                    account: address,
                    env
                })
            }

            videoObjectRef.current = new PushAPI.video.Video({
                signer,
                chainId: chain.id,
                pgpPrivateKey,
                env,
                setData
            });
        })();

    },[signer, address, chain]);
    // },[address, chain]);

     useEffect(() =>{
         (
             async () => {
                 const currentStatus = data.incoming[0].status;
                 if (data.local.stream && currentStatus === PushAPI.VideoCallStatus.INITIALIZED) {
                     await videoObjectRef.current?.request({
                         senderAddress: data.local.address,
                         recipientAddress: data.incoming[0].address,
                         chatId: data.meta.chatId
                     });
                 }
             })()
        console.log("data change",data);
     },[data.incoming,data.local.address, data.local.stream, data.meta.chatId]);

     useEffect(() =>{
         if (!pushSocket?.connected) {
             pushSocket?.connect();
         }
     }, [pushSocket]);
     useEffect(()=> {
         console.log('latestFeedItem',latestFeedItem);
         if(!isPushSocketConnected || !latestFeedItem) return;
         const {payload } = latestFeedItem || [];
         if(
             !Object.prototype.hasOwnProperty.call(payload, "data") ||
             !Object.prototype.hasOwnProperty.call(payload["data"], "additionalMeta")
         )
             return;
         const additionalMeta = payload["data"]["additionalMeta"];
         const videoCallMetaData2= JSON.parse(additionalMeta.data);
         if(!additionalMeta) return;


         // if(!additionalMeta.type !== `${ADDITIONAL_META_TYPE.PUSH_VIDEO}+1`) return;
         const videoCallMetaData= JSON.parse(additionalMeta.data);

         if(videoCallMetaData.status === PushAPI.VideoCallStatus.INITIALIZED){
             setIncomingVideoCall(videoCallMetaData);
         }else if(videoCallMetaData.status === PushAPI.VideoCallStatus.RETRY_RECEIVED || videoCallMetaData.status === PushAPI.VideoCallStatus.RECEIVED){
             connectHandler(videoCallMetaData);
         }else if(videoCallMetaData.status === PushAPI.VideoCallStatus.DISCONNECTED){
             window.location.reload();
         }else if(videoCallMetaData.status === PushAPI.VideoCallStatus.RETRY_INITIALIZED && videoObjectRef.current?.isInitiator()){
             videoObjectRef.current?.request({
                 senderAddress: data.local.address,
                 recipientAddress: data.incoming[0].address,
                 chatId: data.meta.chatId,
                 retry: true,
             });
         }
     },[latestFeedItem]);


     const setRequestVideoCall = async () =>{
     videoObjectRef.current?.setData((oldData) =>{
         return produce(oldData, draft =>{
             if(!recipientAddressRef || !recipientAddressRef.current) return;
             if(!chatIdRef || !chatIdRef.current) return;
             draft.local.address = address;
             draft.incoming[0].address = recipientAddressRef.current?.value;
             draft.incoming[0].status = PushAPI.VideoCallStatus.INITIALIZED;
             draft.meta.chatId = chatIdRef.current?.value;
         });
     });
        await videoObjectRef.current?.create({video: true, audio: true});
    }
    const setIncomingVideoCall =  async (videCallMetaData) =>{
        videoObjectRef.current?.setData((oldData) =>{
            return produce(oldData, draft =>{
                draft.local.address = videCallMetaData.recipientAddress;
                draft.incoming[0].address = videCallMetaData.senderAddress;
                draft.incoming[0].status = PushAPI.VideoCallStatus.RECEIVED;
                draft.meta.chatId = videCallMetaData.chatId;
                draft.meta.initiator.address = videCallMetaData.senderAddress;
                draft.meta.initiator.signal = videCallMetaData.signalData;
            })
        })
        await videoObjectRef.current?.create({video: true, audio: true});
    };
    const acceptVideoCallRequest = async () => {
        if(!data.local.stream) return;
        await videoObjectRef.current?.acceptRequest({
           signalData: data.meta.initiator.signal,
          senderAddress: data.local.address,
          recipientAddress: data.incoming[0].address,
          chatId: data.meta.chatId,
        });
    };
    const connectHandler = async (videCallMetaData) => {
        await videoObjectRef.current?.connect({
            signalData: videCallMetaData.signalData
        });
    };


    //

    const getUserChatWith = async () => {
        // pre-requisite API calls that should be made before
        // need to get user and through that encryptedPvtKey of the user
        const user = await PushAPI.user.get({
            account: `eip155:0xac6B396c65Af5DdE1f565886049E45986A4772f5`,
            env,
        });

    // need to decrypt the encryptedPvtKey to pass in the api using helper function
        const pgpDecryptedPvtKey = await PushAPI.chat.decryptPGPKey({
            encryptedPGPPrivateKey: user.encryptedPrivateKey,
            signer: signer
        });

// actual api
        const response = await PushAPI.chat.history({
            messageContent: "Gm gm!" + new Date().toISOString(),
            messageType: 'Text', // can be "Text" | "Image" | "File" | "GIF"
            receiverAddress:  `eip155:0xFA38fBCD2F040C1b2D8743a2d21541431d968655`,
            signer: signer,
            pgpPrivateKey: pgpDecryptedPvtKey
        });
    }
//
     const creatGroupChat = async () =>{
         const user = await PushAPI.user.get({
             account: address,
             env
         });
// need to decrypt the encryptedPvtKey to pass in the api using helper function
         const pgpDecryptedPvtKey = await PushAPI.chat.decryptPGPKey({
             encryptedPGPPrivateKey: user.encryptedPrivateKey,
             signer: signer
         });

// actual api
         const response = await PushAPI.chat.createGroup({
             groupName:'Push Group Chat 23232232',
             groupDescription: 'This is the official group for Push Protocol',
             members: ['0xac6B396c65Af5DdE1f565886049E45986A4772f5', '0xb43B6701B9a3715af6103e1fbcF7827b6b67b91c'],
             groupImage: null,
             admins: ['0xFA38fBCD2F040C1b2D8743a2d21541431d968655'],
             isPublic: true,
             account: address,
             env,
             pgpPrivateKey: pgpDecryptedPvtKey, //decrypted private key
     });
     };

    const getUserChatRequests  = async () =>{
        const user = await PushAPI.user.get({
            account: address,
            env,
        })

// need to decrypt the encryptedPvtKey to pass in the api using helper function
        const pgpDecrpyptedPvtKey = await PushAPI.chat.decryptPGPKey({
            encryptedPGPPrivateKey: user.encryptedPrivateKey,
            signer: signer,
        })

// Actual api
        const response = await PushAPI.chat.requests({
            account: address,
            toDecrypt: true,
            pgpPrivateKey: pgpDecrpyptedPvtKey,
            env,
        })


    }

    const approve = async () =>{
        const response = await PushAPI.chat.approve({
            status: 'Approved',
            account: address,
            senderAddress : '5a63c9b21c2b26f939e1f1f66b2b97b702d6a91ff027dc25c2b655e2663b047e', // receiver's address or chatId of a group
            signer,
            env
        });

    }
    const approveChat = async () =>{
        const response = await PushAPI.chat.approve({
            status: 'Approved',
            account: address,
            // senderAddress : '2d33d0af3fcd890998679b980db8710b3f0d2ea17f591966adccf9eb619f0ab4', // receiver's address or chatId of a group
            senderAddress : 'b5dcd1a87307f56ed0c61441c041c6448f59915f4876987f5679c8ed6a96ef27', // receiver's address or chatId of a group
            signer,
            env
        });
    }
    const getChatRequests = async () =>{
        // pre-requisite API calls that should be made before
// need to get user and through it, the encryptedPvtKey of the user
        const user = await PushAPI.user.get({
            account: address,
            env,
        })

// need to decrypt the encryptedPvtKey to pass in the api using helper function
        const pgpDecrpyptedPvtKey = await PushAPI.chat.decryptPGPKey({
            encryptedPGPPrivateKey: user.encryptedPrivateKey,
            signer: signer,
        })

// Actual api
        const response = await PushAPI.chat.requests({
            account: address,
            toDecrypt: true,
            pgpPrivateKey: pgpDecrpyptedPvtKey,
            env,
        })
    }




     const sendMessage = async () => {
         // pre-requisite API calls that should be made before
         const user = await PushAPI.user.get({
             account: address,
             env
         });

// need to decrypt the encryptedPvtKey to pass in the api using helper function
         const pgpDecryptedPvtKey = await PushAPI.chat.decryptPGPKey({
             encryptedPGPPrivateKey: user.encryptedPrivateKey,
             signer: signer
         });

// actual api
         const response = await PushAPI.chat.send({
             messageContent: "Hello",
             messageType: 'Text', // can be "Text" | "Image" | "File" | "GIF"
             receiverAddress: `eip155:${recipientAddressRef.current?.value}`,
             signer: signer,
             env,
             pgpPrivateKey: pgpDecryptedPvtKey
         });
         console.log(response);
    }
    return (
    <>
        <main className="">
            <h1>
                {address}
            </h1>
            <div className="w-full">
                <ConnectButton />

            </div>

            <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                    onClick={ () => sendMessage()}> send message
            </button>
            <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                    onClick={ () => approveChat()}> approve chat
            </button>
            <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                    onClick={ () => getChatRequests()}> getChatRequests
            </button>
            <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                    onClick={ () => approve()}> approve group
            </button>
            <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                    onClick={ () => getUserChatRequests()}> getUserChatRequest
            </button>
            <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                    onClick={ () => creatGroupChat()}> create group
            </button>

            <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                    disabled={data.incoming[0].status !== PushAPI.VideoCallStatus.UNINITIALIZED }
                    onClick={ () => setRequestVideoCall()}> Request VideoCall
            </button>

            <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"

                    // disabled={data.incoming[0].status !== PushAPI.VideoCallStatus.RECEIVED }
                    onClick={ () => acceptVideoCallRequest()}>Accept Request VideoCall
            </button>

            <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"

                    disabled={data.incoming[0].status === PushAPI.VideoCallStatus.UNINITIALIZED }
                    onClick={ () => videoObjectRef.current?.disconnect()}>Disconnect
            </button>


      <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
              disabled={data.incoming[0].status === PushAPI.VideoCallStatus.UNINITIALIZED }

              onClick={ () => videoObjectRef.current?.enableVideo({
                        state:!data.local.video
                    })}>Toggle video
            </button>


            <div className="w-1/2">
                <h1>Local</h1>
                <VideoPlayer stream={data.local.stream}/>
            </div>
            <div className="w-1/2">
                <h1>Incoming</h1>
                <VideoPlayer  stream={data.incoming[0].stream}/>
            </div>
            <div className="w-1/2">
                <label htmlFor="recipientAddress" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">recipientAddress</label>
                <input type="text" id="recipientAddress"
                       ref={recipientAddressRef}
                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
            </div>

            <div className="w-1/2">
                <label htmlFor="chatId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ChatID</label>
                <input type="text" id="chatId"
                       ref={chatIdRef}
                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
            </div>

        </main>
    </>
)
}
export default MyComponent;