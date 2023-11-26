import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { PaymentMethodValidator } from './paymentMethod.validator';
import { PaymentMethodController } from './paymentMethod.controller';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
const router = express.Router();

router.route(`/`)
    .post(
        validateRequest(PaymentMethodValidator.create),
        auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
        PaymentMethodController.createOne
    )
    .get(
        auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
        PaymentMethodController.getAll);


router.route(`/:id`)
    .get(
        auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
        PaymentMethodController.getOne)
    .patch(
        auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
        validateRequest(PaymentMethodValidator.update), PaymentMethodController.updateOne)
    .delete(
        auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
        PaymentMethodController.deleteOne)

export const PaymentMethodRouter = router 