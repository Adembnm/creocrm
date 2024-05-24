import { axiosInstance } from "../../network";
//Appointments
//Get Appointments
export const getAppointmentsRequest = async (payload) => {
  return await axiosInstance.get(`api/appointments`, { params: payload });
}
//Get Appointment
export const getAppointmentRequest = async (payload) => {
  return await axiosInstance.get(`api/appointments/${payload}`);
}
//Create Appointment
export const createAppointmentRequest = async (payload) => {
  return await axiosInstance.post(`api/appointments`, payload);
} 
//Update Appointment
export const updateAppointmentRequest = async (payload) => {
  return await axiosInstance.patch(`api/appointments/${payload.id}`, payload);
}
//Delete Appointment
export const deleteAppointmentRequest = async (id) => {
  return await axiosInstance.delete(`api/appointments/${id}`);
}
//List Customers
export const listCustomersRequest = async (payload) => {
  return await axiosInstance.get(`api/appointments/customers`, { params: payload });
}
//Get Next Appointment
export const getNextAppointmentRequest = async (payload) => {
  return await axiosInstance.get(`api/appointments/next`, { params: payload });
}