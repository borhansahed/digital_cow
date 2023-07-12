"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoute = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const auth_1 = require("../../middleware/auth");
const role_enum_1 = require("../../../enum/role.enum");
const route = express_1.default.Router();
route.get('/', auth_1.auth.authorization(role_enum_1.USER_ROLE.ADMIN), user_controller_1.UserController.getAllUser);
route.get('/my-profile', auth_1.auth.authorization(role_enum_1.USER_ROLE.BUYER, role_enum_1.USER_ROLE.SELLER), user_controller_1.UserController.myProfile);
route.patch('/my-profile', auth_1.auth.authorization(role_enum_1.USER_ROLE.BUYER, role_enum_1.USER_ROLE.SELLER), user_controller_1.UserController.myProfileUpDate);
route.patch('/:id', auth_1.auth.authorization(role_enum_1.USER_ROLE.ADMIN), user_controller_1.UserController.updateOneUser);
route.get('/:id', auth_1.auth.authorization(role_enum_1.USER_ROLE.ADMIN), user_controller_1.UserController.getOneUser);
route.delete('/:id', auth_1.auth.authorization(role_enum_1.USER_ROLE.ADMIN), user_controller_1.UserController.deleteOneUser);
exports.UserRoute = route;
