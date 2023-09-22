import express from 'express';
import { StudentController } from './student.controller';
import validateRequest from '../../middlewares/validateRequest';
import { StudentValidator } from './student.validation';
const router = express.Router();

router.route(`/`).get(StudentController.getAll);

router
  .route(`/:id`)
  .get(StudentController.getOne)
  .patch(
    validateRequest(StudentValidator.updateStudentZodSchema),
    StudentController.updateOne
  )
  .delete(StudentController.deleteOne);

export const StudentRouter = router;
