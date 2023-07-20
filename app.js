require('dotenv').config();
const express = require("express");
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const HttpError = require("./src/models/http-error");
const mongoose = require("mongoose");
const errorHandler = require("./src/middleware/error-handler");
const cors = require('cors');
const corsOptions = require('./src/config/cors-options');
const rateLimit = require("express-rate-limit");
const logger = require("./src/middleware/logger");

const app = express();

const userRouter = require("./src/routes/user-routes");
const storeRouter = require("./src/routes/store-routes");
const carRouter = require("./src/routes/car-routes");

app.use(helmet());
app.use(compression());
app.use(cors(corsOptions));
app.use(express.json());

app.use(morgan((tokens, req, res) => JSON.stringify({
  method: tokens.method(req, res),
  url: tokens.url(req, res),
  status: tokens.status(req, res),
  contentLength: tokens.res(req, res, 'content-length'),
  responseTime: tokens['response-time'](req, res)
}), {
  stream: {
    write: (message) => {
      logger.info(message.trim());
    }
  }
}));


// Rate limiter
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(apiLimiter);

app.use("/api/user", userRouter);
app.use("/api/store", storeRouter);
app.use("/api/car", carRouter);

app.use(() => {
  const error = new HttpError("Route Not found", 404);
  throw error;
});

app.use(errorHandler);

const dbUrl = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.5msbumk.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

mongoose
  .connect(dbUrl)
  .then(() => {
    app.listen(process.env.PORT, () => {
      logger.info(`Server running at port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    logger.error(err.message);
  });
