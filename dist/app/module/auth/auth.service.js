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
exports.AuthService = void 0;
const jwtHelper_1 = require("../../../helper/jwtHelper");
const bcryptHelper_1 = require("../../../helper/bcryptHelper");
const user_model_1 = __importDefault(require("../user/user.model"));
const config_1 = __importDefault(require("../../../config"));
const userLogin = (loginData) => __awaiter(void 0, void 0, void 0, function* () {
    const { phoneNumber, password } = loginData;
    const isExits = yield user_model_1.default.findOne({ phoneNumber });
    if (!isExits)
        throw new Error('User is not Valid');
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
    const isUserExit = yield user_model_1.default.findOne({ _id: id });
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
exports.AuthService = {
    userLogin,
    generateWithRefreshToken,
};
