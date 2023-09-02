import { User } from "@prisma/client";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import prisma from "../../../shared/prisma";

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

export const UserService = {
    insertIntoDB,
    getAllFromDB,
    getSingleUserFromDB,
    updateOneUser,
    deleteOneUser,
}