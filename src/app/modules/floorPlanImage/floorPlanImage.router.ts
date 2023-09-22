import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { FloorPlanImageController } from './floorPlanImage.controller';
import { FloorPlanImageValidator } from './floorPlanImage.validator';
const router = express.Router();

router
  .route(`/`)
  .post(
    validateRequest(FloorPlanImageValidator.create),
    FloorPlanImageController.createOne
  )
  .get(FloorPlanImageController.getAll);

router
  .route(`/:id`)
  .get(FloorPlanImageController.getOne)
  .patch(
    validateRequest(FloorPlanImageValidator.update),
    FloorPlanImageController.updateOne
  )
  .delete(FloorPlanImageController.deleteOne);

export const FloorPlanImageRouter = router;
