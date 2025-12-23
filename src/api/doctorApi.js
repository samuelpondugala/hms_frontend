import axios from "./axios";

export const createDoctor = (data) => {
  return axios.post("/doctors", data);
};

export const getDoctors = () => {
  return axios.get("/doctors");
};

export const getDoctorById = (email) => {
  return axios.get(`/doctors/${email}`);
};

export const updateDoctor = (email, data) => {
  return axios.put(`/doctors/${email}`, data);
};

export const deleteDoctor = (email) => {
  return axios.delete(`/doctors/${email}`);
};
