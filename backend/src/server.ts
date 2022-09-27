import express from "express";
import http from "http";
import cors from "cors";
import socketioApp from "./socketio/socketio";
import session from "express-session";
import passport from "passport";
// DB
import mongoose from "mongoose";
import connectDB from "./db/connect";

import "./services/passport";
import { keys } from "./config/keys";

const app = express();
const server = http.createServer(app);
socketioApp(server);

app.use(cors());
app.use(
  session({
    secret: keys.COOKIE_KEY,
    resave: true,
    saveUninitialized: true,
    cookie: {},
  })
);
app.use(passport.initialize());
app.use(passport.session());

// ROUTER
import AuthRouter from "./routes/authRoutes";

app.use("/api/auth", AuthRouter);

const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(keys.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server reporting at ${port}`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
