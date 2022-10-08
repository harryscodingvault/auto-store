import express, { NextFunction, Request, Response } from "express";
import User from "../models/UserModel";

import { StatusCodes } from "http-status-codes";
import Proposal from "../models/ProposalModel";
import { createNewPassword } from "../utils/passwordHandler";
import { createJWT } from "../utils/jwtHandler";

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = res.locals.user;

  res.status(StatusCodes.OK).json(user);
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
    const user = res.locals.user;

    updates.forEach((update) => (user[update] = req.body[update]));
    const hashedPassword = await createNewPassword(req.body.password);
    user.password = hashedPassword;
    const token = await createJWT(user._id);
    user.tokens = [{ token }];
    console.log(user);
    await user.save();

    res.status(StatusCodes.OK).json({
      username: user.username,
      email: user.email,
      _id: user._id,
      token,
    });
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
    const user = await res.locals.user.remove();
    await Proposal.deleteMany({ creator: user._id });
    res.status(StatusCodes.OK).json(user);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).send(error);
  }
};
