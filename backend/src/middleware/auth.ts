import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";

import User from "../models/UserModel";

export const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "Authentication Invalid" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded: any = jwt.verify(token, `${process.env.JWT_SECRET}`);
    const user: any = await User.findOne({
      _id: decoded.userId,
      "tokens.token": token,
    });

    if (!user) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "Authentication Invalid" });
    }

    res.locals.token = token;
    res.locals.user = user;

    next();
  } catch (error) {
    res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "Authentication Invalid" });
  }
};
