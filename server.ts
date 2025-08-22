import express,{Request,Response} from 'express'
const app=express();
import userRouter from './router/user';
console.log("About to import admin router");
import adminRouter from './router/admin'
console.log("Admin router imported successfully"); 
import {Mongo} from './db/connectDB'
import userModel from './src/model/userSchema'
import session from 'express-session'
import Admin from './src/model/adminSchema'

app.use(session({
    secret:'your-secret-key',
    resave:false,
    saveUninitialized:true,
    cookie:{secure:false}
}))

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.set('view engine','ejs')
app.use('/user',userRouter)
app.use('/admin',adminRouter)
const database=new Mongo()
database.connect()

app.listen(3000,()=>console.log('Server is Connected successfully'))

