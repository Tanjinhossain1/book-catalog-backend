"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRouter = void 0;
const express_1 = __importDefault(require("express"));
const category_controller_1 = require("./category.controller");
const router = express_1.default.Router();
router.get('/:id', category_controller_1.CategoryController.getSingleCategoryFromDB);
router.patch('/:id', category_controller_1.CategoryController.updateOneCategory);
router.delete('/:id', category_controller_1.CategoryController.deleteOneCategory);
router.get('/', category_controller_1.CategoryController.getAllFromDB);
router.post('/create-category', category_controller_1.CategoryController.insertIntoDB);
exports.CategoryRouter = router;
