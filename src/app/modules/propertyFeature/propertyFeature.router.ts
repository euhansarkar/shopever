import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { PropertyFeatureController } from './propertyFeature.controller';
import { PropertyFeatureValidator } from './propertyFeature.validator';
const router = express.Router();

router
  .route(`/`)
  .post(
    validateRequest(PropertyFeatureValidator.create),
    PropertyFeatureController.createOne
  )
  .get(PropertyFeatureController.getAll);

router
  .route(`/:id`)
  .get(PropertyFeatureController.getOne)
  .patch(
    validateRequest(PropertyFeatureValidator.update),
    PropertyFeatureController.updateOne
  )
  .delete(PropertyFeatureController.deleteOne);

export const PropertyFeatureRouter = router;
