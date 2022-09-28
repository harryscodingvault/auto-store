import passport from "passport";
import express from "express";
import {
  loginFailure,
  loginSuccess,
  logout,
} from "../controllers/authController";
import { profile } from "console";
const router = express.Router();

router
  .route("/google")
  .get(passport.authenticate("google", { scope: ["profile", "email"] }));

router.route("/google/callback").get(
  passport.authenticate("google", {
    successRedirect: process.env.FRONTEND_URL,
    failureRedirect: "/login/failed",
  })
);

router.route("/login/failed").get(loginFailure);
router.route("/login/success").get(loginSuccess);

router.route("/logout").get(logout);

router.route("/profile").get(profile);

export default router;
