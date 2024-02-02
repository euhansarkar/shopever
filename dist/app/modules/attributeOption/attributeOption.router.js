"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttributeOptionRouter = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const attributeOption_controller_1 = require("./attributeOption.controller");
const attributeOption_validator_1 = require("./attributeOption.validator");
const router = express_1.default.Router();
router.route(`/:id`)
    .put((0, validateRequest_1.default)(attributeOption_validator_1.AttributeOptionValidator.update), (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SUPER_ADMIN), attributeOption_controller_1.AttributeOptionController.updateOne);
exports.AttributeOptionRouter = router;
