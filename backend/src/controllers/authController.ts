import express, { NextFunction, Request, Response } from "express";
import User from "../models/UserModel";
import bcrypt from "bcrypt";
import { StatusCodes } from "http-status-codes";

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);
    const newUser = await new User({
      ...req.body,
      password: hashedPassword,
    }).save();

    res
      .status(StatusCodes.OK)
      .json({ username: newUser.username, email: newUser.email });
  } catch (err) {
    return next(err);
  }
};

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const _id = req.params.id;
  const thisUser = User.findById(_id);
  res.status(StatusCodes.OK).json({ data: thisUser });
};
