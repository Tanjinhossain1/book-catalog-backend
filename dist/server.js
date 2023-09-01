"use strict";
/* eslint-disable @typescript-eslint/no-var-requires */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const app = require('./app').default;
const config = require('./config').default;
const logger_1 = require("./shared/logger");
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        const server = app.listen(config.port, () => {
            logger_1.logger.info(`Server running on port ${config.port}`);
        });
        const exitHandler = () => {
            if (server) {
                server.close(() => {
                    logger_1.logger.info('Server closed');
                });
            }
            process.exit(1);
        };
        const unexpectedErrorHandler = (error) => {
            logger_1.errorlogger.error(error);
            exitHandler();
        };
        process.on('uncaughtException', unexpectedErrorHandler);
        process.on('unhandledRejection', unexpectedErrorHandler);
        process.on('SIGTERM', () => {
            logger_1.logger.info('SIGTERM received');
            if (server) {
                server.close();
            }
        });
    });
}
bootstrap();
