// import { useState, useRef, useEffect } from "react";
// import "../../../assets/css/sidebar.css";
// import { Link, useLocation } from "react-router-dom";
// import { sidebarConfig } from "../../../utils/roleConfig";
// import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

// type Props = {
//   role: number;
//   isOpen: boolean;
// };

// const Sidebar: React.FC<Props> = ({ role, isOpen }) => {
//   const location = useLocation();
//   const menus = sidebarConfig[role] || [];

//   const [openMenu, setOpenMenu] = useState<string | null>(null);

//   return (
//     <div className={`custom-sidebar-nav ${isOpen ? "open" : "collapsed"}`}>
//       <ul className="nav flex-column mt-3">
//         {menus.map((item) => {
//           const Icon = item.icon;
//           const hasChildren = (item.children?.length ?? 0) > 0;
//           const isOpenMenu = openMenu === item.name;
//           const isActive = location.pathname.startsWith(item.path);

//           const submenuRef = useRef<HTMLUListElement | null>(null);
//           const [height, setHeight] = useState(0);

//           useEffect(() => {
//             if (submenuRef.current) {
//               setHeight(isOpenMenu ? submenuRef.current.scrollHeight : 0);
//             }
//           }, [isOpenMenu]);

//           return (
//             <li key={item.name} className="nav-item">
//               <Link
//                 to={item.path || "#"}
//                 onClick={(e) => {
//                   if (hasChildren) {
//                     e.preventDefault();
//                     setOpenMenu(isOpenMenu ? null : item.name);
//                   }
//                 }}
//                 className={`nav-link d-flex align-items-center justify-content-between ${
//                   isActive ? "bg-light text-dark fw-bold" : "text-white"
//                 }`}
//                 style={{ padding: "10px" }}
//               >
//                 <span className="d-flex align-items-center gap-2">
//                   <Icon />
//                   {isOpen && <span>{item.name}</span>}
//                 </span>

//                 {hasChildren && isOpen && (
//                   <span
//                     style={{
//                       transform: isOpenMenu ? "rotate(180deg)" : "rotate(0deg)",
//                       transition: "0.3s",
//                     }}
//                   >
//                     <MdKeyboardArrowDown />
//                   </span>
//                 )}
//               </Link>

//               {/* SUBMENU */}
//               {hasChildren && isOpen && (
//                 <div
//                   style={{
//                     height,
//                     overflow: "hidden",
//                     transition: "height 0.3s ease",
//                   }}
//                 >
//                   <ul ref={submenuRef} className="nav flex-column ms-4">
//                     {item.children?.map((child) => {
//                       const ChildIcon = child.icon;
//                       const isChildActive = location.pathname.startsWith(
//                         child.path,
//                       );

//                       return (
//                         <li key={child.path}>
//                           <Link
//                             to={child.path}
//                             className={`nav-link d-flex align-items-center gap-2 ${
//                               isChildActive ? "text-light" : "text-dark"
//                             }`}
//                           >
//                             <ChildIcon />
//                             {isOpen && <span>{child.name}</span>}
//                           </Link>
//                         </li>
//                       );
//                     })}
//                   </ul>
//                 </div>
//               )}
//             </li>
//           );
//         })}
//       </ul>
//     </div>
//   );
// };

// export default Sidebar;

import { useState, useRef, useEffect } from "react";
import "../../../assets/css/sidebar.css";
import { Link, useLocation } from "react-router-dom";
import { MdKeyboardArrowDown } from "react-icons/md";
import { adminMenu, type Menu } from "../../../config/menuConfig";
import { hasPermission } from "../../../utils/roleConfig";

type Props = {
  role: number;
  isOpen: boolean;
};

