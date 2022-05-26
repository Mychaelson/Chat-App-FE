import axios from "axios";

export const API_URL = "http://localhost:2000";

const axiosInstance = axios.create({
  baseURL: API_URL,
});

export default axiosInstance;
