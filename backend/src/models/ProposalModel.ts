import mongoose from "mongoose";
import User from "./UserModel";

const proposalSchema = new mongoose.Schema(
  {
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: User,
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
    options: [{ votes: [String], name: String }],
  },
  { timestamps: true }
);

export default mongoose.model("Proposal", proposalSchema);
