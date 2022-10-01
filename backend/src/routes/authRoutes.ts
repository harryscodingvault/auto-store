import passport from "passport";
import express from "express";
import { createUser, loginUser } from "../controllers/authController";

const router = express.Router();

router.route("/signup").post(createUser);
router.route("/login").post(loginUser);

export default router;
