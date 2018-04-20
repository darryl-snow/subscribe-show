const winston = require('winston');

const options = {
  file: {
    level: 'error',
    filename: `${process.cwd()}/server/logs/app.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};

/**
 * Configure the error logger
 */

const logger = new winston.Logger({
  transports: [
    new winston.transports.File(options.file),
    new winston.transports.Console(options.console),
  ],
  exitOnError: false, // do not exit on handled exceptions
});

logger.info('*** Requested for First log ***');

logger.stream = {
  write: (message) => {
    logger.info(message);
  },
};

module.exports = logger;
