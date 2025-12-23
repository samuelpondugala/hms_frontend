import axios from "./axios";

export const createPrescription = (data) => {
  return axios.post("/prescriptions", data);
};

export const getPrescriptionsByPatient = (email) => {
  return axios.get(`/prescriptions/patient/${email}`);
};

export const getPrescriptionsByDoctor = (email) => {
  return axios.get(`/prescriptions/doctor/${email}`);
};
export const getPatientsForDoctor = (doctorEmail) =>{
  return axios.get(`/prescriptions/doctor/${doctorEmail}/patients`);
}


