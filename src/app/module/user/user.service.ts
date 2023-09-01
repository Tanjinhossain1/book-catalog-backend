import { User } from "@prisma/client";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import prisma from "../../../shared/prisma";



const insertIntoDB =async (data: User):Promise<User> => {
    const result = await prisma.user.create({
        data
    })
    return result
}

const getAllFromDB = async (
    options: IPaginationOptions
): Promise<IGenericResponse<User[]>> => {
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
    });
    const total = await prisma.user.count({ });

    return {
        meta: {
            total,
            page,
            limit
        },
        data: result
    };
};

export const UserService = {
    insertIntoDB,
    getAllFromDB,
}