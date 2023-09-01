/* eslint-disable @typescript-eslint/no-var-requires */
const app = require('./app'); 
const config = require('./config/index'); 
const { errorlogger, logger } = require('./shared/logger');

const port = process.env.PORT || 3000;

async function bootstrap() {
  const server = app.listen(port, () => {
    logger.info(`Server running on port ${config.port}`);
  });

  const exitHandler = () => {
    if (server) {
      server.close(() => {
        logger.info('Server closed');
      });
    }
    process.exit(1);
  };

  const unexpectedErrorHandler = (error: Error) => {
    errorlogger.error(error);
    exitHandler();
  };

  process.on('uncaughtException', unexpectedErrorHandler);
  process.on('unhandledRejection', unexpectedErrorHandler);

  process.on('SIGTERM', () => {
    logger.info('SIGTERM received');
    if (server) {
      server.close();
    }
  });
}

bootstrap();
