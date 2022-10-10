import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import originAPI from "../../utils/api";
import authHeader from "../../utils/authHeader";

import { logoutUser } from "../user/userSlice";

const initialFilterState = {
  search: "",
  isActive: true,
  isPrivate: true,
  createdByUser: true,
  sort: "latest",
  sortOptions: ["latest", "oldest", "a-z", "z-a"],
};

const initialState = {
  isLoading: false,
  proposals: [],
  proposalLimit: 10,
  numOfPages: 1,
  page: 1,
  totalProposals: 0,

  stats: {},
  errorMessage: "",
  ...initialFilterState,
};

export const getAllProposals: any = createAsyncThunk(
  "allProposals/getProposals",
  async (_, thunkAPI: any) => {
    let url = "proposal?creator=me&isPrivate=true";
    try {
      const resp = await originAPI.get(url, authHeader(thunkAPI));

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

const allProposalSlice = createSlice({
  name: "allProposals",
  initialState,
  reducers: {},
  extraReducers: {
    //GET ALL PROPOSALS
    [getAllProposals.pending]: (state) => {
      state.isLoading = true;
    },
    [getAllProposals.fulfilled]: (state, { payload }) => {
      const { proposals, totalProposals, page } = payload;
      state.isLoading = false;
      state.proposals = proposals;
      state.numOfPages = Math.floor(totalProposals / state.proposalLimit) + 1;
      state.page = page;
      state.totalProposals = totalProposals;
    },
    [getAllProposals.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.errorMessage = payload;
    },
  },
});

export default allProposalSlice.reducer;
