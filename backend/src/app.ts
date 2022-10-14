import express from "express";

import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
dotenv.config();
import passport from "passport";
import helmet from "helmet";
//PASSPORT IMPORTS
import "./auth/passportGoogleSSO";
import cookieSession from "cookie-session";
//ROUTES IMPORTS
import AuthRouter from "./routes/authRoutes";
import ProposalRouter from "./routes/proposalRoutes";
import UserRouter from "./routes/userRoutes";
import VoteRouter from "./routes/voteRoutes";
import notFoundMiddleware from "./middleware/notFound";
import errorHandlerMiddleware from "./middleware/errorHandler";

const app = express();
app.use(helmet());

app.use(
  cors({
    origin: `${process.env.FRONTEND_URL}`,
    methods: "GET,POST,PUT,DELETE, PATCH",
    credentials: true,
  })
);
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}
app.use(express.json());

//PASSPORT
app.use(
  cookieSession({
    name: "session",
    keys: [`${process.env.COOKIE_KEY}`],
    maxAge: 24 * 60 * 60 * 1000,
  })
);
app.use(passport.initialize());
app.use(passport.session());

//ROUTES
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
