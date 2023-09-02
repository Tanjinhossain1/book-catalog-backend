import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { CategoryService } from "./category.service";

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
    const result = await CategoryService.insertIntoDB(req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Create Category Successfully',
        data: result
    });
})

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
     
    const options = pick(req.query,['limit', 'page', 'sortBy', 'sortOrder']);
    const result = await CategoryService.getAllFromDB(options);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Category fetched successfully',
        data: result
    });
})
const getSingleCategoryFromDB = catchAsync(async (req: Request, res: Response) => { 
    const result = await CategoryService.getSingleCategoryFromDB(req.params.id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'One Category get successfully',
        data: result
    });
})

const updateOneCategory = catchAsync(async (req: Request, res: Response) => { 
    const result = await CategoryService.updateOneCategory(req.params.id,req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Update Category successfully',
        data: result
    });
})

const deleteOneCategory = catchAsync(async (req: Request, res: Response) => { 
    const result = await CategoryService.deleteOneCategory(req.params.id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'delete Category successfully',
        data: result
    });
})

export const CategoryController = {
    insertIntoDB,
    getAllFromDB,
    getSingleCategoryFromDB,
    updateOneCategory,
    deleteOneCategory
};