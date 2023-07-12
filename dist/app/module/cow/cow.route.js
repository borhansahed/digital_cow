"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CowRoute = void 0;
const express_1 = __importDefault(require("express"));
const cow_controller_1 = require("./cow.controller");
const auth_1 = require("../../middleware/auth");
const role_enum_1 = require("../../../enum/role.enum");
const router = express_1.default.Router();
router.get('/', auth_1.auth.authorization(role_enum_1.USER_ROLE.ADMIN, role_enum_1.USER_ROLE.SELLER, role_enum_1.USER_ROLE.BUYER), cow_controller_1.CowController.getAllCow);
router.post('/', auth_1.auth.authorization(role_enum_1.USER_ROLE.SELLER), cow_controller_1.CowController.addNewCow);
router.get('/:id', auth_1.auth.authorization(role_enum_1.USER_ROLE.ADMIN, role_enum_1.USER_ROLE.SELLER, role_enum_1.USER_ROLE.BUYER), cow_controller_1.CowController.getOneCow);
router.patch('/:id', auth_1.auth.authorization(role_enum_1.USER_ROLE.SELLER), cow_controller_1.CowController.updateOneCow);
router.delete('/:id', auth_1.auth.authorization(role_enum_1.USER_ROLE.SELLER), cow_controller_1.CowController.deleteOneCow);
exports.CowRoute = router;
