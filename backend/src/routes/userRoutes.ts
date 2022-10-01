import passport from "passport";
import express from "express";
import {
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from "../controllers/userController";

const router = express.Router();

router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);
router.route("/").get(getAllUsers);

export default router;
