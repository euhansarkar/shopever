import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CMSValidator } from './CMS.validator';
import { CMSController } from './CMS.controller';
const router = express.Router();

router.route(`/`)
    .post(validateRequest(CMSValidator.create), CMSController.createOne)
    .get(CMSController.getAll)

router.route(`/:id`)
    .get(CMSController.getOne)
    .patch(validateRequest(CMSValidator.update), CMSController.updateOne)
    .delete(CMSController.deleteOne)

export const CMSRouter = router 