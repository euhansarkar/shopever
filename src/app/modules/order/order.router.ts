import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { OrderValidator } from './order.validator';
import { OrderController } from './order.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
const router = express.Router();

router.route(`/`)
    .post(
        validateRequest(OrderValidator.create),
        auth(ENUM_USER_ROLE.CUSTOMER, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
        OrderController.createOne
    )
    .get(
        auth(ENUM_USER_ROLE.CUSTOMER, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
        OrderController.getAll);


router.route(`/:id`)
    .get(
        auth(ENUM_USER_ROLE.CUSTOMER, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
        OrderController.getOne)
    .patch(
        validateRequest(OrderValidator.update),
        auth(ENUM_USER_ROLE.CUSTOMER, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
        OrderController.updateOne)
    .delete(
        auth(ENUM_USER_ROLE.CUSTOMER, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
        OrderController.deleteOne)

export const OrderRouter = router 