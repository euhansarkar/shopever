import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AmenityController } from './amenity.controller';
import { AmenityValidator } from './amenity.validator';
const router = express.Router();

router
  .route(`/`)
  .post(validateRequest(AmenityValidator.create), AmenityController.createOne)
  .get(AmenityController.getAll);

router
  .route(`/:id`)
  .get(AmenityController.getOne)
  .patch(validateRequest(AmenityValidator.update), AmenityController.updateOne)
  .delete(AmenityController.deleteOne);

export const AmenityRouter = router;
