import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { BookService } from "./book.service";
import { bookSearchableFields } from "./book.constant";

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
    const result = await BookService.insertIntoDB(req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Create Book Successfully',
        data: result
    });
})

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
    const options = pick(req.query,['limit', 'page', 'sortBy', 'sortOrder']);
    const result = await BookService.getAllFromDB(req.query, options);
    
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Book fetched successfully',
        data: result
    });
})
const getSingleBookFromDB = catchAsync(async (req: Request, res: Response) => { 
    const result = await BookService.getSingleBookFromDB(req.params.id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'One Book get successfully',
        data: result
    });
})
const getSingleBookFromDBCategoryId = catchAsync(async (req: Request, res: Response) => { 
    const result = await BookService.getSingleBookFromDBCategoryId(req.params.categoryId);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'One Book get successfully',
        data: result
    });
})

const updateOneBook = catchAsync(async (req: Request, res: Response) => { 
    const result = await BookService.updateOneBook(req.params.id,req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Update Book successfully',
        data: result
    });
})

const deleteOneBook = catchAsync(async (req: Request, res: Response) => { 
    const result = await BookService.deleteOneBook(req.params.id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'delete Book successfully',
        data: result
    });
})

export const BookController = {
    insertIntoDB,
    getAllFromDB,
    getSingleBookFromDB,
    updateOneBook,
    deleteOneBook,
    getSingleBookFromDBCategoryId
};