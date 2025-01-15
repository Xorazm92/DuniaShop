import winston from 'winston';

const { format, transports } = winston;
const { combine, timestamp, printf, colorize } = format;

// Log formati
const logFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} ${level}: ${message}`;
});

// Logger yaratish
export const logger = winston.createLogger({
    format: combine(
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        colorize(),
        logFormat
    ),
    transports: [
        // Console transport
        new transports.Console({
            level: 'debug'
        }),
        // Error file transport
        new transports.File({
            filename: 'logs/error.log',
            level: 'error'
        }),
        // Combined file transport
        new transports.File({
            filename: 'logs/combined.log'
        })
    ]
});
