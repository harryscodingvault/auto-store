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
      trim: true,
    },
    deadline: {
      type: Date,
      required: true,
    },
    capacity: {
      type: Number,
      required: true,
      validate(value: Number) {
        if (value < 2) {
          throw new Error("Age must be a positive number!");
        }
      },
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
    options: [{ optionId: String, votes: [String], name: String }],
  },
  { timestamps: true }
);

export default mongoose.model("Proposal", proposalSchema);
