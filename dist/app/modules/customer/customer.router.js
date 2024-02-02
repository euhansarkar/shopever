"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerRouter = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const customer_controller_1 = require("./customer.controller");
const customer_validation_1 = require("./customer.validation");
const router = express_1.default.Router();
router.route(`/`).get(customer_controller_1.CustomerController.getAll);
router
    .route(`/:id`)
    .get(customer_controller_1.CustomerController.getOne)
    .patch((0, validateRequest_1.default)(customer_validation_1.CustomerValidator.updateCustomerZodSchema), customer_controller_1.CustomerController.updateOne)
    .delete(customer_controller_1.CustomerController.deleteOne);
exports.CustomerRouter = router;
