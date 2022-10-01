import express, { NextFunction, Request, Response } from "express";
import User from "../models/UserModel";

import { StatusCodes } from "http-status-codes";

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = res.locals.user;

  res.status(StatusCodes.OK).json(user);
};

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const users = await User.find({});

  res.status(StatusCodes.OK).json(users);
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
    const user: any = await User.findById(req.params.id);

    updates.forEach((update) => (user[update] = req.body[update]));
    await user?.save();

    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).send();
    }
    res.status(StatusCodes.OK).json(user);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).send(error);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const _id = req.params.id;

    const user = await User.findByIdAndDelete(_id);
    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).send({ error: "No user found" });
    }
    res.status(StatusCodes.OK).json(user);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).send(error);
  }
};
