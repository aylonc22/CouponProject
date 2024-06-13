

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { AuthReducer } from "./authReducer";
import { CompanyReducer } from "./companyReducer";


const reducers = combineReducers({auth:AuthReducer,company:CompanyReducer});


export const couponSystem = configureStore({
    reducer: reducers,
    middleware: (getDefualtMiddleWare)=> getDefualtMiddleWare({serializableCheck:false})
});