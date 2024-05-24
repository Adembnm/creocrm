import { axiosInstance } from "../../network";

//Get Users
export const getUsersRequest = async (payload) => {
  return await axiosInstance.get(`api/users`, { params: payload });
}
//Get UserData
export const getUserDataRequest = async (id) => {
  return await axiosInstance.get(`api/users/${id}`);
}
//Add User
export const addUserRequest = async (payload) => {
  return await axiosInstance.post(`api/users`, payload);
}
//Edit User
export const editUserRequest = async (payload) => {
  return await axiosInstance.patch(`api/users/${payload.id}`, payload);
}
//Delete User
export const deleteUserRequest = async (id) => {
  return await axiosInstance.delete(`api/users/${id}`);
}
//Get Users Statistics
export const getUsersStatisticsRequest = async (payload) => {
  return await axiosInstance.get(`api/users/statistics`, { params: payload });
}