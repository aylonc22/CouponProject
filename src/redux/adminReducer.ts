import { Company } from "../model/Company"
import { Customer } from "../model/Customer"

export class AdminState {
   companies:Company[] = [];
   customers:Customer[] = [];
}
export enum AdminActionType {
    reset = "ADMIN_RESET",     
    create_company = 'COMPANIES_CREATE' ,
    create_customer = 'CUSTOMERS_CREATE' ,
}

export interface AdminAction {
    type: AdminActionType,
    payload?: any
}
export function createCompanyState(companies:Company[]):AdminAction{   
    return {type:AdminActionType.create_company,payload:companies}
}
export function createCustomerState(customers:Customer[]):AdminAction{   
    return {type:AdminActionType.create_customer,payload:customers}
}

export function resetAdminState(): AdminAction {
    return { type: AdminActionType.reset}
}



export function AdminReducer(currentState: AdminState = new AdminState(), action: AdminAction): AdminState {
    let newState = { ...currentState };
    switch (action.type) {      
        case AdminActionType.reset:
            newState = new AdminState();           
            break;
        case AdminActionType.create_company:
            newState.companies = action.payload;           
            break; 
         case AdminActionType.create_customer:
            newState.customers = action.payload;           
            break;            
    }

    return newState;
}