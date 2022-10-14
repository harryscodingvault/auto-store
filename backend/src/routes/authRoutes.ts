import passport from "passport";
import express from "express";
import {
  createUser,
  loginUser,
  logoutUser,
} from "../controllers/authController";
import { authenticateUser } from "../middleware/auth";
import { createJWT } from "../utils/jwtHandler";
import { StatusCodes } from "http-status-codes";

const router = express.Router();

router.route("/signup").post(createUser);
router.route("/login").post(loginUser);
router.route("/logout").post(authenticateUser, logoutUser);

//GOOGLE AUTH
router.route("/login/success").get(async (req, res) => {
  console.log("login success", req.user);
  //const token = await createJWT(_id);

  if (req.user) {
    res.status(StatusCodes.OK).send({ message: "success", user: req.user });
  }
});

router.route("/login/failed").get((req, res) => {
  res.status(StatusCodes.BAD_REQUEST).send({ error: "Login failed!!!" });
});

router
  .route("/login/google")
  .get(passport.authenticate("google", { scope: ["email", "profile"] }));

router.route("/google/callback").get(
  passport.authenticate("google", {
    failureMessage: "Failed to login with google",
    failureRedirect: `${process.env.FRONTEND_URL}/login/failed`,
    successRedirect: `${process.env.FRONTEND_URL}`,
  })
);

export default router;
