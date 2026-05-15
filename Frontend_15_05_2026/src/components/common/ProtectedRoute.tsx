// import { Navigate } from "react-router-dom";

// const ProtectedRoute = ({ children, allowedRoles }: any) => {
//   const token = localStorage.getItem("token");
//   const user = JSON.parse(localStorage.getItem("user") || "{}");

//   if (!token) return <Navigate to="/user/login" replace />;

//   if (allowedRoles && !allowedRoles.includes(user?.role_id)) {
//     return <Navigate to="/user/login" replace />;
//   }

//   return children;
// };

// export default ProtectedRoute;
// import { Navigate } from "react-router-dom";
// import { getDefaultRouteByRole } from "../../utils/redirectByRole";

// const ProtectedRoute = ({ children, allowedRoles }: any) => {
//   const token = localStorage.getItem("token");
//   const user = JSON.parse(localStorage.getItem("user") || "{}");

//   if (!token) return <Navigate to="/user/login" replace />;

//   if (allowedRoles && user?.role_id && !allowedRoles.includes(user.role_id)) {
//     return <Navigate to={getDefaultRouteByRole(user.role_id)} replace />;
//   }
//   return children;
// };

// export default ProtectedRoute;
import { Navigate, useLocation } from "react-router-dom";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  allowedRoles?: number[];
  publicOnly?: boolean; // ✅ NEW (for login page)
};

const ProtectedRoute = ({ children, allowedRoles, publicOnly }: Props) => {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const role = user?.role || user?.role_id;

  if (publicOnly) {
    if (user && role) {
      if (Number(role) === 1) {
        return <Navigate to="/admin/dashboard" replace />;
      }

      if (Number(role) === 2) {
        return <Navigate to="/user/dashboard" replace />;
      }
    }

    return <>{children}</>;
  }

  if (!user || !role) {
    return <Navigate to="/user/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(Number(role))) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
