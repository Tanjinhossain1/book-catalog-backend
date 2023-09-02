import express from 'express';
import { BookController } from './book.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router();

router.get('/:id', BookController.getSingleBookFromDB);
router.get('/:categoryId/category', BookController.getSingleBookFromDBCategoryId);
router.patch('/:id',auth(ENUM_USER_ROLE.ADMIN), BookController.updateOneBook);
router.delete('/:id',auth(ENUM_USER_ROLE.ADMIN), BookController.deleteOneBook);
router.get('/', BookController.getAllFromDB);
router.post(
    '/create-book',
    BookController.insertIntoDB
)

export const  BookRouter = router;