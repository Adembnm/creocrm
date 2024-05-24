import * as TYPES from "./types";

const initialState = {
  appointments: [],
  appointment: {},
  pageCount: 0,
  currentPage: 0,
  totalCount: 0,
  listCustomers: [],
  nextAppointment: {},
};

export default function appointmentsReducer(state = initialState, action) {
  switch (action.type) {
    //Get appointments
    case TYPES.GET_APPOINTMENTS_RECEIVE: {
      return {
        ...state,
        appointments: action.payload.data,
        pageCount: action.payload.headers["x-pagination-count"],
        currentPage: action.payload.headers["x-pagination-page"],
        totalCount: action.payload.headers["x-pagination-total"],
      }
    }
    //Get appointment
    case TYPES.GET_APPOINTMENT_RECEIVE: {
      return {
        ...state,
        appointment: action.payload,
      }
    }
    //Create appointment
    case TYPES.CREATE_APPOINTMENT_RECEIVE: {
      return {
        ...state,
        appointments: [...state.appointments, action.payload],
      }
    }
    //Update appointment
    case TYPES.UPDATE_APPOINTMENT_RECEIVE: {
      return {
        ...state,
        appointments: state.appointments.map(appointment => {
          if (appointment._id === action.payload._id) {
            return action.payload;
          }
          return appointment;
        }
        ),
      }
    }
    //Delete appointment
    case TYPES.DELETE_APPOINTMENT_RECEIVE: {
      return {
        ...state,
        appointments: state.appointments.filter(appointment => appointment._id !== action.id),
      }
    }
    //Get list customers
    case TYPES.LIST_CUSTOMERS_RECEIVE: {
      return {
        ...state,
        listCustomers: action.payload.data,
      }
    }
    //Get next appointment
    case TYPES.GET_NEXT_APPOINTMENT_RECEIVE: {
      return {
        ...state,
        nextAppointment: action.payload,
      }
    }
    default:
      return state
  }  
}
