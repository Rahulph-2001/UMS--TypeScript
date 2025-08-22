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
Object.defineProperty(exports, "__esModule", { value: true });
exports.logOutUser = exports.homePage = exports.loginCheck = exports.loginPage = exports.signUpuser = exports.signUp = void 0;
const userServices_1 = require("../service/userServices");
const newuserService = new userServices_1.userService();
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.render('user/signup');
    }
    catch (error) {
        console.log(error);
    }
});
exports.signUp = signUp;
const signUpuser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, confirmPassword } = req.body;
        console.log(req.body);
        const message = yield newuserService.signUpUser(email, password, confirmPassword);
        res.json({ message });
    }
    catch (error) {
        console.log(error);
    }
});
exports.signUpuser = signUpuser;
const loginPage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.render('user/login');
    }
    catch (error) {
        console.log(error);
    }
});
exports.loginPage = loginPage;
const loginCheck = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const message = yield newuserService.loginCheck(email, password, req);
        req.session.loginTime = new Date().toLocaleString();
        res.status(201).json({ message });
    }
    catch (error) {
        console.log(error);
    }
});
exports.loginCheck = loginCheck;
const homePage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = yield newuserService.getUserBYsession(req);
        const loginTime = req.session.loginTime;
        console.log(userData, loginTime);
        res.render('user/home', { userData, loginTime });
    }
    catch (error) {
        console.log(error);
    }
});
exports.homePage = homePage;
const logOutUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const logOutmessage = yield newuserService.logOutUser(req);
        res.json({ logOutmessage });
    }
    catch (error) {
        console.log(error);
    }
});
exports.logOutUser = logOutUser;
