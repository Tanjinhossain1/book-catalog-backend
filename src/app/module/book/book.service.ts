import { Book, Prisma } from "@prisma/client";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IPaginationOptions } from "../../../interfaces/pagination";
import prisma from "../../../shared/prisma";
import { IGenericResponse } from "../../../interfaces/common";
import { bookSearchableFields } from "./book.constant";

const insertIntoDB = async (data: Book): Promise<Partial<Book>> => {
    const result = await prisma.book.create({
        data,
        include: {
            category: true,
        }
    })
    return result
}

const getAllFromDB = async (
    filters: any,
    options: IPaginationOptions
): Promise<IGenericResponse<Book[]>> => {
    const { limit, page, skip } = paginationHelpers.calculatePagination(options);
    const { sortBy, sortOrder, minPrice, maxPrice, category, search } = filters;

    const orderBy: Prisma.BookOrderByWithRelationInput[] = [];

    if (sortBy && sortOrder) {
        // Check if the sortBy field is 'publicationDate'
        if (sortBy === 'publicationDate') {
            orderBy.push({ publicationDate: sortOrder });
        } else {
            // If not 'publicationDate', sort by the specified field in the sortOrder
            orderBy.push({ [sortBy]: sortOrder });
        }
    } else {
        // Default sorting by 'publicationDate' in descending order if not specified
        orderBy.push({ publicationDate: 'desc' });
    }

    const andConditions = [];
    
    if (search) {  
        andConditions.push({
            OR: bookSearchableFields.map((field) => ({
                [field]: {
                    contains: search,
                    mode: 'insensitive',
                },
            })),
        });
    } 

    if (minPrice !== undefined) {
        andConditions.push({
            price: {
                gte: +minPrice,
            },
        });
    }


    if (maxPrice !== undefined) {
        andConditions.push({
            price: {
                lte: +maxPrice,
            },
        });
    }

    if (category !== undefined) {
        andConditions.push({
            categoryId: category,
        });
    }

    const whereConditions: Prisma.BookWhereInput =
        andConditions.length > 0 ? { AND: andConditions } : {};
whereConditions.OR =bookSearchableFields.map((field) => ({
        [field]: {
            contains: search,
            mode: 'insensitive',
        },
    }))

    const result = await prisma.book.findMany({
        where: whereConditions,
        skip,
        take: limit,
        orderBy,
    });

    const total = await prisma.book.count({
        where: whereConditions,
    });

    return {
        meta: {
            total,
            page,
            limit,
        },
        data: result,
    };
}

const getSingleBookFromDB = async (id: string): Promise<Partial<Book> | null> => {
    const result = await prisma.book.findUnique({
        where: {
            id
        },
        include: {
            category: true,
            orderedBook: true,
            reviews: true
        }
    });
    return result;
};

const updateOneBook = async (id: string, payload: Partial<Book>): Promise<Partial<Book> | null> => {
    const result = await prisma.book.update({
        where: {
            id
        },
        data: payload,

    });
    return result;
};

const deleteOneBook = async (id: string): Promise<Partial<Book> | null> => {
    const result = await prisma.book.delete({
        where: {
            id
        },
    });
    return result;
};

export const BookService = {
    insertIntoDB,
    getAllFromDB,
    getSingleBookFromDB,
    updateOneBook,
    deleteOneBook,
}