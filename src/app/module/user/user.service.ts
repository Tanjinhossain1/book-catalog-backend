import { User } from "@prisma/client";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import prisma from "../../../shared/prisma";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";
import { createToken } from "../../../helpers/createJwtToken";
import { Secret } from "jsonwebtoken";
import { ILoginUserResponseType, ILoginUserType } from "./user.interface";

const selectObject = {
    id: true,
    name: true,
    email: true,
    role: true,
    contactNo: true,
    address: true,
    profileImg: true
}

const insertIntoDB = async (data: User): Promise<Partial<User>> => {
    const result = await prisma.user.create({
        data,
        select: selectObject,
    })
    return result
}

const getAllFromDB = async (
    options: IPaginationOptions
): Promise<Partial<User>[]> => {
    const { limit, page, skip } = paginationHelpers.calculatePagination(options);

    const result = await prisma.user.findMany({
        // where: whereConditions,
        skip,
        take: limit,
        orderBy:
            options.sortBy && options.sortOrder
                ? { [options.sortBy]: options.sortOrder }
                : {
                    role: 'desc'
                }
        ,
        select: selectObject,
    });

    return result
};

const getSingleUserFromDB = async (id: string): Promise<Partial<User> | null> => {
    const result = await prisma.user.findUnique({
        where: {
            id
        }, 
        select: selectObject
    });
    return result;
};

const updateOneUser = async (id: string,payload: Partial<User>): Promise<Partial<User> | null> => {
    const result = await prisma.user.update({
        where: {
            id
        },
        data: payload,
        select: selectObject
    });
    return result;
};

const deleteOneUser = async (id: string): Promise<Partial<User> | null> => {
    const result = await prisma.user.delete({
        where: {
            id
        },
    });
    return result;
};


export const loginUser = async (
    user: ILoginUserType
  ): Promise<ILoginUserResponseType> => {
    const { email, password } = user;
  
    const isUserExist = await prisma.user.findUnique({where:{
        email: email,
        password: password
    }});
  
    if (!isUserExist) {
      throw new ApiError(httpStatus.NOT_FOUND, 'User dose not exist !');
    }
  
     
    const { id: userId, role } = isUserExist;
  
    const accessToken = createToken(
      { userId, role },
      process.env.JWT_ACCESS_SECRET as Secret,
      process.env.JWT_EXPIRES_IN as string
    );
  
    const refreshToken = createToken(
      { userId, role },
      process.env.JWT_REFRESH_SECRET as Secret,
      process.env.JWT_REFRESH_EXPIRES as string
    );
  
    return {
      accessToken,
      refreshToken,
    };
  };
export const UserService = {
    insertIntoDB,
    getAllFromDB,
    getSingleUserFromDB,
    updateOneUser,
    deleteOneUser,
    loginUser
}