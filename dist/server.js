"use strict";
// import app from './app'; // Use ES6-style import
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
const app_1 = require("./app");
const index_1 = __importDefault(require("./config/index")); // Use ES6-style import
const port = process.env.PORT || 3000;
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        const server = app_1.app.listen(port, () => {
            console.log(`Server running on port ${index_1.default.port}`);
        });
        const exitHandler = () => {
            if (server) {
                server.close(() => {
                    console.log('Server closed');
                });
            }
            process.exit(1);
        };
        const unexpectedErrorHandler = (error) => {
            console.error(error);
            exitHandler();
        };
        process.on('uncaughtException', unexpectedErrorHandler);
        process.on('unhandledRejection', unexpectedErrorHandler);
        process.on('SIGTERM', () => {
            console.log('SIGTERM received');
            if (server) {
                server.close();
            }
        });
    });
}
bootstrap();
