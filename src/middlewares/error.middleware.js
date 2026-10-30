import { ApiError } from "../utils/ApiError.js";

const errorMiddleware = (err, req, res, next) => {
  let error = err;

  if (!(error instanceof ApiError)) {
    error = new ApiError(
      error.statusCode || 500,
      error.message || "Internal Server Error"
    );
  }

  const response = {
    success: false,
    message: error.message,
    errors: error.errors,
  };

  if (process.env.NODE_ENV !== "production") {
    response.stack = error.stack;
  }

  return res.status(error.statusCode).json(response);
};

export { errorMiddleware };
