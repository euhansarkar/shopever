import express from 'express';
import { UserController } from './user.controller';
const router = express.Router();

router
  .route(`/`)
  .post(UserController.createStudent)
  .delete(UserController.bulkDelete)
  .get(UserController.getAllUsers);

router.route(`/create-customer`).post(UserController.createStudent);

export const UserRouter = router;
