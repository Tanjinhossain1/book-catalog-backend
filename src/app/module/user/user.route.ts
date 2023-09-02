import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();


router.get('/user/:id', UserController.getSingleUserFromDB);
router.patch('/user/:id', UserController.updateOneUser);
router.delete('/user/:id', UserController.deleteOneUser);
router.get('/user', UserController.getAllFromDB);
router.post(
    '/auth/signup',
    UserController.insertIntoDB
)
 
export const  UserRouter = router;