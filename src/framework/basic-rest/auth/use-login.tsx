import FormData from 'form-data';
import { submitAPI } from "../../../api/service"

export interface LoginInputType {
  mobile: string;
}
export const login = async (input: LoginInputType) => {
  var data = new FormData();
  data.append('mobile', input.mobile);
  const isApiSubscribed: any = await submitAPI(data, "POST", "login", { 'Content-Type': 'multipart/form-data' });
  if (isApiSubscribed.success) {
    return isApiSubscribed
  } else {
    return isApiSubscribed
  }
}

