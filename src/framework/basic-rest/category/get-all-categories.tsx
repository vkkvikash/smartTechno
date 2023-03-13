import { CategoriesQueryOptionsType, Category } from '@framework/types';
import { useQuery } from 'react-query';
import { submitAPI } from "../../../api/service"
import { baseUrl } from "../../../config/constants"

export const fetchCategories = async ({ queryKey }: any) => {
  const isApiSubscribed: any = await submitAPI({}, "GET", "get/main/category", {});
  if (isApiSubscribed.success) {
    return isApiSubscribed.data
  } else {
    return isApiSubscribed.data
  }
};

const fetchAncientCategories = async ({ queryKey }: any) => {
  const isApiSubscribed: any = await submitAPI({}, "GET", "get/main/category", {});
  if (isApiSubscribed.success) {
    return isApiSubscribed.data
  } else {
    return isApiSubscribed.data
  }
};

export const useCategoriesQuery = (options: CategoriesQueryOptionsType) => {
  if (options.demoVariant === 'ancient') {
    return useQuery<{ categories: { data: Category[] } }, Error>([baseUrl + "get/main/category", options], fetchAncientCategories);
  }
  return useQuery<any, Error>([baseUrl + "get/main/category", options], fetchCategories);
};
