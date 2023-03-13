import { useQuery } from "react-query";
import FormData from "form-data";
import { submitAPI, ProductJSONMaker } from "src/api/service";
import { baseUrl } from "../../../config/constants"

export const fetchShop = async (_slug: string) => {
	const dataToSend = new FormData();
	dataToSend.append("id", Number(_slug))
	const getSingleShopDetails: any = await submitAPI(dataToSend, "POST", "vendor/details", { 'Content-Type': 'multipart/form-data' });
	if (getSingleShopDetails.success) {
		const data = getSingleShopDetails.data;
		const productList = ProductJSONMaker(getSingleShopDetails.data.productvendor?.results)
		data["productList"] = productList
		if (getSingleShopDetails.data.length) {
			return data;
		} else {
			return data;
		}
	} else {
		return [];
	}
};
export const useShopQuery = (slug: string) => {
	return useQuery<any, Error>([baseUrl + "vendor/details", slug], () =>
		fetchShop(slug)
	);
};
