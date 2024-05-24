import * as TYPES from "./types";

const initialState = {
  customers: [],
  customer: {},
  customersStatistics: {},
  pageCount: 0,
  currentPage: 0,
  totalFiltredCustomers: 0,
  customersList: [],
  unpaidCustomers: [],
  mailIsSent: false,
};

export default function customersReducer(state = initialState, action) {
  switch (action.type) {
    //Get Customers
    case TYPES.GET_CUSTOMERS_RECEIVE: {
      return {
        ...state,
        customers: action.payload.data,
        pageCount: action.payload.headers["x-pagination-count"],
        totalFiltredCustomers: action.payload.headers["x-pagination-total"],
        currentPage: action.payload.headers["x-pagination-page"],
      }
    }
    //Get Customer
    case TYPES.GET_CUSTOMER_RECEIVE: {
      return {
        ...state,
        customer: action.payload,
      }
    }
    //Add Customer
    case TYPES.ADD_CUSTOMER_RECEIVE: {
      return {
        ...state,
        customers: [...state.customers, action.payload],
      }
    }
    //Edit Customer
    case TYPES.EDIT_CUSTOMER_RECEIVE: {
      return {
        ...state,
        userData: action.payload,
        customers: state.customers.map((user) => {
          if (user._id === action.payload.id) {
            return action.payload;
          } else {
            return user;
          }
        })
      }
    }
    //Delete Customer
    case TYPES.DELETE_CUSTOMER_RECEIVE: {
      return {
        ...state,
        customers: state.customers.filter((user) => user._id !== action.id),
      }
    }
    //Get Customers Statistics
    case TYPES.GET_CUSTOMERS_STATISTICS_RECEIVE: {
      return {
        ...state,
        customersStatistics: action.payload,
      }
    }
    //Get Customers List
    case TYPES.GET_CUSTOMERS_LIST_RECEIVE: {
      return {
        ...state,
        customersList: action.payload,
      }
    }
    //Customer Change Status
    case TYPES.CUSTOMER_CHANGE_STATUS_RECEIVE: {
      return {
        ...state,
        customers: state.customers.map((customer) => {
          if (customer._id === action.payload.id) {
            return action.payload;
          } else {
            return customer;
          }
        }
        )
      }
    }
    //Unpaid Customers list
    case TYPES.GET_UNPAID_CUSTOMERS_LIST_RECEIVE: {
      return {
        ...state,
        unpaidCustomers: action.payload,
      }
    }
    //send Custom Mail
    case TYPES.SEND_CUSTOM_MAIL_RECEIVE: {
      return {
        ...state,
        mailIsSent: action.payload,
      }
    }
    default:
      return state
  }  
}
