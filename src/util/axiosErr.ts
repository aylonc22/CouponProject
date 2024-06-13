import { AxiosError } from "axios";
import notify from "./notif";
import { couponSystem } from "../redux/store";
import { logoutAction } from "../redux/authReducer";
import { resetCompanyState } from "../redux/companyReducer";
import { useAuthRedirect } from "../hooks/useAuthRedirect";

export function axiosErrHandler(err:AxiosError):string{
    if(err.response)
        {  
            if(err.response.status===401){
                    couponSystem.dispatch(logoutAction());
                    couponSystem.dispatch(resetCompanyState());
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