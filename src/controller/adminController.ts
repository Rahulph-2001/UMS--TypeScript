import express, { Request, Response } from 'express';
import userModel from '../model/userSchema';
import Admin from '../model/admin';

declare module 'express-session' {
    interface SessionData {
        isAdmin?: boolean;
        error?: string;
    }
}

export const requiredAuth = (req: Request, res: Response, next: express.NextFunction) => {
    if (req.session && req.session.isAdmin) {
        next();
    } else {
        res.redirect('/admin/login');
    }
};

export const loginPage = async (req: Request, res: Response) => {
    console.log("loginPage function called!");
    try {
        const error = req.session?.error;
        if (req.session) {
            req.session.error = undefined;
        }
        res.render('admin/login', { error });
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
};

export const handleLogin = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const ADMIN_EMAIL = "admin@example.com";
        const ADMIN_PASSWORD = "admin@2001";

        if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
            if (req.session) {
                req.session.isAdmin = true;
            }
            res.redirect('/admin/dashboard');
        } else {
            if (req.session) {
                req.session.error = 'Invalid email or password';
            }
            res.redirect('/admin/login');
        }
        
    } catch (error) {
        console.error('Login error:', error);
        if (req.session) {
            req.session.error = 'An error occurred during login';
        }
        res.redirect('/admin/login');
    }
};

export const dashBoard = async (req: Request, res: Response) => {
    try {
        const search = req.query.search as string;
        let users;
        
        if (search) {
            users = await userModel.find({
                username: { $regex: search, $options: 'i' }
            });
        } else {
            users = await userModel.find();
        }
        
        res.render('admin/dashboard', {
            data: users,
            SearchContent: search || "" 
        });

    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
};

export const logout = async (req: Request, res: Response) => {
    try {
        if (req.session) {
            req.session.destroy((err) => {
                if (err) {
                    console.error('Session destruction error:', err);
                    return res.status(500).send('Could not log out');
                }
                res.redirect('/admin/login');
            });
        } else {
            res.redirect('/admin/login');
        }
    } catch (error) {
        console.error('Logout error:', error);
        res.status(500).send('Internal Server Error');
    }
};