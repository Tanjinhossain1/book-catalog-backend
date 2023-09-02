"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_route_1 = require("../module/user/user.route");
const category_route_1 = require("../module/category/category.route");
const book_route_1 = require("../module/book/book.route");
const order_route_1 = require("../module/order/order.route");
const router = express_1.default.Router();
const moduleRoutes = [
    // ... routes
    {
        path: "/",
        routes: user_route_1.UserRouter
    },
    {
        path: "/categories",
        routes: category_route_1.CategoryRouter
    },
    {
        path: "/books",
        routes: book_route_1.BookRouter
    },
    {
        path: "/orders",
        routes: order_route_1.OrderRouter
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.routes));
exports.default = router;
