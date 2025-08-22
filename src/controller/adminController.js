"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.dashBoard = exports.handleLogin = exports.loginPage = exports.requiredAuth = void 0;
const userSchema_1 = __importDefault(require("../model/userSchema"));
const requiredAuth = (req, res, next) => {
    if (req.session && req.session.isAdmin) {
        next();
    }
    else {
        res.redirect('/admin/login');
    }
};
exports.requiredAuth = requiredAuth;
const loginPage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    console.log("loginPage function called!");
    try {
        const error = (_a = req.session) === null || _a === void 0 ? void 0 : _a.error;
        if (req.session) {
            req.session.error = undefined;
        }
        res.render('admin/login', { error });
    }
    catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
});
exports.loginPage = loginPage;
const handleLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const ADMIN_EMAIL = "admin@example.com";
        const ADMIN_PASSWORD = "admin@2001";
        if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
            if (req.session) {
                req.session.isAdmin = true;
            }
            res.redirect('/admin/dashboard');
        }
        else {
            if (req.session) {
                req.session.error = 'Invalid email or password';
            }
            res.redirect('/admin/login');
        }
    }
    catch (error) {
        console.error('Login error:', error);
        if (req.session) {
            req.session.error = 'An error occurred during login';
        }
        res.redirect('/admin/login');
    }
});
exports.handleLogin = handleLogin;
const dashBoard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const search = req.query.search;
        let users;
        if (search) {
            users = yield userSchema_1.default.find({
                username: { $regex: search, $options: 'i' }
            });
        }
        else {
            users = yield userSchema_1.default.find();
        }
        res.render('admin/dashboard', {
            data: users,
            SearchContent: search || ""
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
});
exports.dashBoard = dashBoard;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.session) {
            req.session.destroy((err) => {
                if (err) {
                    console.error('Session destruction error:', err);
                    return res.status(500).send('Could not log out');
                }
                res.redirect('/admin/login');
            });
        }
        else {
            res.redirect('/admin/login');
        }
    }
    catch (error) {
        console.error('Logout error:', error);
        res.status(500).send('Internal Server Error');
    }
});
exports.logout = logout;
