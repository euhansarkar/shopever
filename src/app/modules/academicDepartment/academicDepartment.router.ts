import express from 'express';
import { AcademicDepartmentController } from './academicDepartment.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicDepartmentValidator } from './academicDepartment.validation';
const router = express.Router();

router
  .route(`/`)
  .post(
    validateRequest(AcademicDepartmentValidator.create),
    AcademicDepartmentController.createAcademicDepartment
  )
  .get(AcademicDepartmentController.getAllAcademicDepartments);

router
  .route(`/:id`)
  .get(AcademicDepartmentController.getAcademicDepartment)
  .patch(
    validateRequest(AcademicDepartmentValidator.update),
    AcademicDepartmentController.updateAcademicDepartment
  )
  .delete(AcademicDepartmentController.deleteAcademicDepartment);

export const AcademicDepartmentRouter = router;
