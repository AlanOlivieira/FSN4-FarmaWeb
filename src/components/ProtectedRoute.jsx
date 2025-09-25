import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children, allowedRoles }) {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!currentUser) {
      navigate("/login-required");
    } else if (allowedRoles && !allowedRoles.includes(currentUser.role)) {
      navigate("/"); 
    }
  }, [currentUser, allowedRoles, navigate]);

  if (!currentUser) return null;
  if (allowedRoles && !allowedRoles.includes(currentUser.role)) return null;

  return children;
}

export default ProtectedRoute;
