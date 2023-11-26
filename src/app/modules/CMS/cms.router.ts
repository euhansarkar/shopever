import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CMSValidator } from './CMS.validator';
import { CMSController } from './CMS.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
const router = express.Router();

router.route(`/`)
    .post(
        auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
        validateRequest(CMSValidator.create), CMSController.createOne)
    .get(
        auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
        CMSController.getAll)

router.route(`/:id`)
    .get(
        auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
        CMSController.getOne)
    .patch(
        auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
        validateRequest(CMSValidator.update), CMSController.updateOne)
    .delete(
        auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
        CMSController.deleteOne)

export const CMSRouter = router 