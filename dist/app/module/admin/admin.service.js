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
exports.AdminService = void 0;
const config_1 = __importDefault(require("../../../config"));
const bcryptHelper_1 = require("../../../helper/bcryptHelper");
const jwtHelper_1 = require("../../../helper/jwtHelper");
const admin_model_1 = __importDefault(require("./admin.model"));
const createAdmin = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield admin_model_1.default.create(payload);
    return result;
});
const adminLogin = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { phoneNumber, password } = payload;
    const isExits = yield admin_model_1.default.findOne({ phoneNumber });
    if (!isExits)
        throw new Error('Admin is not Valid');
    if (!(yield bcryptHelper_1.BcryptHelper.comparePassword(password, isExits.password))) {
        throw new Error('Password is incorrect');
    }
    // create Token
    const accessToken = jwtHelper_1.JwtHelper.createToken({
        id: isExits._id,
        role: isExits.role,
    }, config_1.default.jwt.access_token, {
        expiresIn: config_1.default.jwt.access_token_expires,
    });
    const refreshToken = jwtHelper_1.JwtHelper.createToken({
        id: isExits._id,
        role: isExits.role,
    }, config_1.default.jwt.refresh_token, {
        expiresIn: config_1.default.jwt.refresh_token_expires,
    });
    return {
        accessToken,
        refreshToken,
    };
});
const generateWithRefreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const verifiedToken = jwtHelper_1.JwtHelper.verifyToken(token, config_1.default.jwt.refresh_token);
    if (!verifiedToken)
        throw new Error('Invalid refreshToken');
    const { id } = verifiedToken;
    const isUserExit = yield admin_model_1.default.findOne({ _id: id });
    if (!isUserExit) {
        throw new Error("User doesn't found");
    }
    const newAccessToken = jwtHelper_1.JwtHelper.createToken({
        id: isUserExit.id,
        role: isUserExit.role,
    }, config_1.default.jwt.access_token, { expiresIn: config_1.default.jwt.access_token_expires });
    return {
        newAccessToken,
    };
});
const getAdmin = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield admin_model_1.default.findById(id);
    return result;
});
const getOneAdmin = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield admin_model_1.default.findById(id);
});
const updateOneAdmin = (payload, id) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = payload, adminData = __rest(payload, ["name"]);
    const updatedAdmin = Object.assign({}, adminData);
    if (name && Object.keys(name).length > 0) {
        Object.keys(name).forEach(key => {
            const nameKey = `name.${key}`;
            updatedAdmin[nameKey] = name[key];
        });
    }
    return yield admin_model_1.default.findByIdAndUpdate(id, { $set: updatedAdmin }, { new: true });
});
exports.AdminService = {
    createAdmin,
    adminLogin,
    generateWithRefreshToken,
    getAdmin,
    getOneAdmin,
    updateOneAdmin,
};
