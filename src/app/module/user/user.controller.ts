import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { UserService } from "./user.service";
import { ILoginUserResponseType } from "./user.interface";
import { verifyToken } from "../../../helpers/createJwtToken";
import { Secret } from "jsonwebtoken";

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
     
    const options = pick(req.query,['limit', 'page', 'sortBy', 'sortOrder']);
    const result = await UserService.getAllFromDB(options);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User fetched successfully',
        data: result
    });
})
const getSingleUserFromDB = catchAsync(async (req: Request, res: Response) => { 
    const result = await UserService.getSingleUserFromDB(req.params.id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'One User get successfully',
        data: result
    });
})

const updateOneUser = catchAsync(async (req: Request, res: Response) => { 
    const result = await UserService.updateOneUser(req.params.id,req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Update User successfully',
        data: result
    });
})

const deleteOneUser = catchAsync(async (req: Request, res: Response) => { 
    const result = await UserService.deleteOneUser(req.params.id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'delete User successfully',
        data: result
    });
})

export const loginUser = catchAsync(
    async (req: Request, res: Response) => {
      const { ...loginData } = req.body;
      const result = await UserService.loginUser(loginData);
  
      const { refreshToken, ...others } = result;
  
      const cookieOptions = {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
      };
  
      res.cookie('refreshToken', refreshToken, cookieOptions);
  
      sendResponse<ILoginUserResponseType>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User Login Successfully !',
        data: others,
      });
    }
  );
  
const getUserProfile = catchAsync(async (req: Request, res: Response) => {
    const verifyTokenValue = verifyToken(req.headers.authorization as string, process.env.JWT_ACCESS_SECRET as Secret);

    const result = await UserService.getUserProfile(verifyTokenValue.userId);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Profile Retrieved successfully',
        data: result
    });
})
export const UserController = {
    insertIntoDB,
    getAllFromDB,
    getSingleUserFromDB,
    updateOneUser,
    deleteOneUser,
    loginUser,
    getUserProfile
};