import express, {
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
} from "express";
import { StatusCodes } from "http-status-codes";

const errorHandlerMiddleware = (
  err: TypeError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return res.status(StatusCodes.BAD_REQUEST).send(err.message);
};

export default errorHandlerMiddleware;
