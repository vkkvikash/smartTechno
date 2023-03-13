import { QueryOptionsType } from "@framework/types";
import FormData from 'form-data';
import { useInfiniteQuery } from "react-query";
import { submitAPI } from "../../../api/service"
import { baseUrl } from "src/config/constants";

const fetchProducts = async ({ queryKey }: any) => {
	var data = new FormData()
	const [_key, _params] = queryKey;
	data.append("category_slug", _params.slug)
	const isApiSubscribed: any = await submitAPI(data, "POST", "get/products", {});
	if (isApiSubscribed.success) {
		return isApiSubscribed.data
	} else {
		return isApiSubscribed.data
	}
};

const useProductsQuery = (options: QueryOptionsType) => {
	return useInfiniteQuery<any, Error>(
		[baseUrl + "get/products", options],
		fetchProducts,
	);
};

export { useProductsQuery, fetchProducts };
