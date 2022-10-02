import passport from "passport";
import express from "express";
import { deleteUser, getUser, updateUser } from "../controllers/userController";
import { authenticateUser } from "../middleware/auth";

const router = express.Router();

router
  .route("/me")
  .get(authenticateUser, getUser)
  .patch(authenticateUser, updateUser)
  .delete(authenticateUser, deleteUser);

export default router;
