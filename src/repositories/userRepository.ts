import{User}from '../model/user'
import userModel from '../model/userSchema'
 export class userRepository{
    async createUser(userData:User):Promise<User>{
        const user=new userModel(userData)
        return await user.save()
    }
    async findByUsername(username:string):Promise<User|null>{
        return await userModel.findOne({username});
    }
    async editUser(Id:string,updateData:Partial<User>):Promise<User|null>{
        return await userModel.findByIdAndUpdate({_id:Id},updateData,{new:true});
    }
    async findUserNotThatId(Id:string,username:string){
        return await userModel.findOne({_id:{$ne:Id},username})
    }
    async userDelete(Id:string){
        return await userModel.findByIdAndDelete(Id)
    }
    async findAllUser(searchContent:string){
        const regex= new RegExp(searchContent,'i')
        const x=await userModel.find({username:{$regex:regex}})
        return x
    }
    async findByuserNameandPassword(username:string,password:string){
        return await userModel.findOne({username,password})
    }
    async findUserById(Id:string):Promise<User|null>{
        return await userModel.findById(Id)
    }
 }