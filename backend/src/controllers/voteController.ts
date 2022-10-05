import express, { NextFunction, Request, Response } from "express";
import User from "../models/UserModel";
import bcrypt from "bcrypt";
import { StatusCodes } from "http-status-codes";
import Proposal from "../models/ProposalModel";
import Voter from "../models/VoterModel";

export const addVote = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = res.locals.user._id;
  const { optionId } = req.body;
  const _id = req.params.id;

  try {
    let proposal: any = await Proposal.findOne({
      _id,
    });

    if (!proposal) {
      return res.status(StatusCodes.NOT_FOUND).send({ error: "Not Found" });
    }

    if (!proposal.active) {
      return res
        .status(StatusCodes.METHOD_NOT_ALLOWED)
        .send({ error: "Proposal expired" });
    }

    const issuedVote: any = await Voter.findOne({
      voterId: userId,
      proposalId: _id,
    });

    // VOTING MECHANISM
    if (issuedVote.optionId !== null) {
      if (issuedVote.optionId.equals(optionId)) {
        await Proposal.updateOne(
          {
            _id,
            "options._id": optionId,
          },
          { $inc: { "options.$.count": -1 } }
        );
        issuedVote.optionId = null;
        await issuedVote.save();
      } else {
        await Proposal.updateOne(
          {
            _id,
            "options._id": issuedVote.optionId,
          },
          { $inc: { "options.$.count": -1 } }
        );
        await Proposal.updateOne(
          {
            _id,
            "options._id": optionId,
          },
          { $inc: { "options.$.count": 1 } }
        );
        issuedVote.optionId = optionId;
        await issuedVote.save();
      }
    } else {
      issuedVote.optionId = optionId;
      await issuedVote.save();

      await Proposal.updateOne(
        {
          _id,
          "options._id": optionId,
        },
        { $inc: { "options.$.count": 1 } }
      );
    }

    //UPDATE TOTAL VOTE COUNT
    const count = await Voter.find({
      proposalId: proposal._id,
      optionId: { $ne: null },
    }).count();

    proposal = await Proposal.findOne({
      _id,
    });
    console.log("coming winner");
    const winner = await proposal.aggregate([
      {
        $options: {
          MaxValues: { max: "count" },
        },
      },
    ]);

    console.log({ winner });

    if (count >= proposal.capacity) {
      await proposal.updateOne({
        active: false,
      });
      await proposal.updateOne({
        totalVotes: proposal.capacity,
      });
    } else {
      await proposal.updateOne({ totalVotes: count, editOn: false });
      proposal = await Proposal.findOne({
        _id,
      });
    }

    res.status(StatusCodes.OK).json({ proposal, optionId });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
  }
};
