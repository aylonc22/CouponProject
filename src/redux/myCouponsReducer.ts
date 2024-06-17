import { Coupon } from "../model/Coupon"

export class MyCouponState {
    myCoupons:Coupon[] = [];
}
export enum MyCouponStateActionType {
    reset = "MYCOUPON_RESET",
    add = "MYCOUPON_ADD",  
    create = 'MYCOUPON_CREATE' ,
}

export interface MyCouponStateAction {
    type: MyCouponStateActionType,
    payload?: any
}
export function createMyCouponState(coupons:Coupon[]):MyCouponStateAction{
    return {type:MyCouponStateActionType.create, payload:coupons}
}

export function resetMyCouponState(): MyCouponStateAction {
    return { type: MyCouponStateActionType.reset}
}

export function addMyCouponStateAction(coupon:Coupon): MyCouponStateAction {
    return { type: MyCouponStateActionType.add, payload:coupon}
}


export function MyCouponStateReducer(currentState: MyCouponState = new MyCouponState(), action: MyCouponStateAction): MyCouponState {
    let newState = { ...currentState };    

    switch (action.type) {
        case MyCouponStateActionType.add:
            newState = { ...currentState, myCoupons: [...currentState.myCoupons, action.payload] };      
            break;
        case MyCouponStateActionType.reset:
            newState = new MyCouponState();              
            break;
        case MyCouponStateActionType.create:
            newState.myCoupons = action.payload;                    
            break;               
    }   
    
    return newState;
}