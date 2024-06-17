

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { AuthReducer } from "./authReducer";
import { MyCouponStateReducer } from "./myCouponsReducer";
import { CouponReducer } from "./couponsReducer";
import { AdminReducer } from "./adminReducer";


const reducers = combineReducers({auth:AuthReducer,myCoupons:MyCouponStateReducer,coupons:CouponReducer,admin:AdminReducer});


export const couponSystem = configureStore({
    reducer: reducers,
    middleware: (getDefualtMiddleWare)=> getDefualtMiddleWare({serializableCheck:false})
});