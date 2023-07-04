"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
const order_service_1 = require("./order.service");
const http_status_1 = __importDefault(require("http-status"));
const user_model_1 = __importDefault(require("../user/user.model"));
const cow_model_1 = __importDefault(require("../cow/cow.model"));
const createOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderData = __rest(req.body, []);
        const buyer = yield user_model_1.default.findById(orderData.buyer);
        const cow = yield cow_model_1.default.findById(orderData.cow);
        const seller = yield user_model_1.default.findById(cow === null || cow === void 0 ? void 0 : cow.seller);
        if ((cow === null || cow === void 0 ? void 0 : cow.label) === 'sold out') {
            throw new Error('Cow already sold out');
        }
        if (buyer && cow && (buyer === null || buyer === void 0 ? void 0 : buyer.budget) < (cow === null || cow === void 0 ? void 0 : cow.price)) {
            throw new Error("Buyer hasn't enough money");
        }
        if (buyer && cow && seller) {
            const result = yield order_service_1.OrderService.createOrder(orderData, cow, buyer, seller);
            res.status(http_status_1.default.OK).json({
                success: true,
                message: ' Buy a Cow successfully',
                data: result,
            });
        }
    }
    catch (err) {
        next(err);
    }
});
const getAllOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield order_service_1.OrderService.getAllOrder();
        res.status(http_status_1.default.OK).json({
            success: true,
            message: ' Orders retrieved successfully',
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.OrderController = {
    createOrder,
    getAllOrder,
};
