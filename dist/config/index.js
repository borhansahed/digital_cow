"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join(process.cwd(), '.env') });
const config = {
    node_env: process.env.NODE_ENV,
    db_user: process.env.DB_USER,
    db_pass: process.env.DB_PASS,
    db_url: process.env.DB_URL,
    bcrypt_salt_round: process.env.BCRYPT_SALT_ROUND,
    jwt: {
        access_token: process.env.JWT_ACCESS_TOKEN_SECRET_EXPIRES,
        access_token_expires: process.env.JWT_ACCESS_TOKEN_SECRET_EXPIRES,
        refresh_token: process.env.JWT_REFRESH_TOKEN_SECRET_EXPIRES,
        refresh_token_expires: process.env.JWT_REFRESH_TOKEN_SECRET_EXPIRES,
    },
};
exports.default = config;
