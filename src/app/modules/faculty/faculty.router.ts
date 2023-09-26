import express from 'express';
import { FacultyController } from './faculty.controller';
import validateRequest from '../../middlewares/validateRequest';
import { FacultyValidator } from './faculty.validation';
const router = express.Router();

router.route(`/`).get(FacultyController.getAll);

router
  .route(`/:id`)
  .get(FacultyController.getOne)
  .patch(
    validateRequest(FacultyValidator.updateFacultyZodSchema),
    FacultyController.updateOne
  )
  .delete(FacultyController.deleteOne);

export const FacultyRouter = router;
