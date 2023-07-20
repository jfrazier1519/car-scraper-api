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

const app = express();

const userRouter = require("./src/routes/user-routes");
const storeRouter = require("./src/routes/store-routes");
const carRouter = require("./src/routes/car-routes");

app.use(helmet());
app.use(compression());
app.use(morgan('combined'));
app.use(cors(corsOptions));
app.use(express.json());

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
      console.log(`Server running at port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
