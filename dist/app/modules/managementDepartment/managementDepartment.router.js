"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManagementDepartmentRouter = void 0;
const express_1 = __importDefault(require("express"));
const managementDepartment_controller_1 = require("./managementDepartment.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const managementDepartment_validator_1 = require("./managementDepartment.validator");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_1 = require("../../../enums/user");
const router = express_1.default.Router();
router
    .route(`/`)
    .post((0, validateRequest_1.default)(managementDepartment_validator_1.ManagementDepartmentValidator.create), (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SUPER_ADMIN), managementDepartment_controller_1.ManagementDepartmentController.createOne)
    .get((0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SUPER_ADMIN), managementDepartment_controller_1.ManagementDepartmentController.getAll);
router
    .route(`/:id`)
    .get((0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SUPER_ADMIN), managementDepartment_controller_1.ManagementDepartmentController.getOne)
    .patch((0, validateRequest_1.default)(managementDepartment_validator_1.ManagementDepartmentValidator.update), (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SUPER_ADMIN), managementDepartment_controller_1.ManagementDepartmentController.updateOne)
    .delete((0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SUPER_ADMIN), managementDepartment_controller_1.ManagementDepartmentController.deleteOne);
exports.ManagementDepartmentRouter = router;
