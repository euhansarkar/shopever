import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CollectionValidator } from './collection.validator';
import { CollectionController } from './collection.controller';
const router = express.Router();

router.route(`/`)
    .post(
        validateRequest(CollectionValidator.create),
        CollectionController.createOne
    )
    .get(CollectionController.getAll);


router.route(`/:id`)
    .get(CollectionController.getOne)
    .patch(validateRequest(CollectionValidator.update), CollectionController.updateOne)
    .delete(CollectionController.deleteOne)

export const CollectionRouter = router 