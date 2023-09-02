import express from 'express';
import { BookController } from './book.controller';

const router = express.Router();

router.get('/:id', BookController.getSingleBookFromDB);
router.patch('/:id', BookController.updateOneBook);
router.delete('/:id', BookController.deleteOneBook);
router.get('/', BookController.getAllFromDB);
router.post(
    '/create-book',
    BookController.insertIntoDB
)
 
export const  BookRouter = router;