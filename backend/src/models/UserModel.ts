import mongoose from "mongoose";
import validator from "validator";

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
    proposalsVoted: [{ proposalId: String, optionId: String }],
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  const user = this;
  console.log("pre save");
  next();
});

export default mongoose.model("User", userSchema);
