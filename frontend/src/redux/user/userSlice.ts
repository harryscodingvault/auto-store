import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import originAPI from "../../utils/api";
import {
  addUserToLocalStorage,
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
} from "../../utils/localStorage";

const initialState = {
  isLoading: false,
  user: getUserFromLocalStorage(),
  errorMessage: "",
};

export const loginUser: any = createAsyncThunk(
  "user/registerUser",
  async (user, thunkAPI) => {
    try {
      const resp = await originAPI.post("auth/login", user);
      return resp.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.error);
    }
  }
);

export const registerUser: any = createAsyncThunk(
  "auth/loginUser",
  async (user, thunkAPI) => {
    try {
      const resp = await originAPI.post("auth/signup", user);
      return resp.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.error);
    }
  }
);

export const logoutUser: any = createAsyncThunk(
  "auth/logoutUser",
  async (_, thunkAPI) => {
    try {
      const resp = await originAPI.post("auth/signup");
      return resp.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.error);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: {
    //REGISTER USER
    [registerUser.pending]: (state) => {
      state.isLoading = true;
    },
    [registerUser.fulfilled]: (state, payload) => {
      const user = payload;
      state.isLoading = false;
      state.user = user;
      addUserToLocalStorage(user);
    },
    [registerUser.rejected]: (state, payload) => {
      state.isLoading = false;
      state.errorMessage = payload;
    },
    //LOGIN USER
    [loginUser.pending]: (state) => {
      state.isLoading = true;
    },
    [loginUser.fulfilled]: (state, payload) => {
      state.isLoading = false;
      const user = payload;
      state.user = user;
      addUserToLocalStorage(user);
    },
    [loginUser.rejected]: (state, payload) => {
      state.isLoading = false;
      state.errorMessage = payload;
    },
    //LOGOUT USER
    [logoutUser.pending]: (state) => {
      state.isLoading = true;
    },
    [logoutUser.fulfilled]: (state, payload) => {
      state.isLoading = false;
      state.user = null;
      removeUserFromLocalStorage();
    },
    [logoutUser.rejected]: (state, payload) => {
      state.isLoading = false;
      state.errorMessage = payload;
    },
  },
});

export default userSlice.reducer;
