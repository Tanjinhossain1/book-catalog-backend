import { Category } from "@prisma/client";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IPaginationOptions } from "../../../interfaces/pagination";
import prisma from "../../../shared/prisma";

const insertIntoDB = async (data: Category): Promise<Partial<Category>> => {
    const result = await prisma.category.create({
        data,
    })
    return result
}

const getAllFromDB = async (
    options: IPaginationOptions
): Promise<Partial<Category>[]> => {
    const { limit, page, skip } = paginationHelpers.calculatePagination(options);

    const result = await prisma.category.findMany({
        skip,
        take: limit,
        orderBy:
            options.sortBy && options.sortOrder
                ? { [options.sortBy]: options.sortOrder }
                : {
                    title: 'desc'
                },
    });

    return result
};

const getSingleCategoryFromDB = async (id: string): Promise<Partial<Category> | null> => {
    const result = await prisma.category.findUnique({
        where: {
            id
        },
        include: { 
            books: true
        }
    });
    return result;
};

const updateOneCategory = async (id: string, payload: Partial<Category>): Promise<Partial<Category> | null> => {
    const result = await prisma.category.update({
        where: {
            id
        },
        data: payload,

    });
    return result;
};

const deleteOneCategory = async (id: string): Promise<Partial<Category> | null> => {
    const result = await prisma.category.delete({
        where: {
            id
        },
    });
    return result;
};

export const CategoryService = {
    insertIntoDB,
    getAllFromDB,
    getSingleCategoryFromDB,
    updateOneCategory,
    deleteOneCategory,
}