import Link from "next/link";

export const Messages = ({chats}) =>{
    return (<>
        <div className="w-full rounded overflow-hidden shadow-lg border border-gray-200">
                <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">Messages</div>
                    {
                        chats?.length ?
                            chats.filter(chat => chat?.msg?.messageContent).map((chat, index) =>
                                    <div key={index}>
                                        <div  className="w-full flex my-4">
                                            <div
                                                className="w-8 h-8 m-2 bg-zinc-100 rounded-full flex justify-center items-center">
                                                <img className="w-6 h-6 rounded-full" src={chat?.profilePicture ? chat.profilePicture :'https://via.placeholder.com/42x42'}
                                                     alt="profile"/>
                                            </div>
                                            <div className="w-full">
                                                <h4 className="w-1/2 text-black text-xs font-bold">
                                                    {chat?.name ? chat?.name: chat?.wallets ? chat.wallets.slice(7) : ''}
                                                </h4>
                                                <h6 className="text-black text-md font-medium">{chat?.msg?.messageContent ? chat?.msg?.messageContent: ''}</h6>
                                            </div>
                                        </div>
                                        <div className="h-px border border-gray-200"></div>
                                    </div>
                            )
                            : ''
                    }
                </div>
            <div className="w-full flex justify-center items-center py-4 cursor-pointer">
                <Link href='/chat'>
                <div className="text-indigo-500 text-md font-normal">See all</div>
                </Link>
            </div>
        </div>
    </>)
}