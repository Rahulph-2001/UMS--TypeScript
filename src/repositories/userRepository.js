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
exports.userRepository = void 0;
const userSchema_1 = __importDefault(require("../model/userSchema"));
class userRepository {
    createUser(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = new userSchema_1.default(userData);
            return yield user.save();
        });
    }
    findByUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield userSchema_1.default.findOne({ username });
        });
    }
    editUser(Id, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield userSchema_1.default.findByIdAndUpdate({ _id: Id }, updateData, { new: true });
        });
    }
    findUserNotThatId(Id, username) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield userSchema_1.default.findOne({ _id: { $ne: Id }, username });
        });
    }
    userDelete(Id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield userSchema_1.default.findByIdAndDelete(Id);
        });
    }
    findAllUser(searchContent) {
        return __awaiter(this, void 0, void 0, function* () {
            const regex = new RegExp(searchContent, 'i');
            const x = yield userSchema_1.default.find({ username: { $regex: regex } });
            return x;
        });
    }
    findByuserNameandPassword(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield userSchema_1.default.findOne({ username, password });
        });
    }
    findUserById(Id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield userSchema_1.default.findById(Id);
        });
    }
}
exports.userRepository = userRepository;
