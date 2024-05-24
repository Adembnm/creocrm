import * as TYPES from "./types";

const initialState = {
  payments: [],
  payment: {},
  pageCount: 0,
  currentPage: 0,
  totalCount: 0,
  paymentsStatistics: {},
};

export default function paymentsReducer(state = initialState, action) {
  switch (action.type) {
    //Get payments
    case TYPES.GET_PAYMENTS_RECEIVE: {
      return {
        ...state,
        payments: action.payload.data,
        pageCount: action.payload.headers["x-pagination-count"],
        currentPage: action.payload.headers["x-pagination-page"],
        totalCount: action.payload.headers["x-pagination-total"],
      }
    }
    //Get payment
    case TYPES.GET_PAYMENT_RECEIVE: {
      return {
        ...state,
        payment: action.payload,
      }
    }
    //Create payment
    case TYPES.CREATE_PAYMENT_RECEIVE: {
      return {
        ...state,
        payments: [...state.payments, action.payload],
      }
    }
    //Update payment
    case TYPES.UPDATE_PAYMENT_RECEIVE: {
      return {
        ...state,
        payments: state.payments.map(payment => {
          if (payment._id === action.payload._id) {
            return action.payload;
          }
          return payment;
        }
        ),
      }
    }
    //Delete payment
    case TYPES.DELETE_PAYMENT_RECEIVE: {
      return {
        ...state,

        payments: state.payments.filter(payment => payment._id !== action.payload), 
      }
    }
    //Refund payment
    case TYPES.REFUND_PAYMENT_RECEIVE: {
      return {
        ...state,
        payments: state.payments.map(payment => {
          if (payment._id === action.payload._id) {
            return action.payload;
          }
          return payment;
        }
        ),
      }
    }
    default:
      return state
  }  
}
