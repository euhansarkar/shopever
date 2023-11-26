import express from 'express';
import { UserController } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
const router = express.Router();


router
  .route(`/create-customer`)
  .post(validateRequest(UserValidation.createCustomerZodSchema),
    UserController.createCustomer);

router
  .route(`/create-admin`)
  .post(
    validateRequest(UserValidation.createAdminZodSchema),
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
    UserController.createAdmin
  );

export const UserRouter = router;
