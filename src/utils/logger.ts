import winston from 'winston';
import path from 'path';

// Define log format
const logFormat = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json()
);

// Custom format for console output
const consoleFormat = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf(({ level, message, timestamp }) => {
        // Color only error messages in red
        const color = level === 'error' ? '\x1b[31m' : '';
        const reset = color ? '\x1b[0m' : '';
        return `${timestamp} ${color}${level}:${reset} ${message}`;
    })
);

// Create the logger instance
const logger = winston.createLogger({
    level: 'info',
    format: logFormat,
    transports: [
        // Write all error logs to error.log
        new winston.transports.File({
            filename: path.join('logs', 'error.log'),
            level: 'error',
            maxsize: 10485760, // 10MB
            maxFiles: 5,
        }),
        // Write all logs with level 'info' to info.log
        new winston.transports.File({
            filename: path.join('logs', 'info.log'),
            level: 'info',
            maxsize: 10485760, // 10MB
            maxFiles: 5,
        }),
        // Write all logs to combined.log
        new winston.transports.File({
            filename: path.join('logs', 'combined.log'),
            maxsize: 10485760, // 10MB
            maxFiles: 5,
        })
    ],
});

// If we're not in production, log to the console as well
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: consoleFormat
    }));
}

export default logger;
