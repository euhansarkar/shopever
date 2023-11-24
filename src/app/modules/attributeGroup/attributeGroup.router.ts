import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AttributeGroupValidator } from './attributeGroup.validator';
import { attributeGroupController } from './attributeGroup.controller';
const router = express.Router();

router.route(`/`)
    .post(
        validateRequest(AttributeGroupValidator.create),
        attributeGroupController.createOne
    )
    .get(attributeGroupController.getAll);


router.route(`/:id`)
    .get(attributeGroupController.getOne)
    .patch(validateRequest(AttributeGroupValidator.update), attributeGroupController.updateOne)
    .delete(attributeGroupController.deleteOne)

export const AttributeGroupRouter = router 