"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['buyer', 'seller'],
        required: true,
    },
    name: {
        type: {
            firstName: {
                type: String,
            },
            lastName: {
                type: String,
            },
        },
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    budget: {
        type: Number,
        required: true,
        default: 0,
    },
    income: {
        type: Number,
        required: true,
        default: 0,
    },
}, {
    timestamps: true,
});
const UserModel = (0, mongoose_1.model)('User', userSchema);
exports.default = UserModel;
