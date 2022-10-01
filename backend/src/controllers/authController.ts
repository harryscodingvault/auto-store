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
      .json({
        username: newUser.username,
        email: newUser.email,
        _id: newUser._id,
      });
  } catch (err) {
    return next(err);
  }
};

export const loginUser = async (
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
