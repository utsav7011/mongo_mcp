import winston from "winston";
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    //
    // - Write all logs with importance level of `error` or higher to `error.log`
    //   (i.e., error, fatal, but not other levels)
    //
    new winston.transports.File({ filename: './logs/info.log', level: 'info' }),
    new winston.transports.File({ filename: './logs/error.log', level: 'error' }),
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
    new winston.transports.File({ filename: './logs/combined.log' }),
  ],
});

export default logger;