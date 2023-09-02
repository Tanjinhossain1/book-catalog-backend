"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const router = express_1.default.Router();
router.get('/user/:id', user_controller_1.UserController.getSingleUserFromDB);
router.patch('/user/:id', user_controller_1.UserController.updateOneUser);
router.delete('/user/:id', user_controller_1.UserController.deleteOneUser);
router.get('/user', user_controller_1.UserController.getAllFromDB);
router.post('/auth/signup', user_controller_1.UserController.insertIntoDB);
exports.UserRouter = router;
