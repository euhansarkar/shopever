import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { OrderController } from './order.controller';
import { OrderValidator } from './order.validator';
const router = express.Router();

router.route(`/`)
    .post(
        auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.CUSTOMER),
        validateRequest(OrderValidator.create), OrderController.createOne)
    .get(
        auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.CUSTOMER),
        OrderController.getAll);

router.route(`/:id`)
    .get(
        auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.CUSTOMER),
        OrderController.getOne)
    .delete(
        auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.CUSTOMER),
        OrderController.deleteOne)
    .patch(
        auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.CUSTOMER),
        validateRequest(OrderValidator.update), OrderController.updateOne)

export const OrderRouter = router 