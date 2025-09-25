import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedToken = localStorage.getItem("accessToken");

    if (savedUser && savedToken) {
      setCurrentUser(JSON.parse(savedUser));
      api.defaults.headers.common["Authorization"] = `Bearer ${savedToken}`;
    }
    setLoading(false);
  }, []);

  const login = ({ accessToken, refreshToken, user }) => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("user", JSON.stringify(user));

    api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    setCurrentUser(user);

    if (user.role === "admin") navigate("/admin/vendas");
    else if (user.role === "vendedor") navigate("/admin/produtos");
    else navigate("/");
  };

  const logout = async () => {
    try {
      if (currentUser) {
        await api.post("/auth/logout", {
          userId: currentUser.id,
          role: currentUser.role,
        });
      }
    } catch (err) {
      console.error("Erro ao deslogar:", err.response?.data || err.message);
    } finally {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
      delete api.defaults.headers.common["Authorization"];
      setCurrentUser(null);
      navigate("/");
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
