import Button from "@components/ui/button";
import { useUI } from "@contexts/ui.context";
import React from "react";
import { IoStar } from "react-icons/io5";
import ReviewForm from "../form/review-form";



const ProductReviewList: React.FC<any> = () => {
    const data = [
        {
            name: "Devendra B",
            rating: 5,
            email: "xyz@gmail.com",
            review: "Qui magna eu aliquip non esse excepteur ipsum Lorem magna esse. Magna duis ut ad commodo sint laborum laborum cupidatat ipsum eu. Dolore sunt ut anim nostrud quis veniam officia. Sunt occaecat irure Lorem labore reprehenderit est aliquip. Irure consequat ullamco nulla mollit incididunt qui. Id anim ullamco veniam est sunt incididunt nostrud magna do deserunt do do consectetur adipisicing. Aute quis Lorem sunt ullamco in est ipsum commodo laboris proident ipsum id tempor."
        },
        {
            name: "Jack Danials",
            rating: 1,
            email: "xyz@gmail.com",
            review: "Qui magna eu aliquip non esse excepteur ipsum Lorem magna esse. Magna duis ut ad commodo sint laborum laborum cupidatat ipsum eu. Dolore sunt ut anim nostrud quis veniam officia. Sunt occaecat irure Lorem labore reprehenderit est aliquip. Irure consequat ullamco nulla mollit incididunt qui. Id anim ullamco veniam est sunt incididunt nostrud magna do deserunt do do consectetur adipisicing. Aute quis Lorem sunt ullamco in est ipsum commodo laboris proident ipsum id tempor."
        }
    ]

    return (
        <div className="block lg:grid grid-cols-1 gap-x-10 xl:gap-x-14 pt-2 pb-10 lg:pb-14 2xl:pb-20 items-start ">
            {
                data.length > 0 ?
                    <ul className="list-none border-b border-gray-200 py-6">
                        {
                            data.map((item: any, index: number) => {
                                return (
                                    <li className={`${index % 2 == 0 ? "bg-gray-50" : "bg-white"} px-4 py-5 sm:grid reviewLists sm:grid-cols-1 sm:gap-4 sm:px-6`}>
                                        <div className="grid-cols-12">
                                            <h3 className="text-lg md:text-xl lg:text-2xl 2xl:text-3xl xl:leading-10 font-bold text-heading">
                                                {item.name}
                                            </h3>
                                            <div className="flex pb-4">
                                                <div className="flex pr-5" data-rounded-score="5">
                                                    <IoStar />
                                                    <IoStar />
                                                    <IoStar />
                                                    <IoStar />
                                                    <IoStar />
                                                </div>
                                            </div>
                                            <p>{item?.review}</p>
                                        </div>
                                    </li>
                                )
                            })
                        }
                    </ul>
                    :
                    ""
            }
        </div>
    );
};

export default ProductReviewList;
