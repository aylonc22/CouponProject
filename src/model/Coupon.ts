export class Coupon{
    public couponID:number;
    public companyID:number;
    public category:string;
    public title:string;
    public description:string;
    public start_date:Date;
    public end_date:Date;
    public amount:number;
    public price:number;
    public image:string;
    constructor(couponID:number,companyID:number,category:string,title:string,description:string,start_date:Date,end_date:Date,amout:number,price:number,image:string){
        this.couponID = couponID;
        this.companyID = companyID;
        this.category = category;
        this.title = title;
        this.description = description;
        this.start_date = start_date;
        this.end_date = end_date;
        this.amount = amout;
        this.price = price;
        this.image = image;
    }
}