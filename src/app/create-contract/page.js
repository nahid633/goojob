import {PostJob} from "@/app/post-job";
import {Notifications} from "@/app/notifications";
import {Messages} from "@/app/messages";
import {Header} from "@/app/header";

const CreateContract = () => {
    return (<>
        <Header/>

        <div className="w-full px-32 py-8">
            <div className="w-full flex gap-4 py-4">
                <div className="w-full">
                    <div className="w-full rounded overflow-hidden shadow-lg border border-gray-200">

                        <div id="accordion-open" data-accordion="open">
                            <h2 id="accordion-open-heading-1">
                                <button type="button"
                                        className="flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                                        data-accordion-target="#accordion-open-body-1" aria-expanded="true"
                                        aria-controls="accordion-open-body-1">
                                         <span className="flex items-center">Choose the contract type “NFT Artist” Project</span>
                                    <svg data-accordion-icon className="w-3 h-3 rotate-180 shrink-0" aria-hidden="true"
                                         xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                              stroke-width="2"
                                              d="M9 5 5 1 1 5"/>
                                    </svg>
                                </button>
                            </h2>
                            <div id="accordion-open-body-1" className="hidden"
                                 aria-labelledby="accordion-open-heading-1">
                                <div
                                    className="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
                                    <p className="mb-2 text-md dark:text-gray-400">Create a Contract to start
                                        the project</p>
                                </div>
                                <div className="w-full flex flex-col justify-center items-center py-2 ">


                                    <button id="dropdownDividerButton" data-dropdown-toggle="dropdownDivider"
                                            className="text-black  border font-medium rounded-lg text-sm px-5 py-2.5
                                            text-center inline-flex items-center"
                                            type="button">NFT Artist Project <svg className="w-2.5 h-2.5 ml-2.5"
                                                                                aria-hidden="true"
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                                fill="none" viewBox="0 0 10 6">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                              stroke-width="2" d="m1 1 4 4 4-4"/>
                                    </svg>
                                    </button>

                                    <div id="dropdownDivider"
                                         className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200"
                                            aria-labelledby="dropdownDividerButton">
                                            <li>
                                                <a href="#"
                                                   className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
                                            </li>
                                        </ul>
                                    </div>

                                </div>
                                <div className="w-full flex flex-col justify-center items-center py-2">


                                    <button id="dropdownDividerButton" data-dropdown-toggle="dropdownDivider"
                                            className="text-black  border font-medium rounded-lg text-sm px-5 py-2.5
                                            text-center inline-flex items-center"
                                            type="button">Send to<svg className="w-2.5 h-2.5 ml-2.5"
                                                                                  aria-hidden="true"
                                                                                  xmlns="http://www.w3.org/2000/svg"
                                                                                  fill="none" viewBox="0 0 10 6">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                              stroke-width="2" d="m1 1 4 4 4-4"/>
                                    </svg>
                                    </button>

                                    <div id="dropdownDivider"
                                         className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200"
                                            aria-labelledby="dropdownDividerButton">
                                            <li>
                                                <a href="#"
                                                   className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
                                            </li>
                                        </ul>
                                    </div>

                                </div>

                                <div className="w-full flex flex-col justify-center items-center py-2">


                                    <button id="dropdownDividerButton" data-dropdown-toggle="dropdownDivider"
                                            className="text-black  border font-medium rounded-lg text-sm px-5 py-2.5
                                            text-center inline-flex items-center"
                                            type="button">Type <svg className="w-2.5 h-2.5 ml-2.5"
                                                                                  aria-hidden="true"
                                                                                  xmlns="http://www.w3.org/2000/svg"
                                                                                  fill="none" viewBox="0 0 10 6">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                              stroke-width="2" d="m1 1 4 4 4-4"/>
                                    </svg>
                                    </button>

                                    <div id="dropdownDivider"
                                         className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200"
                                            aria-labelledby="dropdownDividerButton">
                                            <li>
                                                <a href="#"
                                                   className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
                                            </li>
                                        </ul>
                                    </div>

                                </div>
                            </div>

                            <div className="w-full">
                                <button
                                    className="w-20 h-12 m-4 px-4 py-2.5 bg-indigo-500 rounded-lg justify-center items-center gap-2.5 inline-flex">
                                    <div className="text-white text-md font-medium">Next</div>
                                </button>
                            </div>

                            <h2 id="accordion-open-heading-2">
                                <button type="button"
                                        className="flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-b-0 border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                                        data-accordion-target="#accordion-open-body-2" aria-expanded="false"
                                        aria-controls="accordion-open-body-2">
                        <span className="flex items-center">Terms of the Contracts</span>
                                    <svg data-accordion-icon className="w-3 h-3 rotate-180 shrink-0" aria-hidden="true"
                                         xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                              stroke-width="2"
                                              d="M9 5 5 1 1 5"/>
                                    </svg>
                                </button>
                            </h2>



                            <div id="accordion-open-body-2" className="hidden"
                                 aria-labelledby="accordion-open-heading-2">
                                <div className="p-5 border border-b-0 border-gray-200 dark:border-gray-700">
                                    <p className="mb-2 text-gray-500 dark:text-gray-400">Assign your Terms of Contract</p>
                                </div>
                                <div className="w-full flex justify-center items-center">
                                    <input type="text"
                                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 "/>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>


    </>)
}
export default CreateContract;