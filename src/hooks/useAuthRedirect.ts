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
            if(auth!=="" && auth.toUpperCase()!==couponSystem.getState().auth.userType.toUpperCase()){
            notify.error(`Access Denied Only: ${auth} Is Allowed`)
            navigate('/');
        }}
    },[fc,navigate]);

}