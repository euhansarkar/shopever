import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ProductValidator } from './product.validator';
import { ProductController } from './product.controller';
const router = express.Router();

router.route(`/`)
    .post(validateRequest(ProductValidator.create), ProductController.createProduct)

export const ProductRouter = router 