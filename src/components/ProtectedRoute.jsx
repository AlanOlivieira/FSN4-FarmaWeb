// components/ProtectedRoute.jsx
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!currentUser) {
      navigate('/login-required');
    }
  }, [currentUser, navigate]);

  return currentUser ? children : null;
}

export default ProtectedRoute;