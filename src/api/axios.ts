import axios from "axios";

const instanceWithCredentials = axios.create({
  baseURL: "http://localhost:5000/api",
  timeout: 5000,
  withCredentials: true,
});

export default instanceWithCredentials;
