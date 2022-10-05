import mongoose from "mongoose";

const connectDB = async (url: string) => {
  try {
    const res = await mongoose.connect(url);
    console.log("Connected to DB!");
    return res;
  } catch (err) {
    console.log("Error connecting DB!");
  }
};

export default connectDB;
