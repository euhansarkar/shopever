import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AttributeValidator } from './attribute.validator';
import { AttributeController } from './attribute.controller';
const router = express.Router();

router.route(`/`)
    .post(validateRequest(AttributeValidator.create), AttributeController.createOne)
    .get(AttributeController.getAll);

router.route(`/:id`)
    .get(AttributeController.getOne)
    .delete(AttributeController.deleteOne)
    .patch(validateRequest(AttributeValidator.update), AttributeController.updateOne)

export const AttributeRouter = router 