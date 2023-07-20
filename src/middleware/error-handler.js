const logger = require("../middleware/logger");

const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  const status = err.code || 500;
  const message = err.message || "An unknown error occurred!";

  logger.error(`Error: ${message}`);

  res.status(status).json({ message });
};

module.exports = errorHandler;
