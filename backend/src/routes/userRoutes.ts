import passport from "passport";
import express from "express";
import { getUser } from "../controllers/authController";

const router = express.Router();

router.route("/user/:id").get(getUser);

export default router;
