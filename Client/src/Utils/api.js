import axios from "axios";
import { getAuth } from "./auth";
const API_URL = `http://localhost:5000/api`;
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const authtoken = getAuth();
  config.headers.Authorization = authtoken || null;
  return config;
});
export default api;