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
exports.userService = void 0;
const userRepository_1 = require("../repositories/userRepository");
const newUserRepository = new userRepository_1.userRepository();
class userService {
    addUser(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingUser = yield newUserRepository.findByUsername(username);
            if (username.trim() == "" || password.trim() == "") {
                return `Should enter usernaame and password`;
            }
            if (existingUser) {
                return `user already exist`;
            }
            const newUser = yield newUserRepository.createUser({ username, password });
            return `user ${newUser.username} created successfully`;
        });
    }
    getUser(searchContent) {
        return __awaiter(this, void 0, void 0, function* () {
            const allUser = yield newUserRepository.findAllUser(searchContent);
            return allUser;
        });
    }
    editUser(Id, username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            if (username.trim() == "" || password.trim() == "") {
                return `should enter username and password`;
            }
            const existUser = yield newUserRepository.findUserNotThatId(Id, username);
            if (existUser) {
                return 'user already exist';
            }
            yield newUserRepository.editUser(Id, { username, password });
            return `user updated successfully`;
        });
    }
    deleteUser(Id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield newUserRepository.userDelete(Id);
            return `user deleted successfully`;
        });
    }
    loginCheck(email, password, req) {
        return __awaiter(this, void 0, void 0, function* () {
            const findUser = yield newUserRepository.findByuserNameandPassword(email, password);
            if (!findUser) {
                return `wrong data enter`;
            }
            else {
                req.session.userId = findUser._id;
                req.session.user = findUser;
                return `login successfully`;
            }
        });
    }
    getUserBYsession(req) {
        return __awaiter(this, void 0, void 0, function* () {
            return newUserRepository.findUserById(req.session.userId);
        });
    }
    logOutUser(req) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                req.session.destroy((err) => {
                    if (err) {
                        console.error('Session destruction error:', err);
                        reject('Logout failed');
                    }
                    else {
                        resolve('Logout successfully');
                    }
                });
            });
        });
    }
    signUpUser(username, password, confirmPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingUser = yield newUserRepository.findByUsername(username);
            if (username.trim() == "" || password.trim() == "" || confirmPassword.trim() == "") {
                return `should enter username and password`;
            }
            if (password.trim() != confirmPassword.trim()) {
                return `Password is not match`;
            }
            if (existingUser) {
                return `user already exist`;
            }
            const newUser = yield newUserRepository.createUser({ username, password });
            return `user ${newUser.username} created successfully `;
        });
    }
}
exports.userService = userService;
