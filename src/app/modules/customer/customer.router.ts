import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CustomerController } from './customer.controller';
import { CustomerValidator } from './customer.validation';
const router = express.Router();

router.route(`/`).get(CustomerController.getAll);

router
  .route(`/:id`)
  .get(CustomerController.getOne)
  .patch(
    validateRequest(CustomerValidator.updateCustomerZodSchema),
    CustomerController.updateOne
  )
  .delete(CustomerController.deleteOne);

export const CustomerRouter = router;
