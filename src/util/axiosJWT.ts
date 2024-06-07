import axios from "axios";
import { couponSystem } from "../redux/store";
import {updateTokenAction } from "../redux/authReducer";

const axiosJWT = axios.create();

axiosJWT.interceptors.request.use(
    request=>{
        request.headers.Authorization = `Bearer ${couponSystem.getState().auth.token}`;
        return request;
    }
)

axiosJWT.interceptors.response.use(
    response=>{       
        couponSystem.dispatch(updateTokenAction(response.headers.authorization));              
        return response;
    }
)

export default axiosJWT;