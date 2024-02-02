"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShippingMethodRouter = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const shippingMethod_validator_1 = require("./shippingMethod.validator");
const shippingMethod_controller_1 = require("./shippingMethod.controller");
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
router.route(`/`)
    .post((0, validateRequest_1.default)(shippingMethod_validator_1.ShippingMethodValidator.create), (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SUPER_ADMIN), shippingMethod_controller_1.ShippingMethodController.createOne)
    .get((0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SUPER_ADMIN), shippingMethod_controller_1.ShippingMethodController.getAll);
router.route(`/:id`)
    .get((0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SUPER_ADMIN), shippingMethod_controller_1.ShippingMethodController.getOne)
    .patch((0, validateRequest_1.default)(shippingMethod_validator_1.ShippingMethodValidator.update), (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SUPER_ADMIN), shippingMethod_controller_1.ShippingMethodController.updateOne)
    .delete((0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SUPER_ADMIN), shippingMethod_controller_1.ShippingMethodController.deleteOne);
exports.ShippingMethodRouter = router;
