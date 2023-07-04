"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoute = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const route = express_1.default.Router();
route.get('/', user_controller_1.UserController.getAllUser);
route.patch('/:id', user_controller_1.UserController.updateOneUser);
route.get('/:id', user_controller_1.UserController.getOneUser);
route.delete('/:id', user_controller_1.UserController.deleteOneUser);
exports.UserRoute = route;
