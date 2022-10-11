import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import originAPI, { checkForUnauthorizedResponse } from "../../utils/api";
import authHeader from "../../utils/authHeader";

import { logoutUser } from "../user/userSlice";

const initialFilterState = {
  search: "",
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
  currentURL: "private",

  stats: {},
  errorMessage: "",
  ...initialFilterState,
};

export const getAllProposals: any = createAsyncThunk(
  "allProposals/getProposals",
  async (urlType: string = "private", thunkAPI: any) => {
    const { sort, page, search, currentURL } = thunkAPI.getState().allProposals;
    let url = "proposal";

    if (urlType === "private") {
      url += "?creator=me&isPrivate=true";
    }
    if (urlType === "shared") {
      url += "?creator=me&isPrivate=false";
    }
    if (urlType === "active") {
      url += "?creator=any&isActive=true";
    }
    if (urlType === "expired") {
      url += "?creator=any&isActive=false";
    }
    url += `&sort=${sort}&page=${page}&search=${search}`;
    try {
      const resp = await originAPI.get(url, authHeader(thunkAPI));

      return resp.data;
    } catch (error: any) {
      return checkForUnauthorizedResponse(error, thunkAPI);
    }
  }
);

const allProposalSlice = createSlice({
  name: "allProposals",
  initialState,
  reducers: {
    changePage: (state, { payload }) => {
      state.page = payload;
    },
    updateUrl: (state, { payload }) => {
      state.currentURL = payload;
      state.page = 1;
    },
    changeSort: (state, { payload }) => {
      state.sort = payload;
    },
    changeSearchTerm: (state, { payload }) => {
      state.search = payload;
    },
    clearAllProposalsState: (state) => initialState,
  },
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

export const {
  changeSearchTerm,
  changeSort,
  changePage,
  updateUrl,
  clearAllProposalsState,
} = allProposalSlice.actions;

export default allProposalSlice.reducer;
