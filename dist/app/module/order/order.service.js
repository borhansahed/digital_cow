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
const getAllOrder = (userInfo) => __awaiter(void 0, void 0, void 0, function* () {
    if ((userInfo === null || userInfo === void 0 ? void 0 : userInfo.role) === 'seller') {
        let result = yield order_model_1.default.aggregate([
            {
                $lookup: {
                    from: 'cows',
                    localField: 'cow',
                    foreignField: '_id',
                    as: 'cow',
                },
            },
            {
                $match: {
                    'cow.seller': new mongoose_1.default.Types.ObjectId(userInfo.id),
                },
            },
        ]);
        return (result = yield order_model_1.default.populate(result, { path: 'buyer' }));
    }
    let query = {};
    if ((userInfo === null || userInfo === void 0 ? void 0 : userInfo.role) === 'buyer') {
        query = {
            buyer: new Object(userInfo.id),
        };
    }
    const result = yield order_model_1.default.find(query)
        .populate({
        path: 'cow',
        populate: {
            path: 'seller',
        },
    })
        .populate('buyer');
    return result;
});
const getOneOrder = (...id) => __awaiter(void 0, void 0, void 0, function* () {
    if (id.includes('seller')) {
        let result = yield order_model_1.default.aggregate([
            {
                $match: {
                    _id: new mongoose_1.default.Types.ObjectId(id[0]),
                },
            },
            {
                $lookup: {
                    from: 'cows',
                    localField: 'cow',
                    foreignField: '_id',
                    as: 'cow',
                },
            },
            {
                $match: {
                    'cow.seller': new mongoose_1.default.Types.ObjectId(id[2]),
                },
            },
        ]);
        result = yield order_model_1.default.populate(result, [
            { path: 'cow', populate: { path: 'seller' } },
            { path: 'buyer' },
        ]);
        if (result.length < 1) {
            throw new Error('you are not a owner');
        }
        return result;
    }
    const result = yield order_model_1.default.findOne({ _id: id[0] })
        .populate({
        path: 'cow',
        populate: {
            path: 'seller',
        },
    })
        .populate('buyer');
    if (id.includes('buyer') && String(result === null || result === void 0 ? void 0 : result.buyer) !== id[2]) {
        throw new Error('You are not a real buyer');
    }
    return (result &&
        (yield result.populate({
            path: 'cow',
            populate: {
                path: 'seller',
            },
        })).populate('buyer'));
});
exports.OrderService = {
    createOrder,
    getAllOrder,
    getOneOrder,
};
