import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../redux/user/userSlice";
import proposalReducer from "../redux/proposal/proposalSlice";
import allProposalsReducer from "./allProposals/allProposalsSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    proposal: proposalReducer,
    allProposals: allProposalsReducer,
  },
});
