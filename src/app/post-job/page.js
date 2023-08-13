"use client"
import {Notifications} from "@/app/notifications";
import {Messages} from "@/app/messages";
import {PostJob} from "@/app/post-job";
import {Header} from "@/app/header";
import {useContext} from "react";
import {WrapperContext} from "@/app/wrapper";

const ClientComponent =  () => {
    let {user, chats} = useContext(WrapperContext);
    return (<>
        <Header/>
        <div className="w-full px-32 py-8">
            <div className="w-full flex gap-4 py-4">
                <div className="w-2/3">
                    <PostJob/>
                </div>
                <div className="w-1/3">
                    <Notifications/>
                    <br/>
                    <br/>
                    <Messages chats={chats}/>
                </div>
            </div>
        </div>
    </>)
}
export default ClientComponent;

