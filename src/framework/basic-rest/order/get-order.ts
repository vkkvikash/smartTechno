import { Order } from "@framework/types";
import FormData from "form-data";
import { useQuery } from "react-query";
import { submitAPI } from "src/api/service";
import { baseUrl } from "../../../config/constants"
import Cookies from 'universal-cookie';

export const fetchOrder = async (_id: string) => {
  const cookies = new Cookies();
  const Authorization = cookies.get('Authorization');
  const data = new FormData();
  data.append("id", _id)
  if (Authorization) {
    const getOrderDetails: any = await submitAPI(data, "POST", "my/order/details", { Authorization });
    if (getOrderDetails.success) {
      return getOrderDetails.data
    } else {
      return {};
    }
  } else {
    return {};
  }


};
export const useOrderQuery = (id: string) => {
  return useQuery<Order, Error>([baseUrl + "my/order/details", id], () =>
    fetchOrder(id)
  );
};
