import { jwtDecode } from "jwt-decode";
import { loginAction } from "../redux/authReducer";
import { couponSystem } from "../redux/store";
import { useNavigate } from "react-router-dom";
import { resetCompanyState } from "../redux/companyReducer";

type jwtData = {
    "userType": string,
    "userName": string,
    'userId':number,
    "sub": string,
    "iat": number,
    "exp": number
}

export const checkData = () => {    
    if (couponSystem.getState().auth.token.length < 10) {        
        try {           
            const JWT = sessionStorage.getItem("jwt")!;
            const decoded_jwt = jwtDecode<jwtData>(JWT);            
            let myAuth = {
                name: decoded_jwt.userName,
                email: decoded_jwt.sub,
                userId:decoded_jwt.userId,
                token: JWT,
                userType: decoded_jwt.userType,
                isLogged: true
            };            
            couponSystem.dispatch(loginAction(myAuth));
            couponSystem.dispatch(resetCompanyState());
        } catch {           
            return;
        }

    }
}