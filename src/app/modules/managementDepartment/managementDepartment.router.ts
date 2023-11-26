import express from 'express';
import { ManagementDepartmentController } from './managementDepartment.controller';
import validateRequest from '../../middlewares/validateRequest';
import { ManagementDepartmentValidator } from './managementDepartment.validator';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
const router = express.Router();

router
  .route(`/`)
  .post(
    validateRequest(ManagementDepartmentValidator.create),
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
    ManagementDepartmentController.createOne
  )
  .get(
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
    ManagementDepartmentController.getAll);

router
  .route(`/:id`)
  .get(
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
    ManagementDepartmentController.getOne)
  .patch(
    validateRequest(ManagementDepartmentValidator.update),
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
    ManagementDepartmentController.updateOne
  )
  .delete(
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
    ManagementDepartmentController.deleteOne);

export const ManagementDepartmentRouter = router;
