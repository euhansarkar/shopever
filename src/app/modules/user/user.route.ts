import express from 'express';
import { UserController } from './user.controller';
const router = express.Router();

router
  .route(`/`)
  .post(UserController.createUser)
  .delete(UserController.bulkDelete)
  .get(UserController.getAllUsers);

export const UserRouter = router;
