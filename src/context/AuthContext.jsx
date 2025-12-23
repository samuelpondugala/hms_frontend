import { useEffect, useState } from "react";
import { AuthContext } from "./AuthProvider";
import { loginUser, getProfile } from "../api/authApi";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  /* =======================
     LOAD USER ON REFRESH
  ======================= */
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return;
    }

    getProfile()
      .then((res) => {
        setUser({
          email: res.data._id,
          name: res.data.name,
          role: res.data.role
        });
      })
      .catch(() => {
        localStorage.clear();
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  /* =======================
     LOGIN
  ======================= */
  const login = async (data) => {
    const res = await loginUser(data);
    localStorage.setItem("token", res.data.token);

    setUser({
      email: data.email,
      name: res.data.name,
      role: res.data.role
    });
  };

  /* =======================
     LOGOUT
  ======================= */
  const logout = () => {
    localStorage.clear();
    setUser(null);
    

  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
