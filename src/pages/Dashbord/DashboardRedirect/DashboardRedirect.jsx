import { Navigate } from "react-router-dom";

const DashboardRedirect = () => {
  return <Navigate to="/dashboard/myProfile" replace />;
};

export default DashboardRedirect;