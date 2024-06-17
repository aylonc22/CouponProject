import { Coupon } from "./Coupon";

export class Customer{
    public customerID?:number;
    public fisrt_name:string;
    public last_name:string;
    public email:string;
    public password?:string;
    public coupons?:Coupon[];
    constructor(customerID:number=0,fisrt_name:string,last_name:string,email:string,password:string,coupons:Coupon[]){
        this.customerID = customerID;
        this.fisrt_name = fisrt_name;
        this.last_name = last_name;
        this.email = email;
        this.password = password;
        this.coupons = coupons;
    }
}