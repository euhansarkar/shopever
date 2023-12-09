import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { StoreValidator } from './store.validator';
import { StoreController } from './store.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
const router = express.Router();

router.route(`/`)
    .post(
        validateRequest(StoreValidator.create),
        auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
        StoreController.createOne
    )
    .get(
        auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
        StoreController.getAll);


router.route(`/:id`)
    .get(auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN), StoreController.getOne)
    .patch(auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN), validateRequest(StoreValidator.update), StoreController.updateOne)
    .delete(auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN), StoreController.deleteOne)

export const StoreRouter = router 