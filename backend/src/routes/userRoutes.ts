import passport from "passport";
import express from "express";
import { getUser, updateUser } from "../controllers/userController";

const router = express.Router();

router.route("/:id").get(getUser).patch(updateUser);

export default router;
