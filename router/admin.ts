import express, { Request, Response } from 'express';
const router = express.Router();


console.log("Admin router loaded!");

import { loginPage,dashBoard,handleLogin,requiredAuth } from '../src/controller/adminController';

router.get('/login', loginPage);
router.post('/login',handleLogin)
router.get('/dashboard',requiredAuth,dashBoard)

export default router;