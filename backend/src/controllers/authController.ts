import express, { NextFunction, Request, Response } from "express";
import User from "../models/UserModel";

import { StatusCodes } from "http-status-codes";
import { comparePassword, createNewPassword } from "../utils/passwordHandler";
import { createJWT } from "../utils/jwtHandler";
import { sendWelcomeEmail } from "../email/account";

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
    newUser.tokens = newUser.tokens.concat({ token });
    await newUser.save();
    sendWelcomeEmail(newUser.email, newUser.username);

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

    if (userExist.password) {
      const passwordCredentials = await comparePassword(
        password,
        userExist.password
      );
      if (!passwordCredentials) {
        return res
          .status(StatusCodes.METHOD_NOT_ALLOWED)
          .send({ error: "Passwords does not match!" });
      }
    }

    const token = await createJWT(userExist._id);
    userExist.tokens = userExist.tokens.concat({ token });
    await userExist.save();

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

export const loginUserOauth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { _id }: any = req.user;
    const user: any = await User.findOne({ _id });

    const token = await createJWT(_id);
    user.tokens = user.tokens.concat({ token });
    await user.save();

    res.status(StatusCodes.OK).json({
      username: user.username,
      email: user.email,
      _id,
      token,
    });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).send(error);
  }
};

export const logoutUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("loggin out");
    const user = res.locals.user;
    console.log("res.cookie", res.cookie);
    res.cookie("session", "none", {
      expires: new Date(Date.now() + 5 * 1000),
    });
    console.log("loggin out");
    user.tokens = user.tokens.filter((token: any) => {
      return token.token !== res.locals.token;
    });
    await res.locals.user.save();
    res.status(StatusCodes.OK).json({
      message: `${user.username} logged out`,
    });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).send(error);
  }
};

export const logoutUserAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = res.locals.user;

    user.tokens = [];
    await res.locals.user.save();
    res.status(StatusCodes.OK).json({
      message: `${user.username} logged out`,
    });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).send(error);
  }
};
