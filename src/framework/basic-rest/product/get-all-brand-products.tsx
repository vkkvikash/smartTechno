import { QueryOptionsType, Product } from "@framework/types";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import FormData from 'form-data';
import { useInfiniteQuery } from "react-query";
import { submitAPI, ProductJSONMaker } from "../../../api/service"

const fetchBrandProducts = async ({ queryKey }: any) => {
    var data = new FormData()
    data.append("brand_id", queryKey[1].brandId)
    const isApiSubscribed: any = await submitAPI(data, "POST", "get/products", {});
    if (isApiSubscribed.success) {
        if (isApiSubscribed?.data?.results) {
            var newData = ProductJSONMaker(isApiSubscribed.data.results);
            return {
                results: newData
            };
        } else {
            return {
                results: []
            }
        }

        //This Method is not working as expected
        // return {
        //     data: {
        //         results: newData
        //     },
        //     paginatorInfo: {
        //         nextPageUrl: "",
        //     },
        // };
    } else {
        return isApiSubscribed.data
        //This Method is not working as expected
        // return {
        //     data: shuffle({ pages: [] }),
        //     paginatorInfo: {
        //         nextPageUrl: "",
        //     },
        // };
    }
};

const useBrandProductsQuery = (options: QueryOptionsType) => {
    return useInfiniteQuery<any, Error>(
        [API_ENDPOINTS.PRODUCTS, options],
        fetchBrandProducts,
        // {
        //     getNextPageParam: ({ paginatorInfo }) => paginatorInfo.nextPageUrl,
        // }
    );
};

export { useBrandProductsQuery, fetchBrandProducts };
