import axios, { AxiosHeaders } from "axios";
import store from "../redux/store";

const instance = axios.create({
  baseURL: "https://online-learning-platform-backend-2bgp.onrender.com",
  withCredentials: true,
});

instance.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.user.accessToken;

    if (!config.headers) {
      config.headers = new AxiosHeaders();
    }

    if (token) {
      config.headers.set("Authorization", `Bearer ${token}`);
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
