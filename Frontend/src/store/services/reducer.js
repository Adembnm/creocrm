import * as TYPES from "./types";

const initialState = {
  services: [],
  service: {},
};

export default function servicesReducer(state = initialState, action) {
  switch (action.type) {
    //Get Services
    case TYPES.GET_SERVICES_RECEIVE: {
      return {
        ...state,
        services: action.payload.data,
      }
    }
    //Get Service
    case TYPES.GET_SERVICE_RECEIVE: {
      return {
        ...state,
        service: action.payload,
      }
    }
    //Create Service
    case TYPES.CREATE_SERVICE_RECEIVE: {
      return {
        ...state,
        services: [...state.services, action.payload],
      }
    }
    //Update Service
    case TYPES.UPDATE_SERVICE_RECEIVE: {
      return {
        ...state,
        services: state.services.map(service => {
          if (service._id === action.payload._id) {
            return action.payload;
          }
          return service;
        }
        ),
      }
    }
    //Delete Service
    case TYPES.DELETE_SERVICE_RECEIVE: {
      return {
        ...state,
        services: state.services.filter(service => service._id !== action.id),
      }
    }
    default:
      return state
  }  
}
