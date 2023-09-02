"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookRouter = void 0;
const express_1 = __importDefault(require("express"));
const book_controller_1 = require("./book.controller");
const router = express_1.default.Router();
router.get('/:id', book_controller_1.BookController.getSingleBookFromDB);
router.patch('/:id', book_controller_1.BookController.updateOneBook);
router.delete('/:id', book_controller_1.BookController.deleteOneBook);
router.get('/', book_controller_1.BookController.getAllFromDB);
router.post('/create-book', book_controller_1.BookController.insertIntoDB);
exports.BookRouter = router;
