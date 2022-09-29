import mongoose from "mongoose";

const proposalSchema = new mongoose.Schema(
  {
    creatorId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    deadline: {
      type: Date,
      required: true,
    },
    capacity: {
      type: Number,
      required: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
    chosenProposal: {
      type: String,
      default: null,
    },
    voters: {
      type: [String],
      default: [],
    },
    options: {
      type: [{ optionId: String, votes: [String], name: String }],
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Proposal", proposalSchema);
