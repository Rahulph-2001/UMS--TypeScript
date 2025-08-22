import express,{Request,Response} from 'express';
const router=express.Router()
import {loginPage,loginCheck,signUp,signUpuser,homePage,logOutUser} from '../src/controller/usercontroller';
import {addUser,editUser,deleteUser} from '../src/controller/userManagecontroller'

router.get('/',(req:Request,res:Response)=>{
    res.send("Hello World")
})

router.get('/signup',signUp)
router.post('/signup',signUpuser)
router.get('/login',loginPage)
router.post('/login',loginCheck)
router.get('/home',homePage)
router.post('/logout',logOutUser)



router.post('/addUser',addUser)
router.post('/editUser',editUser)
router.post('/delete',deleteUser)



export default router
