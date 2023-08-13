"use client"

import {createContext, useEffect, useState} from "react";
import * as PushAPI from '@pushprotocol/restapi';
import {useAccount, useNetwork, useWalletClient} from "wagmi";
const env = 'staging';
export const WrapperContext = createContext();
export function Wrapper ({children})  {
     const {address, isConnected} = useAccount();
     const {chain}  = useNetwork();
     const [user, setUser] = useState();
     const [chats, setChats] = useState();
     const { data: signer, isError, isLoading } = useWalletClient()

     useEffect(() => {
         if (!signer || !address || !chain?.id) return;
         (async () => {
             const selectedUser = await PushAPI.user.get({
                 account: address, // ethers.js signer
                 env,
             });
             setUser(selectedUser);
             let pgpPrivateKey = null;
             if (selectedUser?.encryptedPrivateKey) {
                 pgpPrivateKey = await PushAPI.chat.decryptPGPKey({
                     encryptedPGPPrivateKey: selectedUser.encryptedPrivateKey,
                     signer: signer,
                     account: address,
                     env
                 })
             }
             const chat = await PushAPI.chat.chats({
                 account: address,
                 toDecrypt: true,
                 pgpPrivateKey: pgpPrivateKey,
                 env,
             })
             console.log(chat);
             setChats(chat);
             console.log(user, chat, signer);
         })();
     },[signer, address, chain]);
    return (
        <WrapperContext.Provider value={{ user, chats, signer }}>
            {children}
        </WrapperContext.Provider>
)
}