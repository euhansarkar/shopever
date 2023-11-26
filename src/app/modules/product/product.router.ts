import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ProductValidator } from './product.validator';
import { ProductController } from './product.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
const router = express.Router();

router.route(`/`)
    .post(validateRequest(
        ProductValidator.create),
        auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
        ProductController.createProduct)
    .get(
        auth(ENUM_USER_ROLE.CUSTOMER, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
        ProductController.getAll)

router.route(`/:id`)
    .get(
        auth(ENUM_USER_ROLE.CUSTOMER, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
        ProductController.getOne)
    .patch(
        auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
        validateRequest(ProductValidator.update), ProductController.updateOne)
    .delete(
        auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
        ProductController.deleteOne)

export const ProductRouter = router 