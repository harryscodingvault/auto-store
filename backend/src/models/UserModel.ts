import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  googleId: String,
});

export default mongoose.model("User", userSchema);
