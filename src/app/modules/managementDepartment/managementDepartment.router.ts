import express from 'express';
import { ManagementDepartmentController } from './managementDepartment.controller';
import validateRequest from '../../middlewares/validateRequest';
import { ManagementDepartmentValidator } from './managementDepartment.validator';
const router = express.Router();

router
  .route(`/`)
  .post(
    validateRequest(ManagementDepartmentValidator.create),
    ManagementDepartmentController.createOne
  )
  .get(ManagementDepartmentController.getAll);

router
  .route(`/:id`)
  .get(ManagementDepartmentController.getOne)
  .patch(
    validateRequest(ManagementDepartmentValidator.update),
    ManagementDepartmentController.updateOne
  )
  .delete(ManagementDepartmentController.deleteOne);

export const ManagementDepartmentRouter = router;
