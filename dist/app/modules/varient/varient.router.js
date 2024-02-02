"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VarientRouter = void 0;
const express_1 = __importDefault(require("express"));
const varient_validator_1 = require("./varient.validator");
const varient_controller_1 = require("./varient.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_1 = require("../../../enums/user");
const fileUploadHelper_1 = require("../../../helpers/fileUploadHelper");
const router = express_1.default.Router();
router.route(`/`)
    .post((0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SUPER_ADMIN), 
// VarientController.createVarient
fileUploadHelper_1.FileUploadHeler.upload.single(`file`), (req, res, next) => {
    req.body = varient_validator_1.VarientValidator.create.parse(JSON.parse(req.body.data));
    return varient_controller_1.VarientController.createOne(req, res, next);
})
    .get((0, auth_1.default)(user_1.ENUM_USER_ROLE.CUSTOMER, user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SUPER_ADMIN), varient_controller_1.VarientController.getAll);
router.route(`/:id`)
    .get((0, auth_1.default)(user_1.ENUM_USER_ROLE.CUSTOMER, user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SUPER_ADMIN), varient_controller_1.VarientController.getOne)
    .patch((0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SUPER_ADMIN), fileUploadHelper_1.FileUploadHeler.upload.single(`file`), (req, res, next) => {
    req.body = varient_validator_1.VarientValidator.update.parse(JSON.parse(req.body.data));
    return varient_controller_1.VarientController.updateOne(req, res, next);
})
    .delete((0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SUPER_ADMIN), varient_controller_1.VarientController.deleteOne);
exports.VarientRouter = router;
