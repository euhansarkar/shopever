import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AttributeGroupValidator } from './attributeGroup.validator';
import { attributeGroupController } from './attributeGroup.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
const router = express.Router();

router.route(`/`)
    .post(
        validateRequest(AttributeGroupValidator.create),
        auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
        attributeGroupController.createOne
    )
    .get(
        auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
        attributeGroupController.getAll);


router.route(`/:id`)
    .get(auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN), attributeGroupController.getOne)
    .patch(auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN), validateRequest(AttributeGroupValidator.update), attributeGroupController.updateOne)
    .delete(auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN), attributeGroupController.deleteOne)

export const AttributeGroupRouter = router 