const winston = require("winston");
const winstonDailyRotateFile = require("winston-daily-rotate-file");

const logFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.printf(({ timestamp, level, message }) => {
    return `${timestamp} ${level}: ${message}`;
  })
);

const infoLogTransport = new winstonDailyRotateFile({
  filename: "logs/%DATE%-info.log",
  datePattern: "YYYY-MM-DD",
  maxSize: "20m",
  maxFiles: "14d",
  level: "info",
  format: logFormat,
});

const errorLogTransport = new winstonDailyRotateFile({
  filename: "logs/%DATE%-error.log",
  datePattern: "YYYY-MM-DD",
  maxSize: "20m",
  maxFiles: "14d",
  level: "error",
  format: logFormat,
});

const consoleTransport = new winston.transports.Console({
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.simple()
  ),
});

const successLog = winston.createLogger({
  level: "info",
  transports: [infoLogTransport, consoleTransport],
});

const errorLog = winston.createLogger({
  level: "error",
  transports: [errorLogTransport, consoleTransport],
});

module.exports = { successLog, errorLog };
