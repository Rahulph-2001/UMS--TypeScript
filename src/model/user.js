"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
class User extends mongoose_1.Document {
    constructor(username, password) {
        super(mongoose_1.Document);
        this.username = username;
        this.password = password;
    }
}
exports.User = User;
