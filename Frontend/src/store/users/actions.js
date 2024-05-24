import * as TYPES from "./types";

// Get Users
export const getUsersRequest = (payload) => ({
  type: TYPES.GET_USERS_REQUEST,
  payload,
});
export const getUsersReceive = (payload) => ({
  type: TYPES.GET_USERS_RECEIVE,
  payload,
});
//Get UserData
export const getUserDataRequest = (id) => ({
  type: TYPES.GET_USER_DATA_REQUEST,
  id,
});
export const getUserDataReceive = (payload) => ({
  type: TYPES.GET_USER_DATA_RECEIVE,
  payload,
});
//Add User
export const addUserRequest = (payload, navigate) => ({
  type: TYPES.ADD_USER_REQUEST,
  payload,
  navigate,
});
export const addUserReceive = (payload) => ({
  type: TYPES.ADD_USER_RECEIVE,
  payload,
});
//Edit User
export const editUserRequest = (payload, navigate) => ({
  type: TYPES.EDIT_USER_REQUEST,
  payload,
  navigate,
});
export const editUserReceive = (payload) => ({
  type: TYPES.EDIT_USER_RECEIVE,
  payload,
});
//Delete User
export const deleteUserRequest = (id) => ({
  type: TYPES.DELETE_USER_REQUEST,
  id,
});
export const deleteUserReceive = (id) => ({
  type: TYPES.DELETE_USER_RECEIVE,
  id,
});
//Get Users Statistics
export const getUsersStatisticsRequest = (payload) => ({
  type: TYPES.GET_USERS_STATISTICS_REQUEST,
  payload,
});
export const getUsersStatisticsReceive = (payload) => ({
  type: TYPES.GET_USERS_STATISTICS_RECEIVE,
  payload,
});
