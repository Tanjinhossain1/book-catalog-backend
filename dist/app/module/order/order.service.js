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
exports.OrderService = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const user_1 = require("../../../enums/user");
const insertIntoDB = (data) => __awaiter(void 0, void 0, void 0, function* () {
    // Create the order and get its ID
    const order = yield prisma_1.default.order.create({
        data,
    });
    return order;
});
const getAllFromDB = (verifyTokenValue) => __awaiter(void 0, void 0, void 0, function* () {
    let result = [];
    if (verifyTokenValue.role === user_1.ENUM_USER_ROLE.ADMIN) {
        result = yield prisma_1.default.order.findMany({});
    }
    else {
        result = yield prisma_1.default.order.findMany({
            where: {
                userId: verifyTokenValue.userId
            }
        });
    }
    return result;
});
exports.OrderService = {
    insertIntoDB,
    getAllFromDB
};
