import { AxiosError } from "axios";
import notify from "./notif";
import { couponSystem } from "../redux/store";
import { logoutAction } from "../redux/authReducer";
import { resetCouponState } from "../redux/couponsReducer";

export function axiosErrHandler(err:AxiosError):string{
    if(err.response)
        {  
            if(err.response.status===401){
                    couponSystem.dispatch(logoutAction());
                    couponSystem.dispatch(resetCouponState());
                    notify.error("Token expired");  
                    return 'Unauthorized';
            }
            if(err.response.data)
                {
                    notify.error(JSON.parse(JSON.stringify(err.response.data))['value']);
                }
        }
        return err.message;
}