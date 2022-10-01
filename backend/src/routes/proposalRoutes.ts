import passport from "passport";
import express from "express";
import {
  createProposal,
  deleteProposal,
  getAllProposals,
  getProposal,
  updateProposal,
} from "../controllers/proposalController";

const router = express.Router();

router
  .route("/:id")
  .get(getProposal)
  .patch(updateProposal)
  .delete(deleteProposal);
router.route("/").post(createProposal).get(getAllProposals);

export default router;
