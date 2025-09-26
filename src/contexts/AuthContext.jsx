import React, { createContext, useContext, useState, useEffect } from "react";
import api, { setAuthToken } from "../services/api";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [accessToken, setAccessTokenState] = useState(null);
  const [refreshToken, setRefreshTokenState] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedAccess = localStorage.getItem("accessToken");
    const storedRefresh = localStorage.getItem("refreshToken");

    if (storedUser && storedAccess && storedRefresh) {
      setCurrentUser(JSON.parse(storedUser));
      setAccessTokenState(storedAccess);
      setRefreshTokenState(storedRefresh);
      setAuthToken(storedAccess);
    }
    setLoading(false);
  }, []);

  const register = async (userData) => {
    try {
      const res = await api.post("/auth/cadastro-cliente", userData);
      const { accessToken, refreshToken, user } = res.data;

      setCurrentUser(user);
      setAccessTokenState(accessToken);
      setRefreshTokenState(refreshToken);

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      setAuthToken(accessToken);

      return user;
    } catch (err) {
      throw new Error(err.response?.data?.error || "Erro no cadastro");
    }
  };

  const login = async (email, password, role="admin") => {
    try {
      const res = await api.post("../auth/login", {
        email,
        password,
        role,
      });
      const { accessToken, refreshToken, user } = res.data;

      setCurrentUser(user);
      setAccessTokenState(accessToken);
      setRefreshTokenState(refreshToken);

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      setAuthToken(accessToken);

      return user;
    } catch (err) {
      throw new Error(err.response?.data?.error || "Email ou senha inválidos");
    }
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (err) {
      console.error("Erro no logout:", err);
    } finally {
      setCurrentUser(null);
      setAccessTokenState(null);
      setRefreshTokenState(null);

      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      setAuthToken(null);
    }
  };

  const value = {
    currentUser,
    accessToken,
    refreshToken,
    register,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
