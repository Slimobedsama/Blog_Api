const { createLogger, format, transports } = require("winston");
const winstonTimestampColorize = require("winston-timestamp-colorize");
const { combine, timestamp, json, colorize } = format;
const timestampColorize = winstonTimestampColorize;

// Custom format for console logging with colors
const consoleLogFormat = format.combine(
  format.errors({ stack: true }),
  format.colorize({ all: true }),
  timestampColorize({ color: 'yellow' }),
  format.printf(({ level, message, timestamp, stack }) => {
    return `${timestamp}: ${level}: ${stack || message}`;
  })
);

// Create a Winston logger
const logger = createLogger({
  level: "info",
  format: combine(
    format.errors({ stack: true }),
    timestamp({format: 'YY-MM-DD HH:mm:ss'}), json()),
  transports: [
    new transports.Console({
      format: consoleLogFormat,
    }),
    // new transports.File({ filename: "app.log" }),
  ],
});

module.exports = logger;