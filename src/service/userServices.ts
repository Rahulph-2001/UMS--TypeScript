import { userRepository } from "../repositories/userRepository";
import {User}from '../model/user'

const newUserRepository=new userRepository()
export class userService{
    async addUser(username:string,password:string):Promise<string>{
   
        const existingUser=await newUserRepository.findByUsername(username)
        if(username.trim()==""||password.trim()==""){
            return `Should enter usernaame and password`
        }
        if(existingUser){
            return `user already exist`
        }
        const newUser=await newUserRepository.createUser({username,password}as User)
        return `user ${newUser.username} created successfully`
    }

    async getUser(searchContent:string){
        const allUser= await newUserRepository.findAllUser(searchContent)
        return allUser
    }
    async editUser(Id:string,username:string,password:string):Promise<string>{
        if(username.trim()==""||password.trim()==""){
            return `should enter username and password`
        }
        const existUser=await newUserRepository.findUserNotThatId(Id,username)
        if(existUser){
            return 'user already exist'
        }
        await newUserRepository.editUser(Id,{username,password});
        return `user updated successfully`


    }
    async deleteUser(Id:string){
        await newUserRepository.userDelete(Id)
        return `user deleted successfully`
    }
 
    async loginCheck(email: string, password: string, req: any) {
    const findUser = await newUserRepository.findByuserNameandPassword(email, password)
    if (!findUser) {
        return `wrong data enter`  
    } else {
        req.session.userId = findUser._id;
        req.session.user = findUser;
        return `login successfully`
    }
}

    async getUserBYsession(req:any){
        
        return newUserRepository.findUserById(req.session.userId)
    }

    async logOutUser(req:any): Promise<string>{
        return new Promise((resolve, reject) => {
            req.session.destroy((err: any) => {
                if (err) {
                    console.error('Session destruction error:', err);
                    reject('Logout failed');
                } else {
                    resolve('Logout successfully');
                }
            });
        });
    }

    async signUpUser(username:string,password:string,confirmPassword:string):Promise<string>{
        const existingUser=await newUserRepository.findByUsername(username)
        if(username.trim()==""||password.trim()==""||confirmPassword.trim()==""){
            return `should enter username and password`
        }
        if(password.trim()!=confirmPassword.trim()){
            return `Password is not match`
        }
        if(existingUser){
            return `user already exist`
        }
        const newUser=await newUserRepository.createUser({username,password} as User)
        return `user ${newUser.username} created successfully `

    }
}