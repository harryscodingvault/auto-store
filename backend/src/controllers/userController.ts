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
  const updates = Object.keys(req.body);
  const allowedUpdates = ["email", "username", "password"];

  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    res.status(StatusCodes.BAD_REQUEST).send({ error: "Invalid updates!" });
  }
  try {
    const _id = req.params.id;

    const user = await User.findByIdAndUpdate(_id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).send();
    }
    res.status(StatusCodes.OK).json(user);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).send(error);
  }
};
