const express = require("express");
const bodyParser = require("body-parser");
const HttpError = require("./src/models/http-error");
const errorHandler = require("./src/middleware/error-handler");
const dbConnect = require("./src/database/dbConnect");

const app = express();

const userRouter = require("./src/routes/user-routes");
const storeRouter = require("./src/routes/store-routes");


app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
});

app.use("", userRouter);
app.use("", storeRouter)


// Error handler for bad routes
app.use(() => {
  const error = new HttpError("Route Not found", 404);
  throw error;
});

app.use(errorHandler);

dbConnect.connect()
  .then(() => {
    app.listen(5000, () => {
      console.log("Server running at port 5000");
    });
  })
  .catch((err) => {
    console.log(err);
  });