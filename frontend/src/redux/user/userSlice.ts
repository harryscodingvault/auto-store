import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import originAPI, { checkForUnauthorizedResponse } from "../../utils/api";
import authHeader from "../../utils/authHeader";
import {
  addUserToLocalStorage,
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
} from "../../utils/localStorage";
import { clearAllProposalsState } from "../allProposals/allProposalsSlice";

const initialState = {
  isLoading: false,
  user: getUserFromLocalStorage(),
  errorMessage: "",
};

export const loginUser: any = createAsyncThunk(
  "user/loginUser",
  async (user, thunkAPI) => {
    try {
      const resp = await originAPI.post("auth/login", user);

      return resp.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.error);
    }
  }
);

export const loginUserOauth2: any = createAsyncThunk(
  "user/loginUser",
  async (_, thunkAPI) => {
    try {
      const resp = await originAPI.get("auth/login/success", {
        withCredentials: true,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      });

      return resp.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.error);
    }
  }
);

export const registerUser: any = createAsyncThunk(
  "user/registerUser",
  async (user, thunkAPI: any) => {
    try {
      const resp = await originAPI.post("auth/signup", user);
      return resp.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.error);
    }
  }
);

export const editUser: any = createAsyncThunk(
  "user/editUser",
  async (user, thunkAPI: any) => {
    try {
      const resp = await originAPI.patch("user/me", user, authHeader(thunkAPI));
      return resp.data;
    } catch (error: any) {
      return checkForUnauthorizedResponse(error, thunkAPI);
    }
  }
);

export const logoutUser: any = createAsyncThunk(
  "user/logoutUser",
  async (_, thunkAPI: any) => {
    try {
      const resp = await originAPI.post("auth/logout", _, authHeader(thunkAPI));
      return resp.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.error);
    }
  }
);

export const deleteUser: any = createAsyncThunk(
  "user/deleteUser",
  async (_, thunkAPI: any) => {
    try {
      const resp = await originAPI.delete("user/me", authHeader(thunkAPI));
      return resp.data;
    } catch (error: any) {
      return checkForUnauthorizedResponse(error, thunkAPI);
    }
  }
);

export const clearStore: any = createAsyncThunk(
  "user/clearStore",
  async (_, thunkAPI: any) => {
    try {
      thunkAPI.dispatch(clearAllProposalsState());
      thunkAPI.dispatch(clearAllValues());
      console.log("clear values");
      thunkAPI.dispatch(logoutUser());
      return Promise.resolve();
    } catch (error: any) {
      return Promise.reject();
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearAllValues: (state) => {
      state = initialState;
    },
  },
  extraReducers: {
    //REGISTER USER
    [registerUser.pending]: (state) => {
      state.isLoading = true;
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.user = payload;
      addUserToLocalStorage(payload);
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.errorMessage = payload;
    },
    //LOGIN USER
    [loginUser.pending]: (state) => {
      state.isLoading = true;
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.user = payload;
      addUserToLocalStorage(payload);
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.isLoading = false;

      state.errorMessage = payload;
    },
    //EDIT USER
    [editUser.pending]: (state) => {
      state.isLoading = true;
    },
    [editUser.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.user = payload;
      addUserToLocalStorage(payload);
    },
    [editUser.rejected]: (state, { payload }) => {
      state.isLoading = false;

      state.errorMessage = payload;
    },
    //DELETE USER
    [deleteUser.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteUser.fulfilled]: (state) => {
      state.isLoading = false;
      state.user = null;
      removeUserFromLocalStorage();
    },
    [deleteUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.errorMessage = payload;
    },
    //LOGOUT USER
    [logoutUser.pending]: (state) => {
      state.isLoading = true;
      state.user = null;
      removeUserFromLocalStorage();
    },

    //CLEAR STORE
    [clearStore.rejected]: (state) => {
      state.errorMessage = "There was an error clearing store!";
    },
  },
});

export const { clearAllValues } = userSlice.actions;

export default userSlice.reducer;
