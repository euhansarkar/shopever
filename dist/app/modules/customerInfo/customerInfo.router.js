"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerRouter = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const customerInfo_controller_1 = require("./customerInfo.controller");
const customerInfo_validation_1 = require("./customerInfo.validation");
const router = express_1.default.Router();
router.route(`/`).get(customerInfo_controller_1.CustomerController.getAll);
router
    .route(`/:id`)
    .get(customerInfo_controller_1.CustomerController.getOne)
    .patch((0, validateRequest_1.default)(customerInfo_validation_1.CustomerValidator.updateCustomerZodSchema), customerInfo_controller_1.CustomerController.updateOne)
    .delete(customerInfo_controller_1.CustomerController.deleteOne);
exports.CustomerRouter = router;
