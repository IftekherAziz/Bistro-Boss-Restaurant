import { useContext } from "react";
import { AuthContext } from "../providers/AuthProviders";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  // Set loading state
  if (loading) {
    return (
      /*  <div className="flex justify-center text-center pt-20 ">
        <progress className="progress w-56 mt-12"></progress>
      </div> */
      
      // If user is not logged in and try to access private route then redirect to login
      <Navigate to="/login"></Navigate>
    );
  }
  // Check if user is logged in
  if (user) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;


};

export default PrivateRoute;
