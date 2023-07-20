const path = require("path");
const winston = require("winston");
const logdna = require("@logdna/logger");

const options = {
  app: "MyAppName",
  level: "info",
  env: process.env.NODE_ENV,
};

const mezmoLogger = logdna.createLogger(
  "10dbc2d1b5e99503fc65464a9dbb1436",
  options
);

const logger = winston.createLogger({
  format: winston.format.json(),
  transports: [
    new winston.transports.File({
      filename: path.join(__dirname, "../logs/error.log"),
      level: "error",
    }),
    new winston.transports.File({
      filename: path.join(__dirname, "../logs/combined.log"),
    }),
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  ],
});

// Override log methods to also log with Mezmo logger
["error", "warn", "info", "verbose", "debug", "silly"].forEach((level) => {
  const original = logger[level];
  logger[level] = (message, ...args) => {
    mezmoLogger.log(message, { level });
    original.call(logger, message, ...args);
  };
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}

module.exports = logger;
