import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UnitController } from './unit.controller';
import { UnitValidator } from './unit.validator';
const router = express.Router();

router
  .route(`/`)
  .post(validateRequest(UnitValidator.create), UnitController.createOne)
  .get(UnitController.getAll);

router
  .route(`/:id`)
  .get(UnitController.getOne)
  .patch(validateRequest(UnitValidator.update), UnitController.updateOne)
  .delete(UnitController.deleteOne);

export const UnitRouter = router;
