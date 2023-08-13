
"use client"

import {Header} from "@/app/header";
import {useContext, useEffect, useState} from "react";
import {WrapperContext} from "@/app/wrapper";
const env = 'staging';
const JobsComponent = () => {
    return (<>
        <Header/>
        <div className="w-full px-32 ">
            <div className="w-full">
                <div className="w-full h-60 p-8 m-4 relative bg-white rounded-lg border border-gray-200">
                    <div className=" text-black text-2xl font-bold">NFT Artist for the next Hyped
                        product.
                    </div>
                    <div className="text-black text-xl font-bold mt-4">Fixed Price 2 ETH</div>
                    <div className="absolute right-8 text-green-700 text-xl font-bold">Applied</div>

                    <div className="w-96 text-black text-xl font-normal mt-4">I’m searchig for the expert
                        artist to create the next gen hyped NFT
                    </div>
                    <div className=" justify-start items-start gap-3 inline-flex mt-4">
                        <div className="px-2.5 py-1 bg-violet-200 rounded-full justify-center items-center gap-2.5 flex">
                            <div className="text-indigo-800 text-base font-medium">NFT</div>
                        </div>
                        <div className="px-2.5 py-1 bg-violet-200 rounded-full justify-center items-center gap-2.5 flex">
                            <div className="text-indigo-800 text-base font-medium">Digital Art</div>
                        </div>
                        <div className="px-2.5 py-1 bg-violet-200 rounded-full justify-center items-center gap-2.5 flex">
                            <div className="text-indigo-800 text-base font-medium">Drawing</div>
                        </div>
                    </div>

                </div>
                <div className="w-full h-60 p-8 m-4 relative bg-white rounded-lg border border-gray-200">
                    <div className=" text-black text-2xl font-bold">NFT Artist for the next Hyped
                        product.
                    </div>
                    <div className="text-black text-xl font-bold mt-4">Fixed Price 2 ETH</div>
                    <div className="absolute right-8 text-green-700 text-xl font-bold">Applied</div>

                    <div className="w-96 text-black text-xl font-normal mt-4">I’m searchig for the expert
                        artist to create the next gen hyped NFT
                    </div>
                    <div className=" justify-start items-start gap-3 inline-flex mt-4">
                        <div className="px-2.5 py-1 bg-violet-200 rounded-full justify-center items-center gap-2.5 flex">
                            <div className="text-indigo-800 text-base font-medium">NFT</div>
                        </div>
                        <div className="px-2.5 py-1 bg-violet-200 rounded-full justify-center items-center gap-2.5 flex">
                            <div className="text-indigo-800 text-base font-medium">Digital Art</div>
                        </div>
                        <div className="px-2.5 py-1 bg-violet-200 rounded-full justify-center items-center gap-2.5 flex">
                            <div className="text-indigo-800 text-base font-medium">Drawing</div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </>)
}
export default JobsComponent;