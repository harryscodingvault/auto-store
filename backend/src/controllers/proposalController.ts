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
      createdBy: userId,
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

    proposal.editOn = false;
    await proposal.save();

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

export const getAllProposals = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = res.locals.user._id;

  //FILTERS
  const { isActive, creator, isPrivate, sort, search } = req.query;

  const queryObject: any = {};
  let result: any;

  if (creator === "me") {
    queryObject.editOn = isPrivate === "true" ? true : false;
    queryObject.createdBy = userId;

    result = Proposal.find(queryObject)
      .populate("options", ["name", "count", "url"])
      .populate("createdBy", ["username"]);
  }
  if (creator === "any") {
    if (search) {
      queryObject.title = { $regex: search, $options: "i" };
    }
    queryObject.active = isActive === "true" ? true : false;
    try {
      let votedProposals: any = await Voter.aggregate([
        {
          $match: { voterId: userId },
        },
        { $group: { _id: "$proposalId" } },
      ]);
      votedProposals = votedProposals.map((item: any) => item._id);
      queryObject._id = { $in: votedProposals };

      result = Proposal.find(queryObject);
    } catch (err) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
    }
  }
  //SORTING
  if (sort === "latest") {
    result = result.sort("-deadline");
  }
  if (sort === "oldest") {
    result = result.sort("deadline");
  }
  if (sort === "a-z") {
    result = result.sort("title");
  }
  if (sort === "z-a") {
    result = result.sort("-title");
  }

  //PAGINATION
  const page = parseInt(req.params.page) || 0;
  const limit = parseInt(req.params.limit) || 10;

  try {
    result = result.skip(page * limit).limit(limit);
    const proposals: any = await result;

    res
      .status(StatusCodes.OK)
      .json({ proposals, totalProposals: proposals?.length, page });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
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
      createdBy: res.locals.user._id,
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
      createdBy: res.locals.user._id,
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
