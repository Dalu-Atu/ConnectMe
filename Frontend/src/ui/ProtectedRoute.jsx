import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { cloneElement } from "react";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoadingUser, user } = useAuth();
  console.log(user);

  if (isLoadingUser) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // 🔥 inject the fetched user prop into the child
  return cloneElement(children, { user });
};

export default ProtectedRoute;
