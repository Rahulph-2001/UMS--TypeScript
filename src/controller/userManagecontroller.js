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
exports.deleteUser = exports.editUser = exports.addUser = void 0;
const userServices_1 = require("../service/userServices");
const newUserService = new userServices_1.userService();
const addUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const message = yield newUserService.addUser(username, password);
        res.status(201).json({ message });
    }
    catch (error) {
        console.log(error);
    }
});
exports.addUser = addUser;
const editUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password, userId } = req.body;
        const message = yield newUserService.editUser(userId, username, password);
        res.status(201).json({ message });
    }
    catch (error) {
        console.log(error);
    }
});
exports.editUser = editUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { deleteId } = req.body;
        console.log(req.body);
        const message = yield newUserService.deleteUser(deleteId);
        res.status(201).json(message);
    }
    catch (error) {
        console.log(error);
    }
});
exports.deleteUser = deleteUser;
