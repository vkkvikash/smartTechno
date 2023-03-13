import { Product } from "@framework/types";
// import http from "@framework/utils/http";
// import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { useQuery } from "react-query";
import FormData from 'form-data';
import { submitAPI } from "../../../api/service"
import { baseUrl } from "../../../config/constants"

export const fetchProduct = async (_slug: string) => {
  var data = new FormData();
  data.append("slug", _slug)
  const isApiSubscribed: any = await submitAPI(data, "POST", "get/product/details", { 'Content-Type': 'multipart/form-data' });
  if (isApiSubscribed.success) {
    return isApiSubscribed.data
  } else {
    // throw new Error(isApiSubscribed.message)
    return isApiSubscribed.data
  }
};
export const useProductQuery = (slug: string) => {
  return useQuery<Product, Error>([baseUrl + "get/product/details", slug], () =>
    fetchProduct(slug)
  );
};
