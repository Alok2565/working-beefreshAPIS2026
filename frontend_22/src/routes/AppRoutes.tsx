import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../components/common/ProtectedRoute";

import AdminDashboard from "../pages/backend/AdminDashboard";
import CustomerDashboard from "../pages/customer/CustomerDashboard";
import Orders from "../pages/customer/Orders";

import { ROLE } from "../utils/roleConfig";
import DashboardLayout from "../components/backend/layouts/DashboardLayout";

const AppRoutes = () => {
  return (
    <Routes>
      {/* ADMIN */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={[ROLE.ADMIN]}>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<AdminDashboard />} />
      </Route>

      {/* CUSTOMER */}
      <Route
        path="/customer"
        element={
          <ProtectedRoute allowedRoles={[ROLE.USER]}>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<CustomerDashboard />} />
        <Route path="dashboard/orders" element={<Orders />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
