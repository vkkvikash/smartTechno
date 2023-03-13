import { QueryOptionsType } from '@framework/types';
import { useQuery } from 'react-query';
import { submitAPI } from "../../../api/service"
import { baseUrl } from "../../../config/constants"

export const fetchBrands = async ({ queryKey }: any) => {
  // const [_key, _params] = queryKey;
  // const  data  = await http.get(baseUrl + "get/brands",);
  // return  {brands:data.data};
  const isApiSubscribed: any = await submitAPI({}, "GET", "get/brands", {});
  if (isApiSubscribed.success) {
    return isApiSubscribed.data
  } else {
    return isApiSubscribed.data
  }
};
const fetchAncientBrands = async ({ queryKey }: any) => {
  // const [_key, _params] = queryKey;
  // const  data  = await http.get(baseUrl + "get/brands",);
  // return {brands:data.data};
  const isApiSubscribed: any = await submitAPI({}, "GET", "get/brands", {});
  if (isApiSubscribed.success) {
    return isApiSubscribed.data
  } else {
    return isApiSubscribed.data
  }
};

export const useBrandsQuery = (options: QueryOptionsType) => {
  if (options.demoVariant === 'ancient') {
    return useQuery<{ brands: []; }, Error>(
      [baseUrl + "get/brands", options],
      fetchAncientBrands
    );
  }

  return useQuery<any, Error>([baseUrl + "get/brands", , options], fetchBrands);
};
