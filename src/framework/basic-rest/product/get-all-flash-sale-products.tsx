import { QueryOptionsType } from '@framework/types';
import { useQuery } from 'react-query';
import FormData from 'form-data';
import { submitAPI } from "../../../api/service"
import { baseUrl } from "../../../config/constants"

export const fetchFlashSaleProducts = async ({ queryKey }: any) => {
  var data = new FormData();

  const isApiSubscribed: any = await submitAPI(data, "POST", "get/products", { 'Content-Type': 'multipart/form-data' });
  if (isApiSubscribed.success) {
    return isApiSubscribed.data
  } else {
    return isApiSubscribed.data
  }
};

const fetchAncientFlashSaleProducts = async ({ queryKey }: any) => {
  var data = new FormData();

  const isApiSubscribed: any = await submitAPI(data, "POST", "get/products", { 'Content-Type': 'multipart/form-data' });
  if (isApiSubscribed.success) {
    return isApiSubscribed.data
  } else {
    return isApiSubscribed.data
  }
};

export const useFlashSaleProductsQuery = (options: QueryOptionsType) => {
  if (options.demoVariant === 'ancient') {
    return useQuery<any, Error>([baseUrl + "get/products", options], fetchAncientFlashSaleProducts);
  }

  return useQuery<any, Error>([baseUrl + "get/products", options], fetchFlashSaleProducts);
};
