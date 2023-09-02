"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookService = void 0;
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const book_constant_1 = require("./book.constant");
const insertIntoDB = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.book.create({
        data,
        include: {
            category: true,
        }
    });
    return result;
});
const getAllFromDB = (filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, page, skip } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const { sortBy, sortOrder, minPrice, maxPrice, category, search } = filters;
    const orderBy = [];
    if (sortBy && sortOrder) {
        // Check if the sortBy field is 'publicationDate'
        if (sortBy === 'publicationDate') {
            orderBy.push({ publicationDate: sortOrder });
        }
        else {
            // If not 'publicationDate', sort by the specified field in the sortOrder
            orderBy.push({ [sortBy]: sortOrder });
        }
    }
    else {
        // Default sorting by 'publicationDate' in descending order if not specified
        orderBy.push({ publicationDate: 'desc' });
    }
    const andConditions = [];
    if (search) {
        andConditions.push({
            OR: book_constant_1.bookSearchableFields.map((field) => ({
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
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    whereConditions.OR = book_constant_1.bookSearchableFields.map((field) => ({
        [field]: {
            contains: search,
            mode: 'insensitive',
        },
    }));
    const result = yield prisma_1.default.book.findMany({
        where: whereConditions,
        skip,
        take: limit,
        orderBy,
    });
    const total = yield prisma_1.default.book.count({
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
});
const getSingleBookFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.book.findUnique({
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
});
const updateOneBook = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.book.update({
        where: {
            id
        },
        data: payload,
    });
    return result;
});
const deleteOneBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.book.delete({
        where: {
            id
        },
    });
    return result;
});
exports.BookService = {
    insertIntoDB,
    getAllFromDB,
    getSingleBookFromDB,
    updateOneBook,
    deleteOneBook,
};
