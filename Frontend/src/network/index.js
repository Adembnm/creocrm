import axios from "axios";
import { requestHandler, successHandler, errorHandler } from "./interceptors";

//const myBaseUrl = "http://128.199.32.128/";
//const myBaseUrl = "http://localhost:3000/";

//add your BASE_URL
const token = localStorage.getItem("token");
export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
    "Accept-Language": "en",
    Authorization: `Bearer ${token}`,
  },
});

// Handle request process
axiosInstance.interceptors.request.use((request) => requestHandler(request));
// Handle response process
axiosInstance.interceptors.response.use(
  (response) => successHandler(response),
  (error) => errorHandler(error)
);
