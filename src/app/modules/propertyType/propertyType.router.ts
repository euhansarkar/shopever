import express from 'express';
import { PropertyTypeController } from './propertyType.controller';
import validateRequest from '../../middlewares/validateRequest';
import { PropertyTypeValidator } from './propertyType.validator';
const router = express.Router();

router
  .route(`/`)
  .post(
    validateRequest(PropertyTypeValidator.create),
    PropertyTypeController.createpropertyType
  )
  .get(PropertyTypeController.getAllpropertyTypees);

router
  .route(`/:id`)
  .get(PropertyTypeController.getOne)
  .patch(
    validateRequest(PropertyTypeValidator.update),
    PropertyTypeController.updateOne
  )
  .delete(PropertyTypeController.deleteOne);

export const PropertyTypeRouter = router;
