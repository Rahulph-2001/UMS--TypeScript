import mongoose,{Document,Schema} from "mongoose";

export class User extends Document{
   username:string;
   password:string;
   constructor(username:string,password:string){
      super(Document);
      this.username=username;
      this.password=password;
   }
}