import mongoose from "mongoose";
import passport from "passport";
import { keys } from "../config/keys";
var GoogleStrategy = require("passport-google-oauth20").Strategy;

import User from "../models/UserModel";

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.CLIENT_ID,
      clientSecret: keys.CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback",
    },
    (accessToken: any, refreshToken: any, profile: any, done: any) => {
      User.findOne({ googleId: profile.id }).then((existingUser) => {
        if (existingUser) {
          done(null, existingUser);
        } else {
          new User({ googleId: profile.id })
            .save()
            .then((user) => done(null, user));
        }
      });
    }
  )
);
