import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { checkData } from "../util/checkData";
import { couponSystem } from "../redux/store";
import notify from "../util/notif";

export function useAuthRedirect(fc:string = "",auth:string = ""):void{
   
    const navigate = useNavigate();
    useEffect(()=>{
        checkData();           
        if(couponSystem.getState().auth.token.length<10 && (fc!=='Main' && fc!=='About' && fc!=='Shop') ){           
            navigate('/login');           
        }
        else
        {           
            const userType:string =  couponSystem.getState().auth.userType.toLocaleUpperCase()
            if(userType!=="ADMIN" && auth!=="" && auth.toUpperCase()!==userType){
            notify.error(`Access Denied Only: ${auth} Is Allowed`)
            navigate('/');
        }}
    },[fc,navigate]);

}