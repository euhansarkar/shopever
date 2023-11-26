import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ShippingMethodValidator } from './shippingMethod.validator';
import { ShippingMethodController } from './shippingMethod.controller';
const router = express.Router();

router.route(`/`)
    .post(
        validateRequest(ShippingMethodValidator.create),
        ShippingMethodController.createOne
    )
    .get(ShippingMethodController.getAll);


router.route(`/:id`)
    .get(ShippingMethodController.getOne)
    .patch(validateRequest(ShippingMethodValidator.update), ShippingMethodController.updateOne)
    .delete(ShippingMethodController.deleteOne)

export const ShippingMethodRouter = router 