const Sidebar: React.FC<Props> = ({ role, isOpen }) => {
  const location = useLocation();
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const permissions: string[] = user.permissions || [];

  // ✅ FIX 1: get role-based menu
  const menus: Menu[] = adminMenu[role] || [];

  // refs
  const submenuRefs = useRef<Record<string, HTMLUListElement | null>>({});
  const [heights, setHeights] = useState<Record<string, number>>({});

  useEffect(() => {
    const newHeights: Record<string, number> = {};

    menus.forEach((item) => {
      const el = submenuRefs.current[item.name];
      const isOpenMenu = openMenu === item.name;

      if (el) {
        newHeights[item.name] = isOpenMenu ? el.scrollHeight : 0;
      }
    });

    setHeights(newHeights);
  }, [openMenu, menus]);

  return (
    <div className={`custom-sidebar-nav ${isOpen ? "open" : "collapsed"}`}>
      <ul className="nav flex-column mt-3">
        {/* ✅ FIX 2: use role-based menus */}
        {menus.map((item) => {
          const Icon = item.icon;
          const hasChildren = !!item.children?.length;
          const isOpenMenu = openMenu === item.name;
          const isActive = location.pathname.startsWith(item.path);

          if (!hasPermission(permissions, item.permission)) return null;

          return (
            <li key={item.name} className="nav-item">
              {/* MAIN MENU */}
              <Link
                to={item.path === "#" ? "#" : item.path}
                onClick={(e) => {
                  if (hasChildren) {
                    e.preventDefault();
                    setOpenMenu(isOpenMenu ? null : item.name);
                  }
                }}
                className={`nav-link d-flex align-items-center justify-content-between ${
                  isActive ? "active" : ""
                }`}
              >
                <span className="d-flex align-items-center gap-2">
                  <span className="sidebar-icon">
                    <Icon />
                  </span>
                  <span className="sidebar-text">{item.name}</span>
                </span>

                {hasChildren && (
                  <span className={`arrow ${isOpenMenu ? "open" : ""}`}>
                    <MdKeyboardArrowDown />
                  </span>
                )}
              </Link>

              {/* SUBMENU */}
              {hasChildren && (
                <div
                  className="submenu-wrapper"
                  style={{ height: heights[item.name] || 0 }}
                >
                  <ul
                    ref={(el) => {
                      submenuRefs.current[item.name] = el;
                    }}
                    className="nav flex-column ms-4"
                  >
                    {item.children
                      ?.filter((child) =>
                        hasPermission(permissions, child.permission),
                      )
                      .map((child) => {
                        const ChildIcon = child.icon;
                        const isChildActive = location.pathname.startsWith(
                          child.path,
                        );

                        return (
                          <li key={child.path}>
                            <Link
                              to={child.path}
                              className={`nav-link d-flex align-items-center gap-2 ${
                                isChildActive ? "active" : ""
                              }`}
                            >
                              <ChildIcon />
                              <span className="sidebar-text">{child.name}</span>
                            </Link>
                          </li>
                        );
                      })}
                  </ul>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;

// import { useState } from "react";
// import { Link, useLocation } from "react-router-dom";
// import { MdKeyboardArrowDown } from "react-icons/md";
// import { adminMenu, type Menu } from "../../../config/menuConfig";
// import { hasPermission } from "../../../utils/roleConfig";

// const Sidebar = () => {
//   const location = useLocation();
//   const [openMenu, setOpenMenu] = useState<string | null>(null);

//   const user = JSON.parse(localStorage.getItem("user") || "{}");
//   const permissions: string[] = user.permissions || [];

//   return (
//     <div className="custom-sidebar-nav">
//       <ul className="nav flex-column mt-3">
//         {adminMenu.map((item: Menu) => {
//           const Icon = item.icon;
//           const hasChildren = !!item.children?.length;
//           const isOpen = openMenu === item.name;

//           if (!hasPermission(permissions, item.permission)) return null;

//           return (
//             <li key={item.name}>
//               <Link
//                 to={item.path}
//                 onClick={(e) => {
//                   if (hasChildren) {
//                     e.preventDefault();
//                     setOpenMenu(isOpen ? null : item.name);
//                   }
//                 }}
//                 className={`nav-link d-flex justify-content-between ${
//                   location.pathname.startsWith(item.path) ? "active" : ""
//                 }`}
//               >
//                 <span className="d-flex gap-2 align-items-center">
//                   <Icon />
//                   {item.name}
//                 </span>

//                 {hasChildren && <MdKeyboardArrowDown />}
//               </Link>

//               {hasChildren && isOpen && (
//                 <ul className="ms-3">
//                   {item.children?.map((child: Menu) => {
//                     if (!hasPermission(permissions, child.permission))
//                       return null;

//                     const ChildIcon = child.icon;

//                     return (
//                       <li key={child.path}>
//                         <Link
//                           to={child.path}
//                           className={`nav-link ${
//                             location.pathname.startsWith(child.path)
//                               ? "active"
//                               : ""
//                           }`}
//                         >
//                           <ChildIcon /> {child.name}
//                         </Link>
//                       </li>
//                     );
//                   })}
//                 </ul>
//               )}
//             </li>
//           );
//         })}
//       </ul>
//     </div>
//   );
// };

// export default Sidebar;
