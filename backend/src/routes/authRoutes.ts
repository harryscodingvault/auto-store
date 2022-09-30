import passport from "passport";
import express from "express";
import { createUser } from "../controllers/authController";

const router = express.Router();

router.route("/signup").post(createUser);

export default router;
