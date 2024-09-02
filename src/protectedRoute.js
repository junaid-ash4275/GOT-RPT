// ProtectedRoute.js
import { useSelector } from "react-redux";
import { Route, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const ProtectedRoute = ({ children, ...rest }) => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const navigate = useNavigate();

  if (!isLoggedIn) {
    navigate("/login");
    return null; // Prevent rendering anything until logged in
  }

  return <Route {...rest}>{children}</Route>;
};
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired, // Validate 'children' prop
};
export default ProtectedRoute;

// import React from "react";
// import { useSelector } from "react-redux";
// import { Navigate } from "react-router-dom";
// import PropTypes from "prop-types";

// const ProtectedRoutes = ({ children }) => {
//
//   const isUserLoggedIn = useSelector((state) => state.user.isUserLoggedIn);
//   return isUserLoggedIn ? children : <Navigate to="/authentication/sign-in" />;
// };

// export default ProtectedRoutes;
