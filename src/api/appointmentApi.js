import axios from "./axios";

export const createAppointment = (data) => {
  return axios.post("/appointments", data);
};

export const getAppointments = () => {
  return axios.get("/appointments");
};

export const getAppointmentById = (id) => {
  return axios.get(`/appointments/${id}`);
};

export const updateAppointment = (id, data) => {
  return axios.put(`/appointments/${id}`, data);
};

export const deleteAppointment = (id) => {
  return axios.delete(`/appointments/${id}`);
};
