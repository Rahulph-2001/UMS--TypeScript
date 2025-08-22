"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
console.log("Admin router loaded!");
const adminController_1 = require("../src/controller/adminController");
router.get('/login', adminController_1.loginPage);
router.post('/login', adminController_1.handleLogin);
router.get('/dashboard', adminController_1.requiredAuth, adminController_1.dashBoard);
exports.default = router;
