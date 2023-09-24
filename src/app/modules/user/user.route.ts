import express from 'express';
import { UserController } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';
const router = express.Router();

router
  .route(`/create-student`)
  .post(
    validateRequest(UserValidation.createStudentZodSchema),
    UserController.createStudent
  );

router
  .route(`/create-faculty`)
  .post(
    validateRequest(UserValidation.createFacultyZodSchema),
    UserController.createFaculty
  );

router
  .route(`/create-admin`)
  .post(
    validateRequest(UserValidation.createAdminZodSchema),
    UserController.createAdmin
  );

export const UserRouter = router;
