import FormData from 'form-data';
import { submitAPI } from "../../../api/service"

export interface SignUpInputType {
  mobile: string;
  name: string;
}

export const signUp = async (input: SignUpInputType) => {
  var data = new FormData();
  data.append('mobile', input.mobile);
  data.append('first_name', input.name);
  const isApiSubscribed: any = await submitAPI(data, "POST", "register", { 'Content-Type': 'multipart/form-data' });
  if (isApiSubscribed.success) {
    return isApiSubscribed
  } else {
    return isApiSubscribed
  }
}

