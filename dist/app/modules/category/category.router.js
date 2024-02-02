"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRouter = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const category_validator_1 = require("./category.validator");
const category_controller_1 = require("./category.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_1 = require("../../../enums/user");
const fileUploadHelper_1 = require("../../../helpers/fileUploadHelper");
const router = express_1.default.Router();
router.route(`/`)
    .post((0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SUPER_ADMIN), 
// validateRequest(CategoryValidator.create),
fileUploadHelper_1.FileUploadHeler.upload.single('file'), (req, res, next) => {
    req.body = category_validator_1.CategoryValidator.create.parse(JSON.parse((req.body.data)));
    return category_controller_1.CategoryController.createOne(req, res, next);
})
    .get(
// auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
category_controller_1.CategoryController.getAll);
router.route(`/:id`)
    .get(
// auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
category_controller_1.CategoryController.getOne)
    .patch((0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SUPER_ADMIN), (0, validateRequest_1.default)(category_validator_1.CategoryValidator.update), category_controller_1.CategoryController.updateOne)
    .delete((0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SUPER_ADMIN), category_controller_1.CategoryController.deleteOne);
exports.CategoryRouter = router;
