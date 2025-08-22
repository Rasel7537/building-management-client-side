// import React from "react";
// import UseAuth from "../hooks/UseAuth";
// import { Navigate } from "react-router";

// const privateRoutes = ({ children }) => {
//   const { user, loading } = UseAuth();
//   if (loading) {
//     return <span className="loading loading-ring loading-xl"></span>;
//   }

//   if (!user) {
//     <Navigate to={"/login"}></Navigate>;
//   }

//   return children;
// };

// export default privateRoutes;




import React from "react";
import UseAuth from "../hooks/UseAuth";
import { Navigate } from "react-router-dom"; // ✅ use react-router-dom, not just react-router

const PrivateRoutes = ({ children }) => {
  const { user, loading } = UseAuth();
  console.log(loading);
  if (loading) {
    return <span className="loading loading-ring loading-xl"></span>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoutes;
