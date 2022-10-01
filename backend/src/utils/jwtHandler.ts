import jwt from "jsonwebtoken";
import { Types } from "mongoose";

export const createJWT = async (
  userId: Types.ObjectId,
  isAdmin: boolean = false
) => {
  return await jwt.sign({ userId, isAdmin }, `${process.env.JWT_SECRET}`, {
    expiresIn: `${process.env.JWT_LIFETIME}`,
  });
};
