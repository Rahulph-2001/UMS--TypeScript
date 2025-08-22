import express,{Request,Response}from 'express'
import { userService } from '../service/userServices'
import session from 'express-session'

const newuserService=new userService()



export const signUp=async(req:Request,res:Response)=>{
    try{
        res.render('user/signup')
    }catch(error){
        console.log(error)
    }
}

export const signUpuser=async(req:Request,res:Response)=>{
    try{
        const {email,password,confirmPassword}=req.body;
        console.log(req.body)
        const message=await newuserService.signUpUser(email,password,confirmPassword)
        res.json({message})

    }catch(error){
        console.log(error)
    }
}
export const loginPage=async(req:Request,res:Response)=>{

    try{
         res.render('user/login')
    }catch(error){
        console.log(error)
    }

}

export const loginCheck=async(req:Request,res:Response)=>{
    try{
      const {email,password}=req.body
      const message=await newuserService.loginCheck(email,password,req)
      req.session.loginTime=new Date().toLocaleString()
      res.status(201).json({message})
    }catch(error){
      console.log(error)
    }
}

export const homePage=async(req:Request,res:Response)=>{
    try{
        const userData=await newuserService.getUserBYsession(req)
        const loginTime=req.session.loginTime;

        console.log(userData,loginTime)
        res.render('user/home',{userData,loginTime})

    }catch(error){
        console.log(error)
    }
}
export const logOutUser=async(req:Request,res:Response)=>{
    try{
        const logOutmessage=await newuserService.logOutUser(req)
        res.json({logOutmessage})

    }catch(error){
        console.log(error)
    }
}


