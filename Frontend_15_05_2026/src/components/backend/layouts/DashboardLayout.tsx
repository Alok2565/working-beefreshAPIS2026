import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";

const DashboardLayout = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const role = user?.role_id ?? 0;

  // ✅ PERSISTED SIDEBAR STATE
  const [isOpen, setIsOpen] = useState(() => {
    const saved = localStorage.getItem("sidebar");

    if (saved) return saved === "open";

    return true; // default = OPEN
  });

  // ✅ TOGGLE WITH STORAGE
  const toggleSidebar = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    localStorage.setItem("sidebar", newState ? "open" : "closed");
  };

  return (
    <div className="d-flex flex-column vh-100">
      {/* HEADER */}
      <div className="sticky-top">
        <Header toggleSidebar={toggleSidebar} />
      </div>
      <div className="d-flex flex-grow-1 overflow-hidden">
        {/* SIDEBAR */}
        <Sidebar role={role} isOpen={isOpen} />

        {/* RIGHT SIDE */}
        <div className="flex-grow-1 d-flex flex-column">
          {/* SCROLLABLE CONTENT */}
          <main className="flex-grow-1 overflow-auto p-3 dashboard-content">
            <Outlet />
          </main>

          {/* FOOTER */}
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;

// import Header from "./Header";
// import Sidebar from "./Sidebar";
// import Footer from "./Footer";
// import { getUser } from "../../../utils/auth";
// import { useState } from "react";

// const DashboardLayout = () => {
//   const [isOpen, setIsOpen] = useState(true);
//   const user = getUser();

//   return (
//     <div className="d-flex flex-column vh-100">
//       <Header toggleSidebar={() => setIsOpen(!isOpen)} />

//       <div className="d-flex flex-grow-1">
//         <Sidebar role={user.role_id} isOpen={isOpen} />

//         <div className="flex-grow-1 d-flex flex-column">
//           <main className="flex-grow-1 p-3">
//             <Outlet />
//           </main>
//           <Footer />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashboardLayout;
