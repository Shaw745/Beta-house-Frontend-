import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token"); // check if logged in
  return token ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
