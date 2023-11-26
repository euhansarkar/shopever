import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CategoryValidator } from './category.validator';
import { CategoryController } from './category.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
const router = express.Router();

router.route(`/`)
    .post(
        auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
        validateRequest(CategoryValidator.create), CategoryController.createOne)
    .get(
        auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
        CategoryController.getAll)

router.route(`/:id`)
    .get(
        auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
        CategoryController.getOne)
    .patch(
        auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
        validateRequest(CategoryValidator.update), CategoryController.updateOne)
    .delete(
        auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
        CategoryController.deleteOne)

export const CategoryRouter = router 