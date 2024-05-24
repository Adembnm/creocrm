import { axiosInstance } from "../../network";

// login
export const login = async (payload) => {
  return await axiosInstance.post("api/auth/login", payload);
};

// forget password 
export const forgetPassword = async (payload) => {
  return await axiosInstance.post("api/auth/forget-password", payload);
};

// reset password 
export const resetPassword = async (payload) => {
  return await axiosInstance.post("api/auth/reset-password", payload);
};

// force password
export const forcePassword = async (payload) => {
  return await axiosInstance.post("api/auth/force-password", payload);
}

// get user
export const getUser = async () => {
  return await axiosInstance.get("api/auth/user");
};

// logout
export const logout = async () => {
  return await axiosInstance.post("api/auth/logout");
};
