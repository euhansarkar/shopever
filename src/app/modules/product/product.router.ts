import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ProductValidator } from './product.validator';
import { ProductController } from './product.controller';
const router = express.Router();

router.route(`/`)
    .post(validateRequest(ProductValidator.create), ProductController.createProduct)
    .get(ProductController.getAll)

router.route(`/:id`)
    .get(ProductController.getOne)
    .patch(validateRequest(ProductValidator.update), ProductController.updateOne)
    .delete(ProductController.deleteOne)

export const ProductRouter = router 