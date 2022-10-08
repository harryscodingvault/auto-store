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
  "user/loginUser",
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
  "user/logoutUser",
  async (_, thunkAPI) => {
    try {
      const resp = await originAPI.post("auth/signup");
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
      const resp = await originAPI.patch("user/me", user, {
        headers: {
          authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
        },
      });
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
      const resp = await originAPI.delete("user/me", {
        headers: {
          authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
        },
      });
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
    //LOGOUT USER
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
    },
    [logoutUser.fulfilled]: (state) => {
      state.isLoading = false;
      state.user = null;
      removeUserFromLocalStorage();
    },
    [logoutUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.errorMessage = payload;
    },
  },
});

export default userSlice.reducer;
