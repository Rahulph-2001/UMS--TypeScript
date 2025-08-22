import express, {Request,Response} from 'express'
import { userService } from '../service/userServices'


const newUserService=new userService()

export const addUser=async(req:Request,res:Response)=>{
    try{
        const {username,password}=req.body;
        const message=await newUserService.addUser(username,password);
        res.status(201).json({message})
    }catch(error){
      console.log(error)
    }
}

export const editUser=async(req:Request,res:Response)=>{
    try{
        const {username,password,userId}=req.body
        const message=await newUserService.editUser(userId,username,password)
        res.status(201).json({message})

    }catch(error){
        console.log(error)
    }
}

export const deleteUser=async(req:Request,res:Response)=>{
try{
    const {deleteId}=req.body
    console.log(req.body)
    const message=await newUserService.deleteUser(deleteId)
    res.status(201).json(message)
}catch(error){
    console.log(error)
}
}