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
exports.OrderController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const order_service_1 = require("./order.service");
const http_status_1 = __importDefault(require("http-status"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const createJwtToken_1 = require("../../../helpers/createJwtToken");
const insertIntoDB = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = (0, createJwtToken_1.verifyToken)(req.headers.authorization, process.env.JWT_ACCESS_SECRET);
    const { orderedBooks } = req.body;
    const data = {
        userId,
        orderedBooks,
    };
    const result = yield order_service_1.OrderService.insertIntoDB(data);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'order create successfully',
        data: result
    });
}));
const getAllFromDB = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const verifyTokenValue = (0, createJwtToken_1.verifyToken)(req.headers.authorization, process.env.JWT_ACCESS_SECRET);
    const result = yield order_service_1.OrderService.getAllFromDB(verifyTokenValue);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Order fetched successfully',
        data: result
    });
}));
const getOneFromDB = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const verifyTokenValue = (0, createJwtToken_1.verifyToken)(req.headers.authorization, process.env.JWT_ACCESS_SECRET);
    const result = yield order_service_1.OrderService.getOneFromDB(req.params.id, verifyTokenValue);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Order fetched successfully',
        data: result
    });
}));
exports.OrderController = {
    insertIntoDB,
    getAllFromDB,
    getOneFromDB
};
