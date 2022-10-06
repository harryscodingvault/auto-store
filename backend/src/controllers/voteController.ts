import express, { NextFunction, Request, Response } from "express";

import { StatusCodes } from "http-status-codes";
import Proposal from "../models/ProposalModel";
import Voter from "../models/VoterModel";
import Option from "../models/OptionModel";
import { closeProposalOnCapacity } from "../services/db_watch";

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
        await Option.updateOne(
          {
            _id: optionId,
          },
          { $inc: { count: -1 } }
        );
        issuedVote.optionId = null;
        await issuedVote.save();
      } else {
        await Option.updateOne(
          {
            _id: issuedVote.optionId,
          },
          { $inc: { count: -1 } }
        );
        await Option.updateOne(
          {
            _id: optionId,
          },
          { $inc: { count: 1 } }
        );
        issuedVote.optionId = optionId;
        await issuedVote.save();
      }
    } else {
      issuedVote.optionId = optionId;
      await issuedVote.save();

      await Option.updateOne(
        {
          _id: optionId,
        },
        { $inc: { count: 1 } }
      );
    }
    closeProposalOnCapacity(proposal);

    proposal = await Proposal.findOne({
      _id,
    }).populate("options", "name");

    res.status(StatusCodes.OK).json(proposal);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
  }
};
