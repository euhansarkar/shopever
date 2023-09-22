import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { RentPropertyController } from './rentProperty.controller';
import { RentPropertyValidator } from './rentProperty.validator';
const router = express.Router();

router
  .route(`/`)
  .post(
    validateRequest(RentPropertyValidator.create),
    RentPropertyController.createOne
  )
  .get(RentPropertyController.getAll);

router
  .route(`/:id`)
  .get(RentPropertyController.getOne)
  .patch(
    validateRequest(RentPropertyValidator.update),
    RentPropertyController.updateOne
  )
  .delete(RentPropertyController.deleteOne);

export const RentPropertyRouter = router;
