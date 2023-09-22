import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ApartmentController } from './apartment.controller';
import { ApartmentValidator } from './apartment.validator';
const router = express.Router();

router
  .route(`/`)
  .post(
    validateRequest(ApartmentValidator.create),
    ApartmentController.createOne
  )
  .get(ApartmentController.getAll);

router
  .route(`/:id`)
  .get(ApartmentController.getOne)
  .patch(
    validateRequest(ApartmentValidator.update),
    ApartmentController.updateOne
  )
  .delete(ApartmentController.deleteOne);

export const ApartmentRouter = router;
