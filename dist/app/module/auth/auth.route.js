"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoute = void 0;
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("./auth.controller");
const user_controller_1 = require("../user/user.controller");
const route = express_1.default.Router();
route.post('/signup', user_controller_1.UserController.createUser);
route.post('/login', auth_controller_1.AuthController.userLogin);
route.post('/refresh-token', auth_controller_1.AuthController.generateWithRefreshToken);
exports.AuthRoute = route;
