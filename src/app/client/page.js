"use client"

import {Notifications} from "@/app/notifications";
import {JobsComponent} from "@/app/jobs";
import {Contracts} from "@/app/contracts";
import {Messages} from "@/app/messages";
import {Profile} from "@/app/profile";
import {Header} from "@/app/header";
import {useContext, useEffect, useState} from "react";
import {WrapperContext} from "@/app/wrapper";
const env = 'staging';
const ClientComponent = () => {
    let {user, chats} = useContext(WrapperContext);
    return (<>
        <Header/>
        <div className="w-full px-32 py-8">
        <div className="w-full">
            <Profile user={user}/>
        </div>
        <div className="w-full flex gap-4 py-4">
            <div className="w-2/3">
                <Messages chats={chats}/>
            </div>
            <div className="w-1/3">
                <Notifications/>
            </div>
        </div>
        <div className="w-full flex gap-4">
            <div className="w-2/3">
                <Contracts/>
            </div>
            <div className="w-1/3">
                <JobsComponent/>
            </div>
        </div>
        </div>
    </>)
}
export default ClientComponent;