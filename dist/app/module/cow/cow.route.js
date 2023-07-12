"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CowRouter = void 0;
const express_1 = __importDefault(require("express"));
const cow_controller_1 = require("./cow.controller");
const router = express_1.default.Router();
router.get('/', cow_controller_1.CowController.getAllCow);
router.post('/', cow_controller_1.CowController.addNewCow);
router.get('/:id', cow_controller_1.CowController.getOneCow);
router.patch('/:id', cow_controller_1.CowController.updateOneCow);
router.delete('/:id', cow_controller_1.CowController.deleteOneCow);
exports.CowRouter = router;
