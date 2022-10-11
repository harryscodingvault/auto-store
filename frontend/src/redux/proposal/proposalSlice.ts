import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import originAPI, { checkForUnauthorizedResponse } from "../../utils/api";
import authHeader from "../../utils/authHeader";
import {
  addUserToLocalStorage,
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
} from "../../utils/localStorage";
import { getAllProposals } from "../allProposals/allProposalsSlice";
import { logoutUser } from "../user/userSlice";

const initialState = {
  isLoading: false,
  proposal: {},
  errorMessage: "",
  isEditing: false,
};

export const createProposal: any = createAsyncThunk(
  "proposal/createProposal",
  async (proposal, thunkAPI: any) => {
    try {
      const resp = await originAPI.post(
        "proposal",
        proposal,
        authHeader(thunkAPI)
      );
      return resp.data;
    } catch (error: any) {
      return checkForUnauthorizedResponse(error, thunkAPI);
    }
  }
);

export const deleteProposal: any = createAsyncThunk(
  "allProposals/deleteProposal",
  async (proposalId, thunkAPI: any) => {
    try {
      const resp = await originAPI.delete(
        `proposal/${proposalId}`,
        authHeader(thunkAPI)
      );
      thunkAPI.dispatch(getAllProposals());
      return resp.data;
    } catch (error: any) {
      return checkForUnauthorizedResponse(error, thunkAPI);
    }
  }
);

export const editProposal: any = createAsyncThunk(
  "allProposals/editProposal",
  async ({ proposalId, proposalData }: any, thunkAPI: any) => {
    try {
      const resp = await originAPI.patch(
        `proposal/${proposalId}`,
        proposalData,
        authHeader(thunkAPI)
      );
      thunkAPI.dispatch(getAllProposals());
      return resp.data;
    } catch (error: any) {
      return checkForUnauthorizedResponse(error, thunkAPI);
    }
  }
);

const proposalSlice = createSlice({
  name: "proposal",
  initialState,
  reducers: {
    setEditProposal: (state, { payload }) => {
      state.isEditing = true;
      state.proposal = payload;
    },
    setEditProposalFalse: (state) => {
      state.isEditing = false;
      state.proposal = {};
    },
  },
  extraReducers: {
    //CREATE PROPOSAL
    [createProposal.pending]: (state) => {
      state.isLoading = true;
    },
    [createProposal.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
    },
    [createProposal.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.errorMessage = payload;
    },
    //DELETE PROPOSAL
    [deleteProposal.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteProposal.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
    },
    [deleteProposal.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.errorMessage = payload;
    },
    //EDIT PROPOSAL
    [editProposal.pending]: (state) => {
      state.isLoading = true;
    },
    [editProposal.fulfilled]: (state, { payload }) => {
      const { proposal } = payload;
      state.isLoading = false;
      state.proposal = {};
      state.isEditing = false;
    },
    [editProposal.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.errorMessage = payload;
    },
  },
});
export const { setEditProposal, setEditProposalFalse } = proposalSlice.actions;

export default proposalSlice.reducer;
