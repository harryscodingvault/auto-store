import passport from "passport";
import express from "express";
import {
  createUser,
  loginUser,
  logoutUser,
} from "../controllers/authController";
import { authenticateUser } from "../middleware/auth";

const router = express.Router();

router.route("/signup").post(createUser);
router.route("/login").post(loginUser);
router.route("/logout").post(authenticateUser, logoutUser);

export default router;
