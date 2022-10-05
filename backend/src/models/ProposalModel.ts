import mongoose from "mongoose";
import User from "./UserModel";
import Option from "./OptionModel";

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
      type: String,
      required: true,
    },
    capacity: {
      type: Number,
      required: true,
      validate(value: Number) {
        if (value < 2) {
          throw new Error("Capacity must be a over 2!");
        }
        if (value > 100) {
          throw new Error("Capacity must be a under 100!");
        }
      },
    },

    active: {
      type: Boolean,
      default: true,
    },
    editOn: {
      type: Boolean,
      default: true,
    },
    chosenProposal: {
      type: [{ type: mongoose.Schema.Types.ObjectId }],
      default: [],
    },
    options: [
      { type: mongoose.Schema.Types.ObjectId, required: true, ref: Option },
    ],
    totalVotes: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Proposal", proposalSchema);
