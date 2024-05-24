import { axiosInstance } from "./index";

export default function setupAxios(axios, store) {
  axiosInstance.interceptors.request.use(
    (config) => {
      const {
        auth: { token },
      } = store.getState();

      config.headers["Accept-Language"] = "en";

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    (err) => Promise.reject(err)
  );
}
