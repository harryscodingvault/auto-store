import axios from "axios";
import { getUserFromLocalStorage } from "./localStorage";

const originAPI = axios.create({
  baseURL: "http://localhost:5000/api",
});

export default originAPI;
