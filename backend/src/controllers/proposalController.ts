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
  const newProposal = await new Proposal({
    ...req.body,
    creator: res.locals.user._id,
  }).save();

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
    const proposal: any = await Proposal.findOne({
      _id,
      owner: res.locals.user._id,
    });

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
  // SORTING PAGINATION
  const page = parseInt(req.params.page) || 0;
  const limit = parseInt(req.params.limit) || 10;
  const active = req.query.active || true;
  const sortRequirement: any = {};
  const sortQ: any = req.query.sortBy;

  if (sortQ) {
    const parts: any = sortQ.split(":");
    sortRequirement[parts[0]] = parts[1] === "desc" ? -1 : 1;
  }

  try {
    const proposals = await Proposal.find({
      owner: res.locals.user._id,
      active,
    })
      .skip(page * limit)
      .limit(limit)
      .sort(sortRequirement);

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
    const proposal: any = await Proposal.findOne({
      _id,
      creator: res.locals.user._id,
    });
    if (!proposal) {
      return res.status(StatusCodes.NOT_FOUND).send({ error: "Not Found" });
    }
    updates.forEach((update) => (proposal[update] = req.body[update]));
    await proposal.save();

    res.status(StatusCodes.OK).json(proposal);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
  }
};

export const deleteProposal = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const _id = req.params.id;

    const proposal = await Proposal.findOneAndDelete({
      _id,
      creator: res.locals.user._id,
    });
    if (!proposal) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .send({ error: "No proposal found" });
    }
    res.status(StatusCodes.OK).json(proposal);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).send(error);
  }
};
