import winston from 'winston';
import environment from './environment';

/**
 * This file is used to configure the logger.
 */
const logger = winston.createLogger({
    level: environment.LOG_LEVEL,
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.colorize({ all: true }),
                winston.format.printf(({ timestamp, level, message }) => {
                    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                    return `[${timestamp}] ${level}: ${message}`;
                }),
            ),
        }),
        new winston.transports.File({
            filename: 'logs/error.log',
            level: 'error',
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.colorize({ all: true }),
                winston.format.printf(({ timestamp, level, message }) => {
                    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                    return `[${timestamp}] ${level}: ${message}`;
                }),
            ),
        }),
        new winston.transports.File({
            filename: 'logs/combined.log',
            level: 'info',
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.colorize({ all: true }),
                winston.format.printf(({ timestamp, level, message }) => {
                    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                    return `[${timestamp}] ${level}: ${message}`;
                }),
            ),
        }),
    ],
});

export default logger;
