import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthValidator } from './auth.validator';
import { AuthController } from './auth.controller';
const router = express.Router();

router
  .route(`/login`)
  .post(validateRequest(AuthValidator.login), AuthController.login);

router
  .route(`/refresh-token`)
  .post(validateRequest(AuthValidator.refreshToken), AuthController.refreshToken);

export const AuthRouter = router;
