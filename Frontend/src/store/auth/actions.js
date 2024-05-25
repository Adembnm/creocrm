import * as TYPES from "./types";

// login
export const loginRequest = (payload) => ({
  type: TYPES.LOGIN_REQUEST,
  payload,
});
export const loginReceive = (payload) => ({
  type: TYPES.LOGIN_RECEIVE,
  payload
});

// get user
export const getUserRequest = () => ({
  type: TYPES.GET_USER_REQUEST,
});
export const getUserReceive = (payload) => ({
  type: TYPES.GET_USER_RECEIVE,
  payload,
});


