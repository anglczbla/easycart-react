import axios from "axios";
import { removeToken } from "../store/authSlice";
import { store } from "../store/store";

const BASE_URL = import.meta.env.VITE_BE_URL;

const apiClient = axios.create({
  baseURL: BASE_URL,
});

apiClient.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("userData");
      store.dispatch(removeToken());
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export default apiClient;
