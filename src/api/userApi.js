import axios from "./axios";

export const getAllUsers = () => {
  return axios.get("/users");
};

export const updateUser = (email, data) => {
  return axios.put(`/users/${email}`, data);
};

export const deleteUser = (email) => {
  return axios.delete(`/users/${email}`);
};
