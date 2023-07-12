"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleValidationError = void 0;
const handleValidationError = (err) => {
    const errorMessages = Object.values(err.errors).map((e) => {
        return {
            path: e === null || e === void 0 ? void 0 : e.path,
            message: e === null || e === void 0 ? void 0 : e.message,
        };
    });
    return {
        message: 'Validation Error',
        errorMessages,
    };
};
exports.handleValidationError = handleValidationError;
