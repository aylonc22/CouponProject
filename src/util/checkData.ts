import { jwtDecode } from "jwt-decode";
import { loginAction } from "../redux/authReducer";
import { couponSystem } from "../redux/store";

type jwtData = {
    "userType": string,
    "userName": string,
    'id':number,
    "sub": string,
    "iat": number,
    "exp": number
}

export const checkData = () => {    
    if (couponSystem.getState().auth.token.length < 10) {        
        try {           
            const JWT = sessionStorage.getItem("jwt")!.split(" ")[1];
            const decoded_jwt = jwtDecode<jwtData>(JWT);            
            let myAuth = {
                name: decoded_jwt.userName,
                email: decoded_jwt.sub,
                id:decoded_jwt.id,
                token: JWT,
                userType: decoded_jwt.userType,
                isLogged: true
            };

            couponSystem.dispatch(loginAction(myAuth))
        } catch {
            return;
        }

    }
}