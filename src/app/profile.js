import Link from "next/link";

export const Profile = ({user, talent}) => {
    return (<>
        <div className="w-full rounded overflow-hidden shadow-lg border border-gray-200">
            <div className="px-6 py-4">
                <div className="w-full flex my-4">
                    <div className="w-1/6">
                        <div className="w-full">
                            <img className="w-20 h-20 rounded-full" src={ user?.profile?.picture ? user.profile.picture : 'https://via.placeholder.com/84x84'}/>
                        </div>
                    </div>
                    <div className="w-3/6">
                        <div className="text-black text-xl font-bold">{user?.profile?.name ? user.profile.name : (user?.wallets ? user?.wallets?.slice(7) : '')}</div>
                        <div className="w-80 text-black text-base font-medium">Munich, Germany – {new Date().toLocaleTimeString()}
                        </div>
                        <div className="w-full flex pt-8">
                            <div className="w-1/3">
                                <div className="text-black text-lg font-bold">+5 ETH</div>
                                <div className="w-52 text-black text-base font-normal">Total {talent ? 'spent': 'earned'} +5 ETH</div>
                            </div>
                            <div className="w-1/3">
                                <div className="text-black text-lg font-bold">5</div>
                                <div className="w-52 text-black text-base font-normal">Jobs {talent ? 'Applied' : 'Posted'}</div>
                            </div>

                            {!talent ?
                                <div className="w-1/3">
                                <div className="text-black text-lg font-bold">3</div>
                                <div className="w-52 text-black text-base font-normal">Contracts created</div>
                            </div>: ''
                            }
                        </div>
                    </div>
                    {!talent ?
                    <div className="w-2/6 flex">
                        <button
                            className="w-44 h-12 px-4 rounded-lg border border-indigo-500 justify-center items-center flex mx-1">
                            <Link href='/post-job'>
                            <div className="text-gray-900 text-md font-medium">Post New Job</div>
                            </Link>
                        </button>
                        <button
                            className="w-52 h-12 px-4 bg-indigo-500 rounded-lg justify-center items-center mx-1 flex">
                            <Link href='/create-contract'>
                            <div className="text-white text-md font-medium">Create Contract</div>
                            </Link>
                        </button>
                    </div>:    <div className="w-2/6 flex">
                            <button
                                className="w-52 h-12 px-4 bg-indigo-500 rounded-lg justify-center items-center mx-1 flex">
                                <Link href='/find-job'>
                                    <div className="text-white text-md font-medium">Find Job</div>
                                </Link>
                            </button>
                        </div>
                    }
                </div>
            </div>
        </div>
    </>)
}