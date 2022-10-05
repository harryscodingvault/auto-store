import passport from "passport";
import express from "express";
import { addVote } from "../controllers/voteController";

import { authenticateUser } from "../middleware/auth";

const router = express.Router();

router.route("/:id").post(authenticateUser, addVote);

export default router;
