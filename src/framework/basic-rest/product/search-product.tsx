import { QueryOptionsType, Product } from "@framework/types";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import shuffle from "lodash/shuffle";
import FormData from 'form-data';
import { useInfiniteQuery } from "react-query";
import { submitAPI, ProductJSONMaker } from "../../../api/service"

// type PaginatedProduct = {
// 	data: any;
// 	paginatorInfo: any;
// };
const searchProducts = async ({ queryKey }: any) => {
    var data = new FormData()
    const [_key, _params] = queryKey;
    data.append("search", _params.q)
    const isApiSubscribed: any = await submitAPI(data, "POST", "get/header/search", {});
    if (isApiSubscribed.success) {

        const newData = ProductJSONMaker(isApiSubscribed.data.results)
        return {
            data: shuffle(newData),
            paginatorInfo: {
                nextPageUrl: "",
            },
        };
    } else {
        // throw new Error(isApiSubscribed.message)
        return {
            data: shuffle([]),
            paginatorInfo: {
                nextPageUrl: "",
            },
        };
    }
};

const useSearchQuery = (options: QueryOptionsType) => {
    return useInfiniteQuery<any, Error>(
        [API_ENDPOINTS.PRODUCTS, options],
        searchProducts,
        {
            getNextPageParam: ({ paginatorInfo }) => paginatorInfo.nextPageUrl,
        }
    );
};

export { useSearchQuery, searchProducts };
