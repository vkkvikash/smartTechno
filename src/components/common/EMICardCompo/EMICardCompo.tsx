import Button from "@components/ui/button";
import Input from "@components/ui/input";
import React, { useState } from "react";


const EMICardCompo: React.FC<any> = () => {

    return (
        <>
            <div className=" rounded overflow-hidden customBoxShadow">
                <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">Check Delivery EMI Option</div>
                    <p className="text-gray-700 text-base">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                    </p>
                </div>
                <div className="px-6 py-4 flex">
                    <Input className="xy" />
                    <Button
                        type="button"
                        className="h-11 md:h-10"
                    >
                        Check Now!
                    </Button>
                </div>
                <div className="px-6 pt-4 pb-2">
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
                </div>
            </div>
        </>
    );
};

export default EMICardCompo;
