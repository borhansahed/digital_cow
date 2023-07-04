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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const user_model_1 = __importDefault(require("../user/user.model"));
const cow_model_1 = __importDefault(require("../cow/cow.model"));
const order_model_1 = __importDefault(require("./order.model"));
const createOrder = (orderData, cowData, buyerData, sellerData) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    try {
        yield session.startTransaction();
        yield user_model_1.default.findByIdAndUpdate(orderData.buyer, {
            $set: { budget: buyerData.budget - cowData.price },
        }, { session });
        yield cow_model_1.default.findByIdAndUpdate(orderData.cow, {
            $set: { label: 'sold out' },
        }, { session });
        yield user_model_1.default.findByIdAndUpdate(sellerData._id, { $set: { income: sellerData.income + cowData.price } }, { session });
        const result = yield order_model_1.default.create([orderData], { session });
        yield session.commitTransaction();
        yield session.endSession();
        return result;
    }
    catch (err) {
        yield session.abortTransaction();
        yield session.endSession();
        throw err;
    }
});
const getAllOrder = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.default.find().populate('cow').populate('buyer');
    return result;
});
exports.OrderService = {
    createOrder,
    getAllOrder,
};
