"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const usercontroller_1 = require("../src/controller/usercontroller");
const userManagecontroller_1 = require("../src/controller/userManagecontroller");
router.get('/', (req, res) => {
    res.send("Hello World");
});
router.get('/signup', usercontroller_1.signUp);
router.post('/signup', usercontroller_1.signUpuser);
router.get('/login', usercontroller_1.loginPage);
router.post('/login', usercontroller_1.loginCheck);
router.get('/home', usercontroller_1.homePage);
router.post('/logout', usercontroller_1.logOutUser);
router.post('/addUser', userManagecontroller_1.addUser);
router.post('/editUser', userManagecontroller_1.editUser);
router.post('/delete', userManagecontroller_1.deleteUser);
exports.default = router;
