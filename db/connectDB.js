"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mongo = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class Mongo {
    constructor() {
        if (!process.env.MONGO_CONNECTION_STRING) {
            throw new Error("no connect string provide");
        }
        this.mongoUrl = process.env.MONGO_CONNECTION_STRING;
        console.log('Connection string:', process.env.MONGO_CONNECTION_STRING);
    }
    connect() {
        mongoose_1.default
            .connect(this.mongoUrl)
            .then(() => console.log("database connected"))
            .catch((error) => console.error(error));
    }
}
exports.Mongo = Mongo;
