import axios from "axios";

const originAPI = axios.create({
  baseURL: "http://localhost:5000/api",
});

export default originAPI;
