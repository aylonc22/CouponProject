export class UserDetails{
     public userName:String;
     public firstName?:String;
     public lastName?:String;
     public email:String;
     public password:String;
     public id?:String;
     public userType:String;

     constructor(userName:string,email:string,password:string,id = undefined,userType:String,firstName = undefined,lastName = undefined){
        this.userName = userName;
        this.email = email;
        this.password = password;
        this.userType = userType;
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
     }
}

