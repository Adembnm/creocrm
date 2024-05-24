import { axiosInstance } from "../../network";
//Services
//Get Services
export const getServicesRequest = async (payload) => {
  return await axiosInstance.get(`api/services`, { params: payload });
}
//Get Service
export const getServiceRequest = async (payload) => {
  return await axiosInstance.get(`api/services/${payload}`);
}
//Create Service
export const createServiceRequest = async (payload) => {
  return await axiosInstance.post(`api/services`, payload);
} 
//Update Service
export const updateServiceRequest = async (payload) => {
  return await axiosInstance.patch(`api/services/${payload.id}`, payload);
}
//Delete Service
export const deleteServiceRequest = async (id) => {
  return await axiosInstance.delete(`api/services/${id}`);
}