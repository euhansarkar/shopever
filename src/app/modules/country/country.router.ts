import express from 'express';
import { countryController } from './country.controller';
import validateRequest from '../../middlewares/validateRequest';
import { CountryValidator } from './country.validator';
const router = express.Router();

router
  .route(`/`)
  .post(
    validateRequest(CountryValidator.create),
    countryController.createcountry
  )
  .get(countryController.getAllcountryes);

router
  .route(`/:id`)
  .get(countryController.getOne)
  .patch(
    validateRequest(CountryValidator.update),
    countryController.updateOne
  )
  .delete(countryController.deleteOne);

export const countryRouter = router;
