
import React, { useState } from "react";
const SimilerProductsLinkcard: React.FunctionComponent<{ images: any }> = ({ images }) => {

    return (
        <>

            <div className="container flex flex-col items-center justify-center w-full mx-auto bg-white rounded-lg shadow dark:bg-gray-800">
                <ul className="flex flex-col divide-y divide">
                    <li className="flex flex-row">
                        <div className="flex items-center flex-1 p-4 cursor-pointer select-none">
                            <div className="flex flex-col items-center justify-center w-10 h-10 mr-4">
                                <a href="#" className="relative block">
                                    <img alt="profil" src="/images/person/6.jpg" className="mx-auto object-cover rounded-full h-10 w-10 " />
                                </a>
                            </div>
                            <div className="flex-1 pl-1 mr-16">
                                <div className="font-medium dark:text-white">
                                    Jean Marc
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-200">
                                    Developer
                                </div>
                            </div>
                            <div className="text-xs text-gray-600 dark:text-gray-200">
                                6:00 AM
                            </div>
                        </div>
                    </li>
                    <li className="flex flex-row">
                        <div className="flex items-center flex-1 p-4 cursor-pointer select-none">
                            <div className="flex flex-col items-center justify-center w-10 h-10 mr-4">
                                <a href="#" className="relative block">
                                    <img alt="profil" src="/images/person/10.jpg" className="mx-auto object-cover rounded-full h-10 w-10 " />
                                </a>
                            </div>
                            <div className="flex-1 pl-1 mr-16">
                                <div className="font-medium dark:text-white">
                                    Designer
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-200">
                                    Charlie Moi
                                </div>
                            </div>
                            <div className="text-xs text-gray-600 dark:text-gray-200">
                                6:00 AM
                            </div>
                        </div>
                    </li>
                    <li className="flex flex-row">
                        <div className="flex items-center flex-1 p-4 cursor-pointer select-none">
                            <div className="flex flex-col items-center justify-center w-10 h-10 mr-4">
                                <a href="#" className="relative block">
                                    <img alt="profil" src="/images/person/3.jpg" className="mx-auto object-cover rounded-full h-10 w-10 " />
                                </a>
                            </div>
                            <div className="flex-1 pl-1 mr-16">
                                <div className="font-medium dark:text-white">
                                    CEO
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-200">
                                    Marine Jeanne
                                </div>
                            </div>
                            <div className="text-xs text-gray-600 dark:text-gray-200">
                                6:00 AM
                            </div>
                        </div>
                    </li>
                    <li className="flex flex-row">
                        <div className="flex items-center flex-1 p-4 cursor-pointer select-none">
                            <div className="flex flex-col items-center justify-center w-10 h-10 mr-4">
                                <a href="#" className="relative block">
                                    <img alt="profil" src="/images/person/7.jpg" className="mx-auto object-cover rounded-full h-10 w-10 " />
                                </a>
                            </div>
                            <div className="flex-1 pl-1 mr-16">
                                <div className="font-medium dark:text-white">
                                    CTO
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-200">
                                    Boby PArk
                                </div>
                            </div>
                            <div className="text-xs text-gray-600 dark:text-gray-200">
                                6:00 AM
                            </div>
                        </div>
                    </li>
                </ul>
            </div>

        </>
    )
}

export default SimilerProductsLinkcard

// -----------------------------------------------------------------------------------------------------

