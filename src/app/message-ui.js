import * as PushAPI from '@pushprotocol/restapi';
import {useAccount, useNetwork} from "wagmi";
import {useEffect, useRef, useState} from "react";
import {produce} from "immer";
import {initVideoCallData} from "@pushprotocol/restapi/src/lib/video";
import {usePushSocket} from "@/app/usePushSocket";
import VideoPlayer from "@/app/video-player";

const env = 'staging';

export const MessageUi = ({user, signer, chats}) => {
    const {address, isConnected} = useAccount();
    const {chain} = useNetwork();
    const [selectedChat, setSelectedChat] = useState();
    const [recipient, setRecipient] = useState();
    const [chatHistory, setChatHistory] = useState();
    const chatMessageRef = useRef();
    const [data, setData] = useState(initVideoCallData);
    const videoObjectRef = useRef();
    const {pushSocket, isPushSocketConnected, latestFeedItem} = usePushSocket({env});
    const toggleModalRef = useRef();

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

    }, [signer, address, chain]);
    // },[address, chain]);

    useEffect(() => {
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
        console.log("data change", data);
    }, [data.incoming, data.local.address, data.local.stream, data.meta.chatId]);

    useEffect(() => {
        if (!pushSocket?.connected) {
            pushSocket?.connect();
        }
    }, [pushSocket]);
    useEffect(() => {
        console.log('latestFeedItem', latestFeedItem);
        if (!isPushSocketConnected || !latestFeedItem) return;
        const {payload} = latestFeedItem || [];
        if (
            !Object.prototype.hasOwnProperty.call(payload, "data") ||
            !Object.prototype.hasOwnProperty.call(payload["data"], "additionalMeta")
        )
            return;
        const additionalMeta = payload["data"]["additionalMeta"];
        const videoCallMetaData2 = JSON.parse(additionalMeta.data);
        if (!additionalMeta) return;


        // if(!additionalMeta.type !== `${ADDITIONAL_META_TYPE.PUSH_VIDEO}+1`) return;
        const videoCallMetaData = JSON.parse(additionalMeta.data);

        if (videoCallMetaData.status === PushAPI.VideoCallStatus.INITIALIZED) {
            setIncomingVideoCall(videoCallMetaData);
        } else if (videoCallMetaData.status === PushAPI.VideoCallStatus.RETRY_RECEIVED || videoCallMetaData.status === PushAPI.VideoCallStatus.RECEIVED) {
            connectHandler(videoCallMetaData);
        } else if (videoCallMetaData.status === PushAPI.VideoCallStatus.DISCONNECTED) {
            window.location.reload();
        } else if (videoCallMetaData.status === PushAPI.VideoCallStatus.RETRY_INITIALIZED && videoObjectRef.current?.isInitiator()) {
            videoObjectRef.current?.request({
                senderAddress: data.local.address,
                recipientAddress: data.incoming[0].address,
                chatId: data.meta.chatId,
                retry: true,
            });
        }
    }, [latestFeedItem]);

    const setRequestVideoCall = async () => {
        videoObjectRef.current?.setData((oldData) => {
            return produce(oldData, draft => {
                if (!recipient) return;
                if (!selectedChat) return;
                draft.local.address = address;
                draft.incoming[0].address = recipient;
                draft.incoming[0].status = PushAPI.VideoCallStatus.INITIALIZED;
                draft.meta.chatId = selectedChat;
            });
        });
        toggleModalRef.current.click();
        await videoObjectRef.current?.create({video: true, audio: true});
    }
    const setIncomingVideoCall = async (videCallMetaData) => {
        videoObjectRef.current?.setData((oldData) => {
            return produce(oldData, draft => {
                draft.local.address = videCallMetaData.recipientAddress;
                draft.incoming[0].address = videCallMetaData.senderAddress;
                draft.incoming[0].status = PushAPI.VideoCallStatus.RECEIVED;
                draft.meta.chatId = videCallMetaData.chatId;
                draft.meta.initiator.address = videCallMetaData.senderAddress;
                draft.meta.initiator.signal = videCallMetaData.signalData;
            })
        })
        toggleModalRef.current.click();
        await videoObjectRef.current?.create({video: true, audio: true});
    };
    const acceptVideoCallRequest = async () => {
        if (!data.local.stream) return;
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


    const getUserChat = async (chatId,recipient) => {
        setSelectedChat(chatId);
        setRecipient(recipient);
        // pre-requisite API calls that should be made before
        // need to get user and through that encryptedPvtKey of the user
        const user = await PushAPI.user.get({
            account: address,
            env
        });

// need to decrypt the encryptedPvtKey to pass in the api using helper function
        const pgpDecryptedPvtKey = await PushAPI.chat.decryptPGPKey({
            encryptedPGPPrivateKey: user.encryptedPrivateKey,
            signer: signer,
            env
        });

// conversation hash are also called link inside chat messages
        const conversationHash = await PushAPI.chat.conversationHash({
            account: address,
            conversationId: chatId,
            env,
        });

// actual api
        const chatHistory = await PushAPI.chat.history({
            threadhash: conversationHash.threadHash,
            account: address,
            toDecrypt: true,
            pgpPrivateKey: pgpDecryptedPvtKey,
            limit: 10,
            env
        });
        setChatHistory(chatHistory);
        console.log(chatHistory);
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
            messageContent: chatMessageRef.current?.value,
            messageType: 'Text', // can be "Text" | "Image" | "File" | "GIF"
            receiverAddress: selectedChat,
            signer: signer,
            env,
            pgpPrivateKey: pgpDecryptedPvtKey
        });
        await getUserChat(selectedChat);
        chatMessageRef.current.value = '';
    }

    return (
        <>
            <div className="flex flex-row h-[85vh] antialiased text-gray-800">
                <div className="flex flex-row w-96 flex-shrink-0 bg-gray-100 p-4">
                    <div className="flex flex-col w-full h-full pl-4 pr-4 py-4 -mr-4">
                        <div className="flex flex-row items-center">
                            <div className="flex flex-row items-center">
                                <div className="text-xl font-semibold">Messages</div>
                                {
                                    chats?.length ? (
                                        <div
                                            className="flex items-center justify-center ml-2 text-xs h-5 w-5 text-white bg-red-500 rounded-full font-medium">
                                            {chats?.length}
                                        </div>
                                    ) : ''
                                }

                            </div>
                        </div>
                        <div className="mt-5">
                            <ul className="flex flex-row items-center justify-between">
                                <li>
                                    <a href="#"
                                       className="flex items-center pb-3 text-xs font-semibold relative text-indigo-800">
                                        <span>All Conversations</span>
                                        <span
                                            className="absolute left-0 bottom-0 h-1 w-6 bg-indigo-800 rounded-full"></span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="h-full overflow-hidden relative pt-2">
                            <div className="flex flex-col divide-y h-full overflow-y-auto -mx-4">
                                {
                                    chats?.length ? chats.map((chat, index) =>
                                        <div key={index}>
                                            <div className="flex flex-row items-center p-4"
                                                 onClick={() => getUserChat(chat.chatId || '', chat.did)}>
                                                <div
                                                    className="flex items-center justify-center h-10 w-10 rounded-full  font-bold flex-shrink-0">
                                                    <img className="w-10 h-10 rounded-full"
                                                         src={chat?.profilePicture ? chat.profilePicture : 'https://via.placeholder.com/42x42'}
                                                         alt="profile"/>
                                                </div>
                                                <div className="flex flex-col flex-grow ml-3">
                                                    <div className="flex items-center">
                                                        <div className="text-sm font-medium">
                                                            {chat?.name ? chat?.name : chat?.wallets ? chat?.wallets.slice(7) : ''}
                                                        </div>
                                                        <div className="h-2 w-2 rounded-full bg-green-500 ml-2"></div>
                                                    </div>
                                                    <div className="text-xs truncate w-40">

                                                        {chat?.msg?.messageObj?.content ? chat?.msg?.messageObj?.content : ''}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>) : 'no conversation yet'
                                }
                            </div>
                            <div className="absolute bottom-0 right-0 mr-2">
                                <button
                                    className="flex items-center justify-center shadow-sm h-10 w-10 bg-red-500 text-white rounded-full">
                                    <svg className="w-6 h-6"
                                         fill="none"
                                         stroke="currentColor"
                                         viewBox="0 0 24 24"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round"
                                              strokeLinejoin="round"
                                              strokeWidth="2"
                                              d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col h-full w-full bg-white px-4 py-6">
                    <div className="flex flex-row items-center py-4 px-6 rounded-2xl shadow">
                        <div
                            className="flex items-center justify-center h-10 w-10 rounded-full bg-pink-500 text-pink-100">
                            T
                        </div>
                        <div className="flex flex-col ml-3">
                            <div className="font-semibold text-sm">UI Art Design</div>
                            <div className="text-xs text-gray-500">Active</div>
                        </div>
                        <div className="ml-auto flex justify-center items-center">
                            <button
                                className="w-52 h-12 mr-4 px-4 py-2.5 bg-indigo-500 rounded-lg justify-center items-center gap-2.5 inline-flex">
                                <div className="text-white text-md font-medium">Create Contract</div>
                            </button>
                            <ul className="flex flex-row items-center space-x-2">
                                <li>
                                    <a onClick={ () => data.incoming[0].status !== PushAPI.VideoCallStatus.RECEIVED ? acceptVideoCallRequest(): setRequestVideoCall()}
                                       className="flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-400 h-10 w-10 rounded-full">
                <span>
                  <svg className="w-5 h-5"
                       fill="currentColor"
                       stroke="none"
                       viewBox="0 0 24 24"
                       xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round"
                          strokeLinejoin="round"
                          stroke-width="2"
                          d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                  </svg>
                </span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="h-full overflow-hidden py-4">
                        <div className="h-full overflow-y-auto">
                            <div className="grid grid-cols-12 gap-y-2">
                                {
                                    chatHistory?.length ? chatHistory.sort((a, b) => a - b).map((history, index) =>
                                        history.toDID !== 'eip155:' + address ?
                                            <div key={index} className="col-start-1 col-end-8 p-3 rounded-lg">
                                                <div className="flex flex-row items-center">
                                                    <div
                                                        className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0"
                                                    >
                                                    </div>
                                                    <div
                                                        className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl"
                                                    >
                                                        <div>{history?.messageObj?.content}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            : <div className="col-start-6 col-end-13 p-3 rounded-lg">
                                                <div className="flex items-center justify-start flex-row-reverse">
                                                    <div
                                                        className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0"
                                                    >
                                                    </div>
                                                    <div
                                                        className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl"
                                                    >
                                                        <div>{history?.messageObj?.content}</div>
                                                    </div>
                                                </div>
                                            </div>
                                    ) : ''
                                }
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row items-center">
                        <div className="flex flex-row items-center w-full border rounded-3xl h-12 px-2">
                            <button className="flex items-center justify-center h-10 w-10 text-gray-400 ml-1">
                                <svg className="w-5 h-5"
                                     fill="none"
                                     stroke="currentColor"
                                     viewBox="0 0 24 24"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth="2"
                                          d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path>
                                </svg>
                            </button>
                            <div className="w-full">
                                <input type="text"
                                       ref={chatMessageRef}
                                       className="border border-transparent w-full focus:outline-none text-sm h-10 flex items-center"
                                       placeholder="Type your message...."/>
                            </div>
                            <div className="flex flex-row">
                                <button className="flex items-center justify-center h-10 w-8 text-gray-400">
                                    <svg className="w-5 h-5"
                                         fill="none"
                                         stroke="currentColor"
                                         viewBox="0 0 24 24"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round"
                                              strokeLinejoin="round"
                                              strokeWidth="2"
                                              d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path>
                                    </svg>
                                </button>
                                <button className="flex items-center justify-center h-10 w-8 text-gray-400 ml-1 mr-2"

                                >
                                    <svg className="w-5 h-5"
                                         fill="none"
                                         stroke="currentColor"
                                         viewBox="0 0 24 24"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round"
                                              strokeLinejoin="round"
                                              strokeWidth="2"
                                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className="ml-6">
                            <button
                                onClick={() => sendMessage()}
                                className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-200 hover:bg-gray-300 text-indigo-800 text-white">
                                <svg className="w-5 h-5 transform rotate-90 -mr-px"
                                     fill="none"
                                     stroke="currentColor"
                                     viewBox="0 0 24 24"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth="2"
                                          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <button data-modal-target="defaultModal" data-modal-toggle="defaultModal"
                    className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    type="button" ref={toggleModalRef}>
                Toggle modal
            </button>

            <div id="defaultModal" tabIndex="-1" aria-hidden="true"
                 className="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
                <div className="relative w-full max-w-2xl max-h-full">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                             Video Call
                            </h3>
                            <button type="button"
                                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                    data-modal-hide="defaultModal">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                     fill="none"
                                     viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                          strokeWidth="2"
                                          d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <div className="w-full h-[300px]">
                            {/*<h1>Local</h1>*/}
                            <VideoPlayer className="w-full h-[300px]" stream={data.local.stream}/>
                        </div>
                        <div className="w-full h-[600px]">
                            {/*<h1>Incoming</h1>*/}
                            <VideoPlayer className="w-full h-[600px]"  stream={data.incoming[0].stream}/>
                        </div>
                        <div
                            className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                            <button data-modal-hide="defaultModal" type="button"
                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">I
                                accept
                            </button>
                            <button data-modal-hide="defaultModal" type="button"
                                    className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Decline
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}