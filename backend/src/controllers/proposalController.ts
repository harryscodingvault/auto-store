import express, { NextFunction, Request, Response } from "express";
import User from "../models/UserModel";
import bcrypt from "bcrypt";
import { StatusCodes } from "http-status-codes";
import Proposal from "../models/ProposalModel";
import Voter from "../models/VoterModel";
import Option from "../models/OptionModel";
import { scheduleProposalClosing } from "../utils/scheduleDeadline";

// CREATE PROPOSAL
export const createProposal = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = res.locals.user._id;
  const { title, deadline, capacity, options } = req.body;
  try {
    let newProposal = await new Proposal({
      title,
      deadline,
      capacity,
      creator: userId,
    }).save();

    const addedOptions = await Option.insertMany(
      options.map((item: any) => {
        return {
          proposalId: newProposal._id,
          name: item.name,
        };
      })
    );

    newProposal.options = addedOptions.map((item: any) => item._id);
    newProposal.save();

    await new Voter({
      voterId: userId,
      proposalId: newProposal._id,
    }).save();

    scheduleProposalClosing(newProposal._id, deadline);
    res.status(StatusCodes.OK).json(newProposal);
  } catch (err) {
    res.status(StatusCodes.NOT_ACCEPTABLE).send();
  }
};

// GET PROPOSAL
export const getProposal = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = res.locals.user._id;
  const _id = req.params.id;

  try {
    const proposal: any = await Proposal.findOne(
      {
        _id,
      },
      {
        proposalId: 1,
        title: 1,
        deadline: 1,
        capacity: 1,
        active: 1,
        editOn: 1,
        options: 1,
        chosenProposal: 1,
        totalVotes: 1,
      }
    ).populate("options", "name");

    if (!proposal) {
      return res.status(StatusCodes.NOT_FOUND).send();
    }
    const issuedVote = await Voter.findOne({
      voterId: userId,
      proposalId: _id,
    });

    if (!issuedVote) {
      await new Voter({
        voterId: userId,
        proposalId: _id,
      }).save();
    }

    res.status(StatusCodes.OK).json(proposal);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
  }
};

export const getVotedProposals = async (
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

export const getCreatedProposals = async (
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
  const _id = req.params.id;
  const updates = Object.keys(req.body);
  const allowedUpdates = ["options", "capacity", "title", "deadline"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    res.status(StatusCodes.BAD_REQUEST).send({ error: "Invalid updates!" });
  }

  try {
    const proposal: any = await Proposal.findOne({
      _id,
      creator: res.locals.user._id,
    });
    if (!proposal) {
      return res.status(StatusCodes.NOT_FOUND).send({ error: "Not Found" });
    }
    await Option.deleteMany({ proposalId: _id });
    const newOptions = await Option.insertMany(
      req.body.options.map((item: any) => {
        return {
          proposalId: _id,
          name: item.name,
        };
      })
    );

    updates.forEach((update) => (proposal[update] = req.body[update]));
    proposal.options = newOptions;
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
    await Option.deleteMany({ proposalId: _id });
    res.status(StatusCodes.OK).json(proposal);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).send(error);
  }
};
