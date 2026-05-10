export const errorHandler = (err, req, res, next) => {
  // Known (custom) errors
  if (err.isOperational) {
    //handling Db errors
    if (err.statusCode === 1122) {
      console.log("Data base Error: ", err.message);
      return res.status(500).json({
        status: "FAILURE",
        message: "Under maintainance.",
        data: null,
      });
    }
    return res.status(err.statusCode).json({
      status: "FAILURE",
      message: err.message,
      data: null,
    });
  }

  console.error("UNEXPECTED ERROR:", err);

  return res.status(500).json({
    status: "FAILURE",
    message: "Internal Server Error",
    data: null,
  });
};
