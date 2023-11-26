import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ShippingMethodValidator } from './shippingMethod.validator';
import { ShippingMethodController } from './shippingMethod.controller';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
const router = express.Router();

router.route(`/`)
    .post(
        validateRequest(ShippingMethodValidator.create),
        auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
        ShippingMethodController.createOne
    )
    .get(
        auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
        ShippingMethodController.getAll);


router.route(`/:id`)
    .get(
        auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
        ShippingMethodController.getOne)
    .patch(validateRequest(ShippingMethodValidator.update),
        auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
        ShippingMethodController.updateOne)
    .delete(
        auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
        ShippingMethodController.deleteOne)

export const ShippingMethodRouter = router 