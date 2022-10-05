import passport from "passport";
import express from "express";
import {
  createProposal,
  deleteProposal,
  getVotedProposals,
  getProposal,
  updateProposal,
  getCreatedProposals,
} from "../controllers/proposalController";
import { authenticateUser } from "../middleware/auth";

const router = express.Router();

router.route("/me").get(getCreatedProposals);

router
  .route("/:id")
  .get(authenticateUser, getProposal)
  .patch(authenticateUser, updateProposal)
  .delete(authenticateUser, deleteProposal);
router
  .route("/")
  .post(authenticateUser, createProposal)
  .get(authenticateUser, getVotedProposals);

export default router;
