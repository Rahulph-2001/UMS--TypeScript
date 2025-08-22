import mongoose from 'mongoose'
import {User} from './user'
const userSchema = new mongoose.Schema<User>({
   username:{
      type:String,
      required:true
   },
   password:{
      type:String,
      required:true
   }
})

const userModel = mongoose.model<User>('user',userSchema)


export default userModel;

