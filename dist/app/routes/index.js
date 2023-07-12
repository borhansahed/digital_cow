"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_route_1 = require("../module/user/user.route");
const cow_route_1 = require("../module/cow/cow.route");
const order_route_1 = require("../module/order/order.route");
const admin_route_1 = require("../module/admin/admin.route");
const auth_route_1 = require("../module/auth/auth.route");
const digitalCowsRoutes = express_1.default.Router();
const routes = [
    {
        path: '/users',
        route: user_route_1.UserRoute,
    },
    {
        path: '/cows',
        route: cow_route_1.CowRoute,
    },
    {
        path: '/orders',
        route: order_route_1.OrderRoute,
    },
    {
        path: '/admins',
        route: admin_route_1.AdminRoute,
    },
    {
        path: '/auth',
        route: auth_route_1.AuthRoute,
    },
];
routes.forEach(route => digitalCowsRoutes.use(route.path, route.route));
exports.default = digitalCowsRoutes;
