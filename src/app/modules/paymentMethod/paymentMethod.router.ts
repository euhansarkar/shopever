import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { PaymentMethodValidator } from './paymentMethod.validator';
import { PaymentMethodController } from './paymentMethod.controller';
const router = express.Router();

router.route(`/`)
    .post(
        validateRequest(PaymentMethodValidator.create),
        PaymentMethodController.createOne
    )
    .get(PaymentMethodController.getAll);


router.route(`/:id`)
    .get(PaymentMethodController.getOne)
    .patch(validateRequest(PaymentMethodValidator.update), PaymentMethodController.updateOne)
    .delete(PaymentMethodController.deleteOne)

export const PaymentMethodRouter = router 