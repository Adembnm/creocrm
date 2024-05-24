import * as TYPES from "./types";

const initialState = {
  users: [],
  userData: {},
  usersStatistics: {},
  pageCount: 0,
  currentPage: 0,
  totalFiltredUsers: 0,
};

export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    //Get Users
    case TYPES.GET_USERS_RECEIVE: {
      return {
        ...state,
        users: action.payload.data,
        pageCount: action.payload.headers["x-pagination-count"],
        totalFiltredUsers: action.payload.headers["x-pagination-total"],
        currentPage: action.payload.headers["x-pagination-page"],
      }
    }
    //Get UserData
    case TYPES.GET_USER_DATA_RECEIVE: {
      return {
        ...state,
        userData: action.payload,
      }
    }
    //Add User
    case TYPES.ADD_USER_RECEIVE: {
      return {
        ...state,
        users: [...state.users, action.payload],
      }
    }
    //Edit User
    case TYPES.EDIT_USER_RECEIVE: {
      return {
        ...state,
        userData: action.payload,
        users: state.users.map((user) => {
          if (user._id === action.payload.id) {
            return action.payload;
          } else {
            return user;
          }
        })
      }
    }
    //Delete User
    case TYPES.DELETE_USER_RECEIVE: {
      return {
        ...state,
        users: state.users.filter((user) => user._id !== action.id),
      }
    }
    //Get Users Statistics
    case TYPES.GET_USERS_STATISTICS_RECEIVE: {
      return {
        ...state,
        usersStatistics: action.payload,
      }
    }
    default:
      return state
  }  
}
