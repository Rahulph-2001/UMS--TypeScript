import mongoose,{Schema}from "mongoose"
import {AdminDocument}from './admin'

const adminSchema=new Schema<AdminDocument>({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});
const Admin=mongoose.model<AdminDocument>('Admin',adminSchema)

const createDefaultAdmin=async()=>{
    const existAdmin=await Admin.findOne({username:'admin'})
    if(!existAdmin){
        await Admin.create({username:'admin',password:'admin@123'});
        console.log('default admin created')
    }else{
        console.log('Admin already exists')
    }
}

mongoose.connection.once('open',async()=>{
    await createDefaultAdmin();
})
export default Admin