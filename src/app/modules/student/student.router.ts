import express from 'express';
import { StudentController } from './student.controller';
import validateRequest from '../../middlewares/validateRequest';
import { StudentValidator } from './student.validation';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
const router = express.Router();

router
  .route(`/`)
  .get(
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
    StudentController.getAll
  );

router
  .route(`/:id`)
  .get(StudentController.getOne)
  .patch(
    validateRequest(StudentValidator.updateStudentZodSchema),
    StudentController.updateOne
  )
  .delete(StudentController.deleteOne);

export const StudentRouter = router;
