

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { AuthReducer } from "./authReducer";

const reducers = combineReducers({auth:AuthReducer});


export const couponSystem = configureStore({
    reducer: reducers,
    middleware: (getDefualtMiddleWare)=> getDefualtMiddleWare({serializableCheck:false})
});