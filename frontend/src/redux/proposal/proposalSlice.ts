import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import originAPI from "../../utils/api";
import {
  addUserToLocalStorage,
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
} from "../../utils/localStorage";

const initialState = {
  isLoading: false,
  id: "",
  title: "",
  deadline: "",
  capacity: 0,
  active: false,
  isEditing: false,
  chosenProposal: [],
  options: [],
  totalVotes: 0,
  creator: "",
};

const proposalSlice = createSlice({
  name: "proposal",
  initialState,
  reducers: {},
  extraReducers: {},
});

export default proposalSlice.reducer;
