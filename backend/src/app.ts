import express from "express";
import http from "http";
import cors from "cors";
import socketioApp from "./socketio/socketio";

import dotenv from "dotenv";
dotenv.config();

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
import VoteRouter from "./routes/voteRoutes";
import notFoundMiddleware from "./middleware/notFound";
import errorHandlerMiddleware from "./middleware/errorHandler";

app.use("/api/auth", AuthRouter);
app.use("/api/user", UserRouter);
app.use("/api/proposal", ProposalRouter);
app.use("/api/vote", VoteRouter);

// MIDDLEWARE
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

// DB
import connectDB from "./db/connect";
connectDB(`${process.env.MONGO_URI}`);

export default app;
