export const Notifications = () =>{
    return (<>
        <div className="w-full rounded overflow-hidden shadow-lg border border-gray-200">
                <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">Notifications</div>

                    <div className="w-full flex my-4">
                        <div className="w-8 h-8 m-2 bg-zinc-100 rounded-full flex justify-center items-center">
                            <img className="w-6 h-6" src="/icons/notification.svg" alt="notification"/>
                        </div>
                        <div className="w-full">
                            <h4 className="text-black text-md font-bold">Contract</h4>
                            <h6 className="text-black text-md font-medium">Contract with Maximilian has started</h6>
                        </div>
                    </div>
                    <div className="h-px border border-gray-200"></div>
                    <div className="w-full flex my-4">
                        <div className="w-8 h-8 m-2 bg-zinc-100 rounded-full flex justify-center items-center">
                            <img className="w-6 h-6" src="/icons/notification.svg" alt="notification"/>
                        </div>
                        <div className="w-full">
                            <h4 className="text-black text-md font-bold">Contract</h4>
                            <h6 className="text-black text-md font-medium">Contract with Maximilian has started</h6>
                        </div>
                    </div>
                </div>
            <div className="h-px border border-gray-200"></div>

            <div className="w-full flex justify-center items-center py-4 cursor-pointer">
                <div className="text-indigo-500 text-md font-normal">See all</div>
            </div>
        </div>
    </>)
}