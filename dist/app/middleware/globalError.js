"use strict";
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const handleValidationError_1 = require("../../error/handleValidationError");
const http_status_1 = __importDefault(require("http-status"));
const globalErrorHandler = (err, req, res, next) => {
    const success = false;
    let message = 'Something wrong here';
    let errorMessages = [];
    if ((err === null || err === void 0 ? void 0 : err.name) === 'ValidationError') {
        const simpleErrorMessage = (0, handleValidationError_1.handleValidationError)(err);
        message = simpleErrorMessage.message;
        errorMessages = simpleErrorMessage.errorMessages;
    }
    else if (err instanceof Error) {
        message = err === null || err === void 0 ? void 0 : err.name;
        errorMessages = err.message
            ? [
                {
                    path: '',
                    message: err === null || err === void 0 ? void 0 : err.message,
                },
            ]
            : [];
    }
    res.status(http_status_1.default.BAD_REQUEST).send({
        success,
        message,
        errorMessages,
        stack: process.env.NODE_ENV === 'development' ? err === null || err === void 0 ? void 0 : err.stack : null,
    });
};
exports.default = globalErrorHandler;
