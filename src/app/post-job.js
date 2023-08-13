export const PostJob = () => {
    return (<>
        <div className="w-full rounded overflow-hidden shadow-lg border border-gray-200">
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">Post a job</div>
                <p>
                    Create a post with your Terms, you can later change Terms in Contract accordingly after agreeing to
                    the Terms with freelancer
                </p>
                <div className="w-96 text-blue-800 text-base font-normal cursor-pointer mt-4">What is Contract?</div>

                <div className="w-full my-8">
                    <input type="text" id="header"
                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           placeholder="Header" required/>

                </div>
                <div className="w-full my-8">
                    <input type="text" id="header"
                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           placeholder="Description" required/>

                </div>
                <div className="w-full my-8">
                    <input type="text" id="header"
                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           placeholder="Type of work (one time, long time contract)" required/>

                </div>
                <div className="w-full my-8">
                    <input type="text" id="header"
                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           placeholder="Due date/ Yearly Contract" required/>

                </div>
                <div className="w-full my-8">
                    <input type="text" id="header"
                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           placeholder="Budget/ Fixed price/ Hourly rate/Yearly rate" required/>

                </div>
                <div className="w-full my-8">
                    <input type="text" id="header"
                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           placeholder="Add tags" required/>

                </div>
                <div className="w-full mt-16 mb-8">
                <div
                    className="w-36 h-12 px-4 py-2.5 bg-indigo-500 rounded-lg justify-center items-center gap-2.5 inline-flex">
                    <div className="text-white text-md font-medium">Post a Job</div>
                </div>

                </div>

            </div>
        </div>
    </>)
}