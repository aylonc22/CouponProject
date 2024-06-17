import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { checkData } from "../util/checkData";
import { couponSystem } from "../redux/store";

export function useAuthRedirect(fc:string = ""):void{
   
    const navigate = useNavigate();
    useEffect(()=>{
        checkData();   
        if(couponSystem.getState().auth.token.length<10 && fc!=='Main' && fc!=='About'){           
            navigate('/login');
        }
    },[fc,navigate]);

}