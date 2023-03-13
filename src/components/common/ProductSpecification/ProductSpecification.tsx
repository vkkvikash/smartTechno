import React from "react";



const ProductSpecification: React.FC<any> = ({ data }) => {


    return (
        <>
            <div className="overflow-hidden bg-white shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg font-semibold leading-6 text-black-900">Product Specification</h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-600">Product's full specification and details.</p>
                </div>
                <div className="border-t border-gray-200">
                    <dl>
                        {data.map((item: any, index: number) => {
                            return (
                                <div
                                    className={`${index % 2 == 0 ? "bg-gray-50" : "bg-white"} px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6`}
                                    key={index + `-item`}
                                >
                                    <dt className="text-sm font-semibold text-gray-600 ">
                                        {item.specification_name}
                                    </dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                        {item.specification_value}
                                    </dd>
                                </div>
                            )
                        })}

                    </dl>
                </div>
            </div>
        </>
    );
};

export default ProductSpecification;
