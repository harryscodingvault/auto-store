import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import originAPI from "../../utils/api";
import {
  addUserToLocalStorage,
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
} from "../../utils/localStorage";
import { logoutUser } from "../user/userSlice";

const initialState = {
  isLoading: false,
  proposal: null,
  errorMessage: "",
};

export const createProposal: any = createAsyncThunk(
  "proposal/createProposal",
  async (proposal, thunkAPI: any) => {
    try {
      const resp = await originAPI.post("proposal", proposal, {
        headers: {
          authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
        },
      });
      return resp.data;
    } catch (error: any) {
      if (error.response.status === 401) {
        thunkAPI.dispatch(logoutUser());
        return thunkAPI.rejectWithValue("Unauthorized! Logging out...");
      }
      return thunkAPI.rejectWithValue(error.response.data.error);
    }
  }
);

const proposalSlice = createSlice({
  name: "proposal",
  initialState,
  reducers: {},
  extraReducers: {
    //CREATE PROPOSAL
    [createProposal.pending]: (state) => {
      state.isLoading = true;
    },
    [createProposal.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.proposal = payload;
    },
    [createProposal.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.errorMessage = payload;
    },
  },
});

export default proposalSlice.reducer;
