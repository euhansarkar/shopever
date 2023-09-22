import express from 'express';
import { ListingStatusController } from './listingStatus.controller';
import validateRequest from '../../middlewares/validateRequest';
import { ListingStatusValidator } from './listingStatus.validator';
const router = express.Router();

router
  .route(`/`)
  .post(
    validateRequest(ListingStatusValidator.create),
    ListingStatusController.createListingStatus
  )
  .get(ListingStatusController.getAllListingStatuses);

  

router
  .route(`/:id`)
  .get(ListingStatusController.getOne)
  .patch(
    validateRequest(ListingStatusValidator.update),
    ListingStatusController.updateOne
  )
  .delete(ListingStatusController.deleteOne);

export const ListingStatusRouter = router;
