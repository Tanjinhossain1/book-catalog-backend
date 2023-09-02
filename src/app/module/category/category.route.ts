import express from 'express';
import { CategoryController } from './category.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router();

router.get('/:id', CategoryController.getSingleCategoryFromDB);
router.patch('/:id',auth(ENUM_USER_ROLE.ADMIN), CategoryController.updateOneCategory);
router.delete('/:id',auth(ENUM_USER_ROLE.ADMIN), CategoryController.deleteOneCategory);
router.get('/', CategoryController.getAllFromDB);
router.post(
    '/create-category',
    CategoryController.insertIntoDB
)
 
export const  CategoryRouter = router;