import * as TYPES from "./types";
//Appointments
// Get Appointments
export const getAppointmentsRequest = (payload) => ({
  type: TYPES.GET_APPOINTMENTS_REQUEST,
  payload,
});
export const getAppointmentsReceive = (payload) => ({
  type: TYPES.GET_APPOINTMENTS_RECEIVE,
  payload,
});
//Get Appointment
export const getAppointmentRequest = (payload) => ({
  type: TYPES.GET_APPOINTMENT_REQUEST,
  payload,
});
export const getAppointmentReceive = (payload) => ({
  type: TYPES.GET_APPOINTMENT_RECEIVE,
  payload,
});
//Create Appointment
export const createAppointmentRequest = (payload, navigate) => ({
  type: TYPES.CREATE_APPOINTMENT_REQUEST,
  payload,
  navigate,
});
export const createAppointmentReceive = (payload) => ({
  type: TYPES.CREATE_APPOINTMENT_RECEIVE,
  payload,
});
//Update Appointment
export const updateAppointmentRequest = (payload, navigate) => ({
  type: TYPES.UPDATE_APPOINTMENT_REQUEST,
  payload,
  navigate,
});
export const updateAppointmentReceive = (payload) => ({
  type: TYPES.UPDATE_APPOINTMENT_RECEIVE,
  payload,
});
//Delete Appointment
export const deleteAppointmentRequest = (id) => ({
  type: TYPES.DELETE_APPOINTMENT_REQUEST,
  id,
});
export const deleteAppointmentReceive = (id) => ({
  type: TYPES.DELETE_APPOINTMENT_RECEIVE,
  id,
});
//List Customers
export const listCustomersRequest = (payload) => ({
  type: TYPES.LIST_CUSTOMERS_REQUEST,
  payload,
});
export const listCustomersReceive = (payload) => ({
  type: TYPES.LIST_CUSTOMERS_RECEIVE,
  payload,
});
//Get Next Appointment
export const getNextAppointmentRequest = (payload) => ({
  type: TYPES.GET_NEXT_APPOINTMENT_REQUEST,
  payload,
});
export const getNextAppointmentReceive = (payload) => ({
  type: TYPES.GET_NEXT_APPOINTMENT_RECEIVE,
  payload,
});