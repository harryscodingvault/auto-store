import passport from "passport";
import express from "express";
import {
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from "../controllers/userController";
import { authenticateUser } from "../middleware/auth";

const router = express.Router();

router.route("/me").get(authenticateUser, getUser);

router
  .route("/:id")
  .patch(authenticateUser, updateUser)
  .delete(authenticateUser, deleteUser);
router.route("/").get(authenticateUser, getAllUsers);

export default router;
