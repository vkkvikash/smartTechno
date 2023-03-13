import { ShopsQueryOptionsType, Shop } from "@framework/types";
import { useQuery } from "react-query";
import { submitAPI } from "src/api/service";
import { baseUrl } from "../../../config/constants"

export const fetchShops = async ({ queryKey }: any) => {

	const getShopDetails: any = await submitAPI({}, "GET", "vendor/lists", { 'Content-Type': 'multipart/form-data' });
	if (getShopDetails.success) {
		const data = getShopDetails.data.results;
		if (getShopDetails.data.length) {
			return { shop: { data } };
		} else {
			return { shop: { data } };
		}
	} else {
		const data = getShopDetails.data
		return { shop: { data } };
	}

};

export const useShopsQuery = (options: ShopsQueryOptionsType) => {
	return useQuery<{ shop: { data: Shop[] } }, Error>(
		[baseUrl + "vendor/details", options],
		fetchShops
	);
};
