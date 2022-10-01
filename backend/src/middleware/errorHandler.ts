import express, {
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
} from "express";
import { StatusCodes } from "http-status-codes";

const errorHandlerMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const defaultError = {
    //@ts-ignored
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || "Something went wrong, try again later",
  };
  res.status(defaultError.statusCode).json({ message: defaultError.message });
};

export default errorHandlerMiddleware;
