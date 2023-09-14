import express from 'express';
import { AcademicSemesterController } from './academicSemester.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemesterValidator } from './academicSemester.validator';
const router = express.Router();

router
  .route(`/`)
  .post(
    validateRequest(AcademicSemesterValidator.create),
    AcademicSemesterController.createAcademicSemester
  )
  .get(AcademicSemesterController.getAllAcademicSemesters);

router
  .route(`/:id`)
  .patch(
    validateRequest(AcademicSemesterValidator.update),
    AcademicSemesterController.updateAcademicSemester
  )
  .delete(AcademicSemesterController.deleteAcademicSemester)
  .get(AcademicSemesterController.getAcademicSemester);

export const AcademicSemesterRouter = router;
