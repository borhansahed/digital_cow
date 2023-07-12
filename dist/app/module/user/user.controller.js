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
exports.UserController = void 0;
const user_service_1 = require("./user.service");
const http_status_1 = __importDefault(require("http-status"));
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _a = req.body, { phoneNumber } = _a, userData = __rest(_a, ["phoneNumber"]);
        if (!Number(phoneNumber)) {
            throw new Error('invalid number');
        }
        const result = yield user_service_1.UserService.createUser(Object.assign(Object.assign({}, userData), { phoneNumber }));
        res.status(http_status_1.default.OK).json({
            success: true,
            message: 'user created successfully',
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
const getAllUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_service_1.UserService.getAllUser();
        res.status(http_status_1.default.OK).json({
            success: true,
            message: 'Users retrieved successfully',
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
const getOneUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_service_1.UserService.getOneUser(req.params.id);
        res.status(http_status_1.default.OK).json({
            success: true,
            message: 'User retrieved successfully',
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
const deleteOneUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_service_1.UserService.deleteOneUser(req.params.id);
        res.status(http_status_1.default.OK).json({
            success: true,
            message: 'User Delete successfully',
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
const updateOneUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedData = __rest(req.body, []);
        const result = yield user_service_1.UserService.updateOneUser(updatedData, req.params.id);
        res.status(http_status_1.default.OK).json({
            success: true,
            message: 'User Updated successfully',
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
const myProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = req.user;
        const result = yield user_service_1.UserService.getOneUser(userData.id);
        res.status(http_status_1.default.OK).json({
            success: true,
            message: `${userData.role} data retrieved successfully`,
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
const myProfileUpDate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = req.user;
        const result = yield user_service_1.UserService.updateOneUser(req.body, userData.id, userData.role);
        res.status(http_status_1.default.OK).json({
            success: true,
            message: `${userData.role} data updated successfully`,
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.UserController = {
    createUser,
    getAllUser,
    getOneUser,
    deleteOneUser,
    updateOneUser,
    myProfile,
    myProfileUpDate,
};
