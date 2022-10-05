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
    const proposal: any = await Proposal.findOne({
      _id,
    });

    if (!proposal) {
      return res.status(StatusCodes.NOT_FOUND).send({ error: "Not Found" });
    }

    const issuedVote: any = await Voter.findOne({
      voterId: userId,
      proposalId: _id,
    });

    if (issuedVote.optionId !== null) {
      if (issuedVote.optionId.equals(optionId)) {
        issuedVote.optionId = null;
        await issuedVote.save();
        await Proposal.updateOne(
          {
            _id,
            "options._id": optionId,
          },
          { $inc: { "options.$.count": -1 } }
        );
      } else {
        await Proposal.updateMany(
          {
            _id,
            "options._id": issuedVote.optionId,
          },
          { $inc: { "options.$.count": -1 } }
        );
        await Proposal.updateMany(
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
    res.status(StatusCodes.OK).json(issuedVote);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
  }
};
