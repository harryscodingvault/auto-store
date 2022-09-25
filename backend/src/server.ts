import express from "express";
import http from "http";
import cors from "cors";
import socketioApp from "./socketio/socketio";
import passport from "passport";
var GoogleStrategy = require("passport-google-oauth20").Strategy;

const app = express();
const server = http.createServer(app);
socketioApp(server);

app.use(cors());

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callBackURL: "/api/auth/google/callback",
    },
    (accessToken: any) => {
      console.log(accessToken);
    }
  )
);

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Getting server at port ${port}`);
});
