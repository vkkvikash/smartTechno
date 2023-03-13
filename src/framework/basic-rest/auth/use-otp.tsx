import FormData from 'form-data';
import { submitAPI } from "../../../api/service"

export interface OtpInputType {
  otp: string | number;
  mobile: string | number;
  device_token: number | null | undefined;
  device_type: any;
}
export const verify = async (input: OtpInputType) => {
  var data = new FormData();
  data.append('otp', input.otp);
  data.append('mobile', input.mobile);
  data.append('device_token', `${input.device_token}`);
  data.append('device_type', `${input.device_type}`);
  const isApiSubscribed: any = await submitAPI(data, "POST", "user/otp/check", { 'Content-Type': 'multipart/form-data' });
  if (isApiSubscribed.success) {
    return isApiSubscribed
  } else {
    return isApiSubscribed
  }
}


