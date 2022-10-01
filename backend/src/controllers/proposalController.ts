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

export const getProposal = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const _id = req.params.id;
    const proposal = await Proposal.findById(_id);

    if (!proposal) {
      return res.status(StatusCodes.NOT_FOUND).send();
    }
    res.status(StatusCodes.OK).json(proposal);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
  }
};

export const getAllProposals = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const proposals = await Proposal.find();

    res.status(StatusCodes.OK).json(proposals);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
  }
};

export const updateProposal = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["options", "capacity", "title", "deadline"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    res.status(StatusCodes.BAD_REQUEST).send({ error: "Invalid updates!" });
  }

  try {
    const _id = req.params.id;

    const proposal = await Proposal.findByIdAndUpdate(_id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!proposal) {
      return res.status(StatusCodes.NOT_FOUND).send({ error: "Not Found" });
    }
    res.status(StatusCodes.OK).json(proposal);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
  }
};
