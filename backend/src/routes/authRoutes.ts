import passport from "passport";
import express from "express";
import {
  createUser,
  loginUser,
  loginUserOauth,
  logoutUser,
} from "../controllers/authController";
import { authenticateUser } from "../middleware/auth";

const router = express.Router();

router.route("/signup").post(createUser);
router.route("/login").post(loginUser);
router.route("/logout").post(authenticateUser, logoutUser);

//GOOGLE AUTH
router.route("/login/success").get(loginUserOauth);

router
  .route("/login/google")
  .get(passport.authenticate("google", { scope: ["profile", "email"] }));

router.route("/google/callback").get(
  passport.authenticate("google", {
    failureMessage: "Failed to login with google",
    successRedirect: `${process.env.FRONTEND_URL}`,
  })
);

export default router;
