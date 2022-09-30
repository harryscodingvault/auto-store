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
app.use(express.json());
const server = http.createServer(app);
socketioApp(server);

// ROUTES
import AuthRouter from "./routes/authRoutes";
import ProposalRouter from "./routes/proposalRoutes";
import UserRouter from "./routes/userRoutes";
import notFoundMiddleware from "./middleware/notFound";
import errorHandlerMiddleware from "./middleware/errorHandler";

app.use("/api/auth", AuthRouter);
app.use("/api/user", UserRouter);
app.use("/api/proposal", ProposalRouter);

// MIDDLEWARE
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

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
