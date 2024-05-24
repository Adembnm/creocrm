import * as TYPES from "./types";

const initialState = {
  orders: [],
  order: {},
  pageCount: 0,
  currentPage: 0,
  totalCount: 0,
  listCustomers: [],
  customerOrders: [],
  ordersStatistics: [],
};

export default function ordersReducer(state = initialState, action) {
  switch (action.type) {
    //Get orders
    case TYPES.GET_ORDERS_RECEIVE: {
      return {
        ...state,
        orders: action.payload.data,
        pageCount: action.payload.headers["x-pagination-count"],
        currentPage: action.payload.headers["x-pagination-page"],
        totalCount: action.payload.headers["x-pagination-total"],
      }
    }
    //Get Order
    case TYPES.GET_ORDER_RECEIVE: {
      return {
        ...state,
        order: action.payload,
      }
    }
    //Create Order
    case TYPES.CREATE_ORDER_RECEIVE: {
      return {
        ...state,
        orders: [...state.orders, action.payload],
      }
    }
    //Update Order
    case TYPES.UPDATE_ORDER_RECEIVE: {
      return {
        ...state,
        orders: state.orders.map(order => {
          if (order._id === action.payload._id) {
            return action.payload;
          }
          return order;
        }
        ),
      }
    }
    //Delete Order
    case TYPES.DELETE_ORDER_RECEIVE: {
      return {
        ...state,
        orders: state.orders.filter(order => order._id !== action.id),
      }
    }
    //Accept Order
    case TYPES.ACCEPT_ORDER_RECEIVE: {
      return {
        ...state,
        orders: state.orders.map(order => {
          if (order._id === action.payload._id) {
            return action.payload;
          }
          return order;
        }
        ),
      }
    }
    //Reject Order
    case TYPES.REJECT_ORDER_RECEIVE: {
      return {
        ...state,
        orders: state.orders.map(order => {
          if (order._id === action._id) {
            return action.payload;
          }
          return order;
        }
        ),
      }
    }
    //List Customers
    case TYPES.GET_LIST_CUSTOMERS_RECEIVE: {
      return {
        ...state,
        listCustomers: action.payload,
      }
    }
    //Get Customer Orders
    case TYPES.GET_CUSTOMER_ORDERS_RECEIVE: {
      return {
        ...state,
        customerOrders: action.payload,
      }
    }
    //Get Orders Statistics
    case TYPES.GET_ORDERS_STATISTICS_RECEIVE: {
      return {
        ...state,
        ordersStatistics: action.payload,
      }
    }
    default:
      return state
  }  
}
