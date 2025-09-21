// contexts/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar se há usuário logado no localStorage ao carregar
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (user) {
      setCurrentUser(user);
    }
    setLoading(false);
  }, []);

  const register = (userData) => {
    // Simular registro - em uma aplicação real, isso faria uma chamada API
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Verificar se o email já existe
    if (users.find(u => u.email === userData.email)) {
      throw new Error('Email já cadastrado');
    }
    
    const newUser = {
      ...userData,
      id: Date.now(),
      dataRegistro: new Date().toISOString(),
      historicoCompras: []
    };
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    // Fazer login automaticamente após o registro
    setCurrentUser(newUser);
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    
    return newUser;
  };

  const login = (email, password) => {
    // Simular login - em uma aplicação real, isso faria uma chamada API
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
      throw new Error('Email ou senha inválidos');
    }
    
    setCurrentUser(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
    
    return user;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  const updateUser = (updatedData) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const updatedUsers = users.map(u => 
      u.id === currentUser.id ? { ...u, ...updatedData } : u
    );
    
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    
    const updatedUser = { ...currentUser, ...updatedData };
    setCurrentUser(updatedUser);
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
  };

  const addPurchaseToHistory = (compra) => {
    if (!currentUser) return;
    
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const updatedUsers = users.map(u => {
      if (u.id === currentUser.id) {
        return {
          ...u,
          historicoCompras: [...u.historicoCompras, compra]
        };
      }
      return u;
    });
    
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    
    const updatedUser = {
      ...currentUser,
      historicoCompras: [...currentUser.historicoCompras, compra]
    };
    
    setCurrentUser(updatedUser);
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
  };

  const value = {
    currentUser,
    register,
    login,
    logout,
    updateUser,
    addPurchaseToHistory
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}