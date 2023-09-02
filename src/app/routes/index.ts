import express from 'express';
import { UserRouter } from '../module/user/user.route';
import { CategoryRouter } from '../module/category/category.route';
import { BookRouter } from '../module/book/book.route';
import { OrderRouter } from '../module/order/order.route';

const router = express.Router();

const moduleRoutes = [
  // ... routes
  {
    path: "/",
    routes: UserRouter
  },
  {
    path: "/categories",
    routes: CategoryRouter
  },
  {
    path: "/books",
    routes: BookRouter
  },
  {
    path: "/orders",
    routes: OrderRouter
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.routes));
export default router;
