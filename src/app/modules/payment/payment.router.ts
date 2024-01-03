import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { PaymentValidator } from './payment.validator';
import { PaymentController } from './payment.controller';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
const router = express.Router();

router.route(`/create-payment-intent`)
    .post(
        validateRequest(PaymentValidator.create),
        auth(ENUM_USER_ROLE.CUSTOMER, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
        PaymentController.createOne
    )


export const PaymentRouter = router 