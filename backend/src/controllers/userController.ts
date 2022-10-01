import express, { NextFunction, Request, Response } from "express";
import User from "../models/UserModel";
import bcrypt from "bcrypt";
import { StatusCodes } from "http-status-codes";

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const _id = req.params.id;
  const user = await User.findById(_id);

  if (!user) {
    return res.status(StatusCodes.NOT_FOUND).send();
  }

  res
    .status(StatusCodes.OK)
    .json({ username: user?.username, email: user?.email, _id: user?._id });
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(StatusCodes.OK).json({ data: "updated" });
};
