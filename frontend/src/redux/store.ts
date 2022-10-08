import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../redux/user/userSlice";
import proposalReducer from "../redux/proposal/proposalSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    proposal: proposalReducer,
  },
});
