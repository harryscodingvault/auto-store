import passport from "passport";
import express from "express";
import { createProposal } from "../controllers/proposalController";

const router = express.Router();

router.route("/").post(createProposal);

export default router;
