"use client"
import {MessageUi} from "@/app/message-ui";
import {Header} from "@/app/header";
import {useContext} from "react";
import {WrapperContext} from "@/app/wrapper";

const ChatComponent = () => {
    let {user, chats, signer} = useContext(WrapperContext);

    return <>
        <div className="w-full">
            <Header/>
        </div>
        <div className="w-full">
            <MessageUi user={user} chats={(chats || [])?.filter(chat => chat?.msg?.messageObj?.content)} signer={signer}/>
        </div>
    </>

}
export default ChatComponent;