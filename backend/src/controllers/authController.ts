import express, { NextFunction, Request, Response } from "express";
import User from "../models/UserModel";
import bcrypt from "bcrypt";
import { StatusCodes } from "http-status-codes";
import { comparePassword, createNewPassword } from "../utils/passwordHandler";
import { createJWT } from "../utils/jwtHandler";

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, username, password } = req.body;
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res
        .status(StatusCodes.METHOD_NOT_ALLOWED)
        .send({ error: "Email in used!" });
    }

    const hashedPassword = await createNewPassword(password);

    const newUser = await new User({
      username,
      email,
      password: hashedPassword,
    }).save();

    const token = await createJWT(newUser._id);

    res.status(StatusCodes.OK).json({
      username: newUser.username,
      email: newUser.email,
      _id: newUser._id,
      token,
    });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).send(error);
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const userExist = await User.findOne({ email });
    if (!userExist) {
      return res
        .status(StatusCodes.METHOD_NOT_ALLOWED)
        .send({ error: "User does not exist!" });
    }

    const passwordCredentials = await comparePassword(
      password,
      userExist.password
    );
    if (!passwordCredentials) {
      return res
        .status(StatusCodes.METHOD_NOT_ALLOWED)
        .send({ error: "Passwords does not match!" });
    }

    const token = await createJWT(userExist._id);

    res.status(StatusCodes.OK).json({
      username: userExist.username,
      email: userExist.email,
      _id: userExist._id,
      token,
    });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).send(error);
  }
};
