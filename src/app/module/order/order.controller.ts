import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { OrderService } from "./order.service";
import httpStatus from "http-status";
import sendResponse from "../../../shared/sendResponse";
import { verifyToken } from "../../../helpers/createJwtToken";
import { Secret } from "jsonwebtoken";
import { OrderRouter } from "./order.route";

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
    const { userId } = verifyToken(req.headers.authorization as string, process.env.JWT_ACCESS_SECRET as Secret);
    const { orderedBooks } = req.body
    const data = {
        userId,
        orderedBooks,
    }
    const result = await OrderService.insertIntoDB(data);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'order create successfully',
        data: result
    });
})

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
    const verifyTokenValue = verifyToken(req.headers.authorization as string, process.env.JWT_ACCESS_SECRET as Secret);

    const result = await OrderService.getAllFromDB(verifyTokenValue);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Order fetched successfully',
        data: result
    });
})
const getOneFromDB = catchAsync(async (req: Request, res: Response) => {
    const verifyTokenValue = verifyToken(req.headers.authorization as string, process.env.JWT_ACCESS_SECRET as Secret);

    const result = await OrderService.getOneFromDB(req.params.id, verifyTokenValue);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Order fetched successfully',
        data: result
    });
})
export const OrderController = {
    insertIntoDB,
    getAllFromDB,
    getOneFromDB
}