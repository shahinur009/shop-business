import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../provider/useAuth";

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) {
    return <p>loading ..............</p>
  }

  

  if (user) {
    return children;
  }

  return (
    <Navigate to={"/"} state={{ from: location }} replace></Navigate>
  );
};

export default PrivateRoute;