import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { OrderValidator } from './order.validator';
import { OrderController } from './order.controller';
const router = express.Router();

router.route(`/`)
    .post(
        validateRequest(OrderValidator.create),
        OrderController.createOne
    )
    .get(OrderController.getAll);


router.route(`/:id`)
    .get(OrderController.getOne)
    .patch(validateRequest(OrderValidator.update), OrderController.updateOne)
    .delete(OrderController.deleteOne)

export const OrderRouter = router 