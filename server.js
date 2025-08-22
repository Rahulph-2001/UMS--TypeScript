"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const user_1 = __importDefault(require("./router/user"));
console.log("About to import admin router");
const admin_1 = __importDefault(require("./router/admin"));
console.log("Admin router imported successfully");
const connectDB_1 = require("./db/connectDB");
const express_session_1 = __importDefault(require("express-session"));
app.use((0, express_session_1.default)({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use('/user', user_1.default);
app.use('/admin', admin_1.default);
const database = new connectDB_1.Mongo();
database.connect();
app.listen(3000, () => console.log('Server is Connected successfully'));
