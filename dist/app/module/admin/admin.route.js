"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRoute = void 0;
const express_1 = __importDefault(require("express"));
const admin_controller_1 = require("./admin.controller");
const auth_1 = require("../../middleware/auth");
const role_enum_1 = require("../../../enum/role.enum");
const route = express_1.default.Router();
route.post('/create-admin', admin_controller_1.AdminController.createAdmin);
route.post('/login', admin_controller_1.AdminController.adminLogin);
route.post('/refresh-token', admin_controller_1.AdminController.generateWithRefreshToken);
route.get('/my-profile', auth_1.auth.authorization(role_enum_1.USER_ROLE.ADMIN), admin_controller_1.AdminController.myProfile);
route.patch('/my-profile', auth_1.auth.authorization(role_enum_1.USER_ROLE.ADMIN), admin_controller_1.AdminController.myProfileUpDate);
exports.AdminRoute = route;
