import express from 'express';
import { UserController } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';
const router = express.Router();


router
  .route(`/create-customer`)
  .post(validateRequest(UserValidation.createCustomerZodSchema),
    UserController.createCustomer);

router
  .route(`/create-admin`)
  .post(
    validateRequest(UserValidation.createAdminZodSchema),
    UserController.createAdmin
  );

export const UserRouter = router;
