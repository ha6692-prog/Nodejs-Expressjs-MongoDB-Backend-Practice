import express from "express";

import { errorMiddleware } from "./middlewares/error.middleware.js";
import { ApiError } from "./utils/ApiError.js";
import { ApiResponse } from "./utils/ApiResponse.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  const response = new ApiResponse(
    200,
    {
      message: "VideoTube Backend is running!",
    },
    "Backend is healthy",
  );

  res.status(response.statusCode).json(response);
});

app.get("/test-error", (req, res, next) => {
  next(new ApiError(404, "This is a test error"));
});

app.use(errorMiddleware);

export { app };
