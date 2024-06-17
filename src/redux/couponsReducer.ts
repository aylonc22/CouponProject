import { Coupon } from "../model/Coupon"

export class couponState {
    coupons:Coupon[] = [];
}
export enum CouponActionType {
    reset = "COUPON_RESET",     
    create = 'COUPON_CREATE' ,
}

export interface CouponAction {
    type: CouponActionType,
    payload?: any
}
export function createCouponState(coupons:Coupon[]):CouponAction{   
    return {type:CouponActionType.create,payload:coupons}
}

export function resetCouponState(): CouponAction {
    return { type: CouponActionType.reset}
}



export function CouponReducer(currentState: couponState = new couponState(), action: CouponAction): couponState {
    let newState = { ...currentState };
    switch (action.type) {      
        case CouponActionType.reset:
            newState = new couponState();           
            break;
        case CouponActionType.create:
            newState.coupons = action.payload;           
            break;               
    }

    return newState;
}