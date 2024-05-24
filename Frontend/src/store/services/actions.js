import * as TYPES from "./types";
//Services
// Get Services
export const getServicesRequest = (payload) => ({
  type: TYPES.GET_SERVICES_REQUEST,
  payload,
});
export const getServicesReceive = (payload) => ({
  type: TYPES.GET_SERVICES_RECEIVE,
  payload,
});
//Get Pre Order
export const getServiceRequest = (payload) => ({
  type: TYPES.GET_SERVICE_REQUEST,
  payload,
});
export const getServiceReceive = (payload) => ({
  type: TYPES.GET_SERVICE_RECEIVE,
  payload,
});
//Create Pre Order
export const createServiceRequest = (payload, navigate) => ({
  type: TYPES.CREATE_SERVICE_REQUEST,
  payload,
  navigate,
});
export const createServiceReceive = (payload) => ({
  type: TYPES.CREATE_SERVICE_RECEIVE,
  payload,
});
//Update Pre Order
export const updateServiceRequest = (payload, navigate) => ({
  type: TYPES.UPDATE_SERVICE_REQUEST,
  payload,
  navigate,
});
export const updateServiceReceive = (payload) => ({
  type: TYPES.UPDATE_SERVICE_RECEIVE,
  payload,
});
//Delete Pre Order
export const deleteServiceRequest = (id) => ({
  type: TYPES.DELETE_SERVICE_REQUEST,
  id,
});
export const deleteServiceReceive = (id) => ({
  type: TYPES.DELETE_SERVICE_RECEIVE,
  id,
});