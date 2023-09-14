import express from 'express';
import { AcademicFacultyController } from './academicFaculty.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicFacultyValidator } from './academicFaculty.validator';
const router = express.Router();

router
  .route(`/`)
  .post(
    validateRequest(AcademicFacultyValidator.create),
    AcademicFacultyController.createAcademicFaculty
  );

export const AcademicFacultyRouter = router;
