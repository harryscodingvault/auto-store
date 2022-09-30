import express, { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

const notFoundMiddleware = (req: Request, res: Response) => {
  res.status(StatusCodes.NOT_FOUND).send("Route not found");
};

export default notFoundMiddleware;
