/* =======================
   TOKEN HELPERS
======================= */

export const getToken = () => {
  return localStorage.getItem("token");
};

export const setToken = (token) => {
  localStorage.setItem("token", token);
};

export const removeToken = () => {
  localStorage.removeItem("token");
};

/* =======================
   AUTH CHECKS
======================= */

export const isAuthenticated = () => {
  return !!getToken();
};

/* =======================
   ROLE HELPERS
======================= */

export const hasRole = (user, role) => {
  if (!user) return false;
  return user.role === role;
};

export const hasAnyRole = (user, roles = []) => {
  if (!user) return false;
  return roles.includes(user.role);
};
