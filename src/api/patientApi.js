import axios from "./axios";

export const createPatient = (data) => {
  return axios.post("/patients", data);
};

export const getPatients = () => {
  return axios.get("/patients");
};

export const getPatientById = (email) => {
  return axios.get(`/patients/${email}`);
};

export const updatePatient = (email, data) => {
  return axios.put(`/patients/${email}`, data);
};

export const deletePatient = (email) => {
  return axios.delete(`/patients/${email}`);
};
