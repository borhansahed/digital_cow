"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRoute = void 0;
const express_1 = __importDefault(require("express"));
const order_controller_1 = require("./order.controller");
const auth_1 = require("../../middleware/auth");
const role_enum_1 = require("../../../enum/role.enum");
const router = express_1.default.Router();
router.get('/', auth_1.auth.authorization(role_enum_1.USER_ROLE.ADMIN, role_enum_1.USER_ROLE.BUYER, role_enum_1.USER_ROLE.SELLER), order_controller_1.OrderController.getAllOrder);
router.post('/', auth_1.auth.authorization(role_enum_1.USER_ROLE.BUYER), order_controller_1.OrderController.createOrder);
router.get('/:id', auth_1.auth.authorization(role_enum_1.USER_ROLE.ADMIN, role_enum_1.USER_ROLE.SELLER, role_enum_1.USER_ROLE.BUYER), order_controller_1.OrderController.getOneOrder);
exports.OrderRoute = router;
