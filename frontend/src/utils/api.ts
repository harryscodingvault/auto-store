import axios from "axios";
import { clearStore } from "../redux/user/userSlice";

const originAPI = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const checkForUnauthorizedResponse = (error: any, thunkAPI: any) => {
  if (error.response.status === 401) {
    thunkAPI.dispatch(clearStore());
    return thunkAPI.rejectWithValue("Unauthorized! Logging out...");
  }
  return thunkAPI.rejectWithValue(error.response.data.error);
};

export default originAPI;
