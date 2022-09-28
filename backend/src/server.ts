import express from "express";
import http from "http";
import cors from "cors";
import socketioApp from "./socketio/socketio";
import session from "express-session";
import passport from "passport";
import dotenv from "dotenv";
dotenv.config();
// DB
import connectDB from "./db/connect";

import "./services/passport";

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

const server = http.createServer(app);
socketioApp(server);

app.use(
  session({
    secret: `${process.env.COOKIE_KEY}`,
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
    await connectDB(`${process.env.MONGO_URI}`);
    app.listen(port, () => {
      console.log(`Server reporting at ${port}`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
