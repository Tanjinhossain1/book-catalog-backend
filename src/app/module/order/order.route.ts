import express from 'express';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { OrderController } from './order.controller';

const router = express.Router();

router.get('/', OrderController.getAllFromDB);
router.get('/:id', OrderController.getOneFromDB);

router.post('/create-order',auth(ENUM_USER_ROLE.CUSTOMER), OrderController.insertIntoDB);

export const  OrderRouter = router;