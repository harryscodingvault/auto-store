import passport from "passport";
import { keys } from "../config/keys";
var GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.CLIENT_ID,
      clientSecret: keys.CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback",
    },
    (accessToken: any, refreshToken: any, profile: any, done: any) => {
      console.log({ accessToken }, { refreshToken }, { profile }, { done });
    }
  )
);
