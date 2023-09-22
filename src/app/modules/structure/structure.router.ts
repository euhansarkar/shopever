import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { structureController } from './structure.controller';
import { StructureValidator } from './structure.validator';
const router = express.Router();

router
  .route(`/`)
  .post(
    validateRequest(StructureValidator.create),
    structureController.createOne
  )
  .get(structureController.getAll);

router
  .route(`/:id`)
  .get(structureController.getOne)
  .patch(
    validateRequest(StructureValidator.update),
    structureController.updateOne
  )
  .delete(structureController.deleteOne);

export const StructureRouter = router;
