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

// forget password 
export const forgetPasswordRequest = (payload) => ({
  type: TYPES.FORGET_PASSWORD_REQUEST,
  payload
});
export const forgetPasswordReceive = (payload) => ({
  type: TYPES.FORGET_PASSWORD_RECEIVE,
  payload,
});

// reset password
export const resetPasswordRequest = (payload) => ({
  type: TYPES.RESET_PASSWORD_REQUEST,
  payload,
});
export const resetPasswordReceive = (payload) => ({
  type: TYPES.RESET_PASSWORD_RECEIVE,
  payload,
});

// force password
export const forcePasswordRequest = (payload) => ({
  type: TYPES.FORCE_PASSWORD_REQUEST,
  payload,
});
export const forcePasswordReceive = (payload) => ({
  type: TYPES.FORCE_PASSWORD_RECEIVE,
  payload,
});
// get user
export const getUserRequest = () => ({
  type: TYPES.GET_USER_REQUEST,
});
export const getUserReceive = (payload) => ({
  type: TYPES.GET_USER_RECEIVE,
  payload,
});

// logout
export const logoutRequest = () => ({
  type: TYPES.LOGOUT_REQUEST,
});
export const logoutReceive = () => ({
  type: TYPES.LOGOUT_RECEIVE,
});
