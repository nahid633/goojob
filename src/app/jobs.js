export const JobsComponent = () =>{
    return (<>
        <div className="w-full rounded overflow-hidden shadow-lg border border-gray-200">
                <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">Job Posted</div>

                    <div className="w-full flex my-4">

                        <div className="w-full">
                            <h4 className="text-black text-md font-bold">Looking for NFT artist</h4>
                            <h6 className="text-black text-md font-medium">posted 10.07.23</h6>
                        </div>
                        <div className="w-8 h-8 m-2 flex justify-center items-center">
                            <div className="text-green-700 text-md font-normal">Started</div>
                        </div>
                    </div>
                    <div className="h-px border border-gray-200"></div>
                    <div className="w-full flex my-4">

                    <div className="w-full">
                        <h4 className="text-black text-md font-bold">Solana Developer 2</h4>
                        <h6 className="text-black text-md font-medium">started 25.07.23</h6>
                    </div>
                    <div className="w-8 h-8 m-2 flex justify-center items-center">
                        <div className="text-zinc-800 text-md font-normal">Finished</div>
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