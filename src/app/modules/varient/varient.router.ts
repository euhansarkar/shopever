import express, { NextFunction, Request, Response } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { VarientValidator } from './varient.validator';
import { VarientController } from './varient.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { FileUploadHeler } from '../../../helpers/fileUploadHelper';
const router = express.Router();

router.route(`/`)
    .post(
        auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
        // VarientController.createVarient
        FileUploadHeler.upload.array(`files`),
        (req: Request, res: Response, next: NextFunction) => {
            req.body = VarientValidator.create.parse(JSON.parse
                (req.body.data))
            console.log(`this is from varient`, req.body);
            return VarientController.createOne(req, res, next)
        }
    )
    .get(
        auth(ENUM_USER_ROLE.CUSTOMER, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
        VarientController.getAll)

router.route(`/:id`)
    .get(
        auth(ENUM_USER_ROLE.CUSTOMER, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
        VarientController.getOne)
    .patch(
        auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
        FileUploadHeler.upload.array(`files`),
        (req: Request, res: Response, next: NextFunction) => {
            req.body = VarientValidator.update.parse(JSON.parse
                (req.body.data))
            return VarientController.updateOne(req, res, next)
        }
    )

    .delete(
        auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
        VarientController.deleteOne)

export const VarientRouter = router 