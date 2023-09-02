import express from 'express';
import { CategoryController } from './category.controller';

const router = express.Router();

router.get('/:id', CategoryController.getSingleCategoryFromDB);
router.patch('/:id', CategoryController.updateOneCategory);
router.delete('/:id', CategoryController.deleteOneCategory);
router.get('/', CategoryController.getAllFromDB);
router.post(
    '/create-category',
    CategoryController.insertIntoDB
)
 
export const  CategoryRouter = router;