
// import { Navigate, useLocation } from "react-router-dom";
// import type { ReactNode } from "react";

// type Props = {
//   children: ReactNode;
//   allowedRoles?: number[];
//   publicOnly?: boolean; // ✅ NEW (for login page)
// };

// const ProtectedRoute = ({ children, allowedRoles, publicOnly }: Props) => {
//   const location = useLocation();
//   const user = JSON.parse(localStorage.getItem("user") || "{}");

//   const role = user?.role || user?.role_id;

//   if (publicOnly) {
//     if (user && role) {
//       if (Number(role) === 1) {
//         return <Navigate to="/admin/dashboard" replace />;
//       }

//       if (Number(role) === 2) {
//         return <Navigate to="/user/dashboard" replace />;
//       }
//     }

//     return <>{children}</>;
//   }

//   if (!user || !role) {
//     return <Navigate to="/user/login" state={{ from: location }} replace />;
//   }

//   if (allowedRoles && !allowedRoles.includes(Number(role))) {
//     return <Navigate to="/unauthorized" replace />;
//   }

//   return <>{children}</>;
// };

// export default ProtectedRoute;

// ProtectedRoute.tsx

import { Navigate, useLocation } from "react-router-dom";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  allowedRoles?: number[];
  publicOnly?: boolean;
};

const ProtectedRoute = ({
  children,
  allowedRoles,
  publicOnly,
}: Props) => {
  const location = useLocation();

  // GET USER FROM LOCAL STORAGE
  const storedUser = localStorage.getItem("user");

  const user = storedUser ? JSON.parse(storedUser) : null;

  // ROLE
  const role = Number(user?.role || user?.role_id);

  // ================= PUBLIC ONLY ROUTES =================
  // LOGIN / REGISTER PAGE

  if (publicOnly) {
    if (user && role) {
      // ADMIN
      if (role === 1) {
        return <Navigate to="/admin/dashboard" replace />;
      }

      // USER
      if (role === 2) {
        return <Navigate to="/user/dashboard" replace />;
      }
    }

    return <>{children}</>;
  }

  // ================= NOT LOGGED IN =================

  if (!user || !role) {
    return <Navigate to="/user/login" state={{ from: location }} replace />;
  }

  // ================= ROLE CHECK =================

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // ================= ALLOW =================

  return <>{children}</>;
};

export default ProtectedRoute;