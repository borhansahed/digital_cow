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
const mongoose_1 = require("mongoose");
const cow_constraint_1 = require("./cow.constraint");
const user_model_1 = __importDefault(require("../user/user.model"));
const cowSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    location: {
        type: String,
        enum: cow_constraint_1.cowLocation,
    },
    breed: {
        type: String,
        enum: cow_constraint_1.cowBreed,
        required: true,
    },
    weight: {
        type: Number,
        required: true,
    },
    label: {
        type: String,
        enum: ['for sale', 'sold out'],
        default: 'for sale',
        required: true,
    },
    category: {
        type: String,
        enum: cow_constraint_1.cowCategory,
        required: true,
    },
    seller: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, {
    timestamps: true,
});
cowSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const isExist = yield user_model_1.default.findById(this.seller);
        if (!isExist) {
            throw new Error('Seller Not Found');
        }
        else {
            next();
        }
    });
});
const CowModel = (0, mongoose_1.model)('Cow', cowSchema);
exports.default = CowModel;
