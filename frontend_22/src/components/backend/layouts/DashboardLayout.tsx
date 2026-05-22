import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";

const DashboardLayout = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const role = user?.role_id ?? 0;
  const [isOpen, setIsOpen] = useState(() => {
    const saved = localStorage.getItem("sidebar");

    if (saved) return saved === "open";

    return true;
  });

  const toggleSidebar = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    localStorage.setItem("sidebar", newState ? "open" : "closed");
  };

  return (
    <div className="d-flex flex-column vh-100">
      <div className="sticky-top">
        <Header toggleSidebar={toggleSidebar} />
      </div>
      <div className="d-flex flex-grow-1 overflow-hidden">
        <Sidebar role={role} isOpen={isOpen} />
        <div className="flex-grow-1 d-flex flex-column">
          <main className="flex-grow-1 overflow-auto p-3 dashboard-content">
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
