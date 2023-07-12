"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jwtHelper_1 = require("../../helper/jwtHelper");
const config_1 = __importDefault(require("../../config"));
const authorization = (...role) => (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token)
            throw new Error('Token not valid');
        const verifiedToken = jwtHelper_1.JwtHelper.verifyToken(token, config_1.default.jwt.access_token);
        req.user = verifiedToken;
        if (role.length && !role.includes(verifiedToken.role)) {
            throw new Error('forbidden');
        }
        next();
    }
    catch (err) {
        next(err);
    }
};
exports.auth = {
    authorization,
};
