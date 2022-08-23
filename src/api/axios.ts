import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: "http://api.fancimple.eastkindness.com",
  baseURL: "http://localhost:5000",
  withCredentials: true,
});

export default axiosInstance;
