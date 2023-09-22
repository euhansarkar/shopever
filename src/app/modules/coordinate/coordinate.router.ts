import express from 'express';
import { CoordinateController } from './coordinate.controller';
import validateRequest from '../../middlewares/validateRequest';
import { CoordinateValidator } from './coordinate.validator';
const router = express.Router();

router
  .route(`/`)
  .post(
    validateRequest(CoordinateValidator.create),
    CoordinateController.createOne
  )
  .get(CoordinateController.getAll);

router
  .route(`/:id`)
  .get(CoordinateController.getOne)
  .patch(
    validateRequest(CoordinateValidator.update),
    CoordinateController.updateOne
  )
  .delete(CoordinateController.deleteOne);

export const CoordinateRouter = router;
