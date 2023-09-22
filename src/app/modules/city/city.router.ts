import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CityValidator } from './city.validator';
import { CityController } from './city.controller';
const router = express.Router();

router
  .route(`/`)
  .post(validateRequest(CityValidator.create), CityController.createOne)
  .get(CityController.getAll);

router
  .route(`/:id`)
  .get(CityController.getOne)
  .patch(validateRequest(CityValidator.update), CityController.updateOne)
  .delete(CityController.deleteOne);

export const CityRouter = router;
