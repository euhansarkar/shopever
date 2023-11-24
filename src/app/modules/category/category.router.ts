import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CategoryValidator } from './category.validator';
import { CategoryController } from './category.controller';
const router = express.Router();

router.route(`/`)
    .post(validateRequest(CategoryValidator.create), CategoryController.createOne)
    .get(CategoryController.getAll)

router.route(`/:id`)
    .get(CategoryController.getOne)
    .patch(validateRequest(CategoryValidator.update), CategoryController.updateOne)
    .delete(CategoryController.deleteOne)

export const CategoryRouter = router 