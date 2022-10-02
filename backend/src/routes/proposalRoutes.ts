import passport from "passport";
import express from "express";
import {
  createProposal,
  deleteProposal,
  getAllProposals,
  getProposal,
  updateProposal,
} from "../controllers/proposalController";
import { authenticateUser } from "../middleware/auth";

const router = express.Router();

router
  .route("/:id")
  .get(authenticateUser, getProposal)
  .patch(authenticateUser, updateProposal)
  .delete(authenticateUser, deleteProposal);
router
  .route("/")
  .post(authenticateUser, createProposal)
  .get(authenticateUser, getAllProposals);

export default router;
