import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import originAPI, { checkForUnauthorizedResponse } from "../../utils/api";
import authHeader from "../../utils/authHeader";
import {
  addUserToLocalStorage,
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
} from "../../utils/localStorage";
import { getAllProposals } from "../allProposals/allProposalsSlice";

const initialState = {
  isLoading: false,
  proposal: {},
  sharedProposal: { id: "", data: {} },
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

export const getProposal: any = createAsyncThunk(
  "allProposals/getProposal",
  async (proposalId, thunkAPI: any) => {
    try {
      const resp = await originAPI.get(
        `proposal/${proposalId}`,
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

export const voteProposal: any = createAsyncThunk(
  "allProposals/editProposal",
  async ({ proposalId, proposalData }: any, thunkAPI: any) => {
    const { currentURL, page } = thunkAPI.getState().allProposals;

    try {
      const resp = await originAPI.post(
        `vote/${proposalId}`,
        proposalData,
        authHeader(thunkAPI)
      );
      thunkAPI.dispatch(getAllProposals(currentURL));
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
    setSharedProposalId: (state, { payload }) => {
      state.sharedProposal.id = payload;
    },
    clearSharedProposal: (state) => {
      state.sharedProposal = initialState.sharedProposal;
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
    //VOTE PROPOSAL
    [voteProposal.pending]: (state) => {
      state.isLoading = true;
    },
    [voteProposal.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.isEditing = false;
    },
    [voteProposal.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.errorMessage = payload;
    },
    //GET PROPOSAL
    [getProposal.pending]: (state) => {
      state.isLoading = true;
    },
    [getProposal.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.sharedProposal.data = payload;

      state.isEditing = false;
    },
    [getProposal.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.errorMessage = payload;
    },
  },
});
export const {
  setSharedProposalId,
  clearSharedProposal,
  setEditProposal,
  setEditProposalFalse,
} = proposalSlice.actions;

export default proposalSlice.reducer;
