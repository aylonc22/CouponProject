import { Coupon } from "../model/Coupon"

export class companyState {
    coupons:Coupon[] = [];
}
export enum CompanyActionType {
    reset = "reset",
    add = "add",  
    create = 'create' ,
}

export interface CompanyAction {
    type: CompanyActionType,
    payload?: any
}
export function createCompanyState(coupons:Coupon[]):CompanyAction{
    return {type:CompanyActionType.create,payload:coupons}
}

export function resetCompanyState(): CompanyAction {
    return { type: CompanyActionType.reset}
}

export function addCompanyAction(coupon:Coupon): CompanyAction {
    return { type: CompanyActionType.add ,payload:coupon}
}


export function CompanyReducer(currentState: companyState = new companyState(), action: CompanyAction): companyState {
    let newState = { ...currentState };

    switch (action.type) {
        case CompanyActionType.add:
            newState.coupons = [...newState.coupons,action.payload];
            break;
        case CompanyActionType.reset:
            newState = new companyState();           
            break;
        case CompanyActionType.create:
            newState.coupons = action.payload;
            break;               
    }

    return newState;
}