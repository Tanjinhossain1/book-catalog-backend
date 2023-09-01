import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { UserService } from "./user.service";

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
    const result = await UserService.insertIntoDB(req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Create User Successfully',
        data: result
    });
})

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
    // const filters = pick(req.query,[
    //     'searchTerm'
    // ]);
    const options = pick(req.query,['limit', 'page', 'sortBy', 'sortOrder']);
    const result = await UserService.getAllFromDB(options);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User fetched successfully',
        meta: result.meta,
        data: result.data
    });
})
export const UserController = {
    insertIntoDB,
    getAllFromDB,
};