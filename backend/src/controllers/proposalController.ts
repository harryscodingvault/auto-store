import express, { NextFunction, Request, Response } from "express";
import User from "../models/UserModel";
import bcrypt from "bcrypt";
import { StatusCodes } from "http-status-codes";
import Proposal from "../models/ProposalModel";

export const createProposal = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const newProposal = await new Proposal(req.body).save();

  try {
    res.status(StatusCodes.OK).json(newProposal);
  } catch (err) {
    res.status(StatusCodes.NOT_ACCEPTABLE).send();
  }
};
