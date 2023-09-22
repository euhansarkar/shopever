import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { propertyAddressController } from './propertyAddress.controller';
import { PropertyAddressValidator } from './propertyAddress.validator';
const router = express.Router();

router
  .route(`/`)
  .post(
    validateRequest(PropertyAddressValidator.create),
    propertyAddressController.createOne
  )
  .get(propertyAddressController.getAll);

router
  .route(`/:id`)
  .get(propertyAddressController.getOne)
  .patch(
    validateRequest(PropertyAddressValidator.update),
    propertyAddressController.updateOne
  )
  .delete(propertyAddressController.deleteOne);

export const propertyAddressRouter = router;
