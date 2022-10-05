import mongoose from "mongoose";
import User from "./UserModel";

const optionSchema = new mongoose.Schema(
  {
    proposalId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: User,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    count: {
      type: Number,
      default: 0,
    },
    url: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Option", optionSchema);
