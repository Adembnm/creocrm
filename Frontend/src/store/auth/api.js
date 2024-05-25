import { axiosInstance } from "../../network";

// login
export const login = async (payload) => {
  return await axiosInstance.post("api/auth/login", payload);
};

// get user
export const getUser = async () => {
  return await axiosInstance.get("api/auth/user");
};

