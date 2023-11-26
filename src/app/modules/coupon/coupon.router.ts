import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CouponValidator } from './coupon.validator';
import { CouponController } from './coupon.controller';
const router = express.Router();

router.route(`/`)
    .post(validateRequest(CouponValidator.create), CouponController.createOne)
    .get(CouponController.getAll)

router.route(`/:id`)
    .get(CouponController.getOne)
    .patch(validateRequest(CouponValidator.update), CouponController.updateOne)
    .delete(CouponController.deleteOne)

export const CouponRouter = router 