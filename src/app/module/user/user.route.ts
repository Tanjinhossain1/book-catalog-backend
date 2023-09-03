import express from 'express';
import { UserController } from './user.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router();


router.get('/user/:id',auth(ENUM_USER_ROLE.ADMIN), UserController.getSingleUserFromDB);
router.patch('/user/:id', auth(ENUM_USER_ROLE.ADMIN), UserController.updateOneUser);
router.delete('/user/:id', auth(ENUM_USER_ROLE.ADMIN), UserController.deleteOneUser);

router.get('/user', auth(ENUM_USER_ROLE.ADMIN), UserController.getAllFromDB);
router.get('/profile',  UserController.getUserProfile);

router.post('/auth/signIn', UserController.loginUser);
router.post(
    '/auth/signup',
    UserController.insertIntoDB
);

export const UserRouter = router;