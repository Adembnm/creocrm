import * as TYPES from "./types";

const initialAuthState = {
  token: localStorage.getItem("token") || null,
  user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
  email: localStorage.getItem("email") || null,
};

export default function authReducer(state = initialAuthState, action) {
  switch (action.type) {
    case TYPES.LOGIN_RECEIVE:
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
      };
    case TYPES.FORGET_PASSWORD_RECEIVE:
      return {
        ...state,
        email: action.payload.email,
      };
    case TYPES.RESET_PASSWORD_RECEIVE:
      return {
        ...state,
      };
    case TYPES.FORCE_PASSWORD_RECEIVE:
      return {
        ...state,
        token: null,
        user: null,
      };
    case TYPES.GET_USER_RECEIVE:
      return {
        ...state,
        user: action.payload,
      };
    case TYPES.LOGOUT_RECEIVE:
      return {
        ...state,
        token: null,
        user: null,
      };
    default:
      return state;
  }
}
