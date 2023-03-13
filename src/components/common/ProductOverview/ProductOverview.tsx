import React from "react";



const ProductOverview: React.FC<any> = ({ data }) => {

    const dummyImage = "https://s3.amazonaws.com/prod-media.gameinformer.com/styles/full/s3/2018/08/14/7b4d5863/xboxelitecontroller.jpg"
    return (
        <>
            <div className="grid bg-black overviewCardWrap">
                {
                    data.map((element: any, index: number) => {
                        if (element.text_align === "center") {
                            return (
                                <div className="grid justify-center py-5 md:px-20 sm:px-14">
                                    <img src={element.image} className="overviewImglarge" />
                                    <div className="py-5 md:px-20 sm:px-14 text-center">
                                        <h2 className="text-lg font-bold text-white">{element.title}</h2>
                                        <p className="text-gray-500 py-4">{element.model}</p>
                                    </div>
                                </div>
                            )
                        }
                        else if (element.text_align === "left") {
                            return (
                                <div className="grid items-center gap-4 grid-cols-2 py-5 md:px-20 sm:px-14">
                                    <div >
                                        <h2 className="text-lg font-bold text-white">{element.title}</h2>
                                        <p className="text-gray-500 py-4">{element.model}</p>
                                    </div>
                                    <div className="grid justify-center">
                                        <img src={element.image || dummyImage} className="overviewImgSmall" />
                                    </div>
                                </div>
                            )
                        }
                        else if (element.text_align === "right") {
                            return (
                                <div className="grid items-center gap-4 grid-cols-2 py-5 md:px-20 sm:px-14">
                                    <div className="grid justify-center">
                                        <img src={element.image || dummyImage} className="overviewImgSmall" />
                                    </div>
                                    <div >
                                        <h2 className="text-lg font-bold text-white">{element.title}</h2>
                                        <p className="text-gray-500 py-4">{element.model}</p>
                                    </div>
                                </div>
                            )
                        }
                    })
                }
            </div>
        </>
    );
};

export default ProductOverview;
