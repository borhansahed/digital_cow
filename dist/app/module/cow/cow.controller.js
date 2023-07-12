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
exports.CowController = void 0;
const cow_service_1 = require("./cow.service");
const http_status_1 = __importDefault(require("http-status"));
const pagination_1 = require("../../../helper/pagination");
const cow_constraint_1 = require("./cow.constraint");
const pick_1 = __importDefault(require("../../../shared/pick"));
const addNewCow = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cowData = __rest(req.body, []);
        const result = yield cow_service_1.CowService.addNewCow(cowData);
        res.status(http_status_1.default.OK).json({
            success: true,
            message: ' Added new Cow successfully',
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
const getAllCow = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filters = (0, pick_1.default)(req.query, cow_constraint_1.filtersKey);
        const pagination = (0, pagination_1.paginationHelper)(req.query);
        const result = yield cow_service_1.CowService.getAllCow(filters, pagination);
        res.status(http_status_1.default.OK).json({
            success: true,
            message: ' Cows  retrieved successfully',
            meta: result === null || result === void 0 ? void 0 : result.meta,
            data: result === null || result === void 0 ? void 0 : result.data,
        });
    }
    catch (err) {
        next(err);
    }
});
const getOneCow = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield cow_service_1.CowService.getOneCow(id);
        res.status(http_status_1.default.OK).json({
            success: true,
            message: ' Cow retrieved successfully',
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
const deleteOneCow = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield cow_service_1.CowService.deleteOneCow(id);
        res.status(http_status_1.default.OK).json({
            success: true,
            message: ' Cow Deleted successfully',
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
const updateOneCow = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cowData = __rest(req.body, []);
        const { id } = req.params;
        const result = yield cow_service_1.CowService.updateOneCow(id, cowData);
        res.status(http_status_1.default.OK).json({
            success: true,
            message: ' Added new Cow successfully',
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.CowController = {
    addNewCow,
    getAllCow,
    getOneCow,
    deleteOneCow,
    updateOneCow,
};
