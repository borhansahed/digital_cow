"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_route_1 = require("../module/user/user.route");
const cow_route_1 = require("../module/cow/cow.route");
const user_controller_1 = require("../module/user/user.controller");
const order_route_1 = require("../module/order/order.route");
const digitalCowsRoutes = express_1.default.Router();
digitalCowsRoutes.post('/auth/signup', user_controller_1.UserController.createUser);
digitalCowsRoutes.use('/users', user_route_1.UserRoute);
digitalCowsRoutes.use('/cows', cow_route_1.CowRouter);
digitalCowsRoutes.use('/orders', order_route_1.OrderRouter);
exports.default = digitalCowsRoutes;
