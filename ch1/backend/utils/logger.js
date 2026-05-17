const winston = require("winston");
const fs = require("fs");
const path = require("path");

const env = process.env.NODE_ENV || "development";

// logs/dev or logs/prod
const logDir = path.join(__dirname, `../logs/${env}`);

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json(),
  ),
  transports: [
    new winston.transports.File({
      filename: path.join(logDir, `${env}-error.log`),
      level: "error",
    }),
    new winston.transports.File({
      filename: path.join(logDir, `${env}-combined.log`),
    }),
  ],
});

// console only in development
if (env !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple(),
      ),
    }),
  );
}

module.exports = logger;
