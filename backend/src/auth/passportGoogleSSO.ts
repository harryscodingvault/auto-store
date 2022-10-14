import passport from "passport";
var GoogleStrategy = require("passport-google-oauth20").Strategy;

import User from "../models/UserModel";

passport.use(
  new GoogleStrategy(
    {
      clientID: `${process.env.CLIENT_ID}`,
      clientSecret: `${process.env.CLIENT_SECRET}`,
      callbackURL: `${process.env.GOOGLE_CALLBACK_URL}`,
      passReqToCallback: true,
    },
    async (
      req: any,
      accessToken: any,
      refreshToken: any,
      profile: any,
      cb: any
    ) => {
      const defaultUser = {
        username: profile?.displayName,
        email: profile?.emails[0].value,
        googleId: profile?.id,
      };
      try {
        const user: any = await User.findOne({ googleId: profile.id });

        if (!user) {
          await new User(defaultUser).save();
        }

        if (user) {
          req.user = user;

          return cb(null, user);
        }
      } catch (error) {
        console.log(error);
        cb(error, null);
      }
    }
  )
);

passport.serializeUser((user: any, cb) => {
  cb(null, user);
});

passport.deserializeUser((user: any, cb) => {
  cb(null, user);
});
