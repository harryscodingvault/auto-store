import passport from "passport";
import express from "express";
const router = express.Router();

router
  .route("/google")
  .get(passport.authenticate("google", { scope: ["profile", "email"] }));

router.route("/google/callback").get(passport.authenticate("google"));

router.route("/logout").get((req: any, res: any) => {
  req.logout(function (err: any) {
    console.log(err);
  });
  res.send(req.user);
});

router.route("/profile").get((req, res) => {
  res.send(req.user);
});

export default router;
