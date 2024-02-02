"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentMethodRouter = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const paymentMethod_validator_1 = require("./paymentMethod.validator");
const paymentMethod_controller_1 = require("./paymentMethod.controller");
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
router.route(`/`)
    .post((0, validateRequest_1.default)(paymentMethod_validator_1.PaymentMethodValidator.create), (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SUPER_ADMIN), paymentMethod_controller_1.PaymentMethodController.createOne)
    .get((0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SUPER_ADMIN), paymentMethod_controller_1.PaymentMethodController.getAll);
router.route(`/:id`)
    .get((0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SUPER_ADMIN), paymentMethod_controller_1.PaymentMethodController.getOne)
    .patch((0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SUPER_ADMIN), (0, validateRequest_1.default)(paymentMethod_validator_1.PaymentMethodValidator.update), paymentMethod_controller_1.PaymentMethodController.updateOne)
    .delete((0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SUPER_ADMIN), paymentMethod_controller_1.PaymentMethodController.deleteOne);
exports.PaymentMethodRouter = router;
