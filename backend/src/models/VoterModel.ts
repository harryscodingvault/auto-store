import mongoose from "mongoose";
import Proposal from "./ProposalModel";
import User from "./UserModel";

const VoterSchema = new mongoose.Schema(
  {
    voterId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: User,
    },
    proposalId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: Proposal,
    },
    optionId: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Voter", VoterSchema);
