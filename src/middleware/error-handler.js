
const errorHandler = (err, req, res, next) => {
  
  if (res.headersSent) {
    return next(err);
  }

  const status = err.code || 500;
  const message = err.message || "An unknown error occurred!";
  console.log("Error:", err); // Print the error to the console
  res.status(status).json({ message });
};

module.exports = errorHandler;
