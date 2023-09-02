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
exports.UserService = exports.loginUser = void 0;
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const createJwtToken_1 = require("../../../helpers/createJwtToken");
const selectObject = {
    id: true,
    name: true,
    email: true,
    role: true,
    contactNo: true,
    address: true,
    profileImg: true
};
const insertIntoDB = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.user.create({
        data,
        select: selectObject,
    });
    return result;
});
const getAllFromDB = (options) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, page, skip } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const result = yield prisma_1.default.user.findMany({
        // where: whereConditions,
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder
            ? { [options.sortBy]: options.sortOrder }
            : {
                role: 'desc'
            },
        select: selectObject,
    });
    return result;
});
const getSingleUserFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.user.findUnique({
        where: {
            id
        },
        select: selectObject
    });
    return result;
});
const updateOneUser = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.user.update({
        where: {
            id
        },
        data: payload,
        select: selectObject
    });
    return result;
});
const deleteOneUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.user.delete({
        where: {
            id
        },
    });
    return result;
});
const loginUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = user;
    const isUserExist = yield prisma_1.default.user.findUnique({ where: {
            email: email,
            password: password
        } });
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User dose not exist !');
    }
    const { id: userId, role } = isUserExist;
    const accessToken = (0, createJwtToken_1.createToken)({ userId, role }, process.env.JWT_ACCESS_SECRET, process.env.JWT_EXPIRES_IN);
    const refreshToken = (0, createJwtToken_1.createToken)({ userId, role }, process.env.JWT_REFRESH_SECRET, process.env.JWT_REFRESH_EXPIRES);
    return {
        accessToken,
        refreshToken,
    };
});
exports.loginUser = loginUser;
exports.UserService = {
    insertIntoDB,
    getAllFromDB,
    getSingleUserFromDB,
    updateOneUser,
    deleteOneUser,
    loginUser: exports.loginUser
};
