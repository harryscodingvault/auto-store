import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import originAPI from "../../utils/api";

import { logoutUser } from "../user/userSlice";

const initialFilterState = {
  isActive: true,
  isPrivate: true,
  createdByUser: true,
  sort: "latest",
  sortOptions: ["latest", "oldest", "a-z", "z-a"],
};

const initialState = {
  isLoading: false,
  proposals: [],
  totalProposals: 10,
  numOfPages: 1,
  page: 1,
  stats: {},
  errorMessage: "",
  ...initialFilterState,
};

export const getAllProposals: any = createAsyncThunk(
  "allProposals/getProposals",
  async (_, thunkAPI: any) => {
    let url = "proposal?creator=me&isPrivate=true";
    try {
      const resp = await originAPI.get(url, {
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
      const { proposals } = payload;
      state.isLoading = false;
      state.proposals = proposals;
    },
    [getAllProposals.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.errorMessage = payload;
    },
  },
});

export default allProposalSlice.reducer;
