import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { AttributeOptionController } from './attributeOption.controller';
import { AttributeOptionValidator } from './attributeOption.validator';
const router = express.Router();


router.route(`/:id`)
    .put(validateRequest(AttributeOptionValidator.update),
        auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
        AttributeOptionController.updateOne)


export const AttributeOptionRouter = router 