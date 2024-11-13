import { Navigate } from "react-router-dom";
import { useAuth } from "../provider/useAuth";


// eslint-disable-next-line react/prop-types
const PublicPage = ({ children }) => {
  const { user } = useAuth();

  if (user) {
    // Redirect to the homepage or any other protected route if the user is logged in
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default PublicPage;
