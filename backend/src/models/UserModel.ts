import mongoose from "mongoose";
import validator from "validator";
import Proposal from "./ProposalModel";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      validate(value: string) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is invalid!");
        }
      },
    },
    password: {
      type: String,
      required: true,
    },
    tokens: [{ token: { type: String, required: true } }],
    proposalsVoted: [
      {
        proposalId: {
          type: mongoose.Schema.Types.ObjectId,
        },
        optionId: {
          type: mongoose.Schema.Types.ObjectId,
        },
      },
    ],
  },
  { timestamps: true }
);

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;

  return userObject;
};

export default mongoose.model("User", userSchema);
