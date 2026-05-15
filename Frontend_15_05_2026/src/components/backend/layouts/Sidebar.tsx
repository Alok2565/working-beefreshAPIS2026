import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { MdKeyboardArrowDown } from "react-icons/md";
import { adminMenu, type Menu } from "../../../config/menuConfig";
import { hasPermission } from "../../../utils/roleConfig";
import "../../../assets/css/sidebar.css";

type Props = {
  role: number;
  isOpen: boolean;
};

const Sidebar: React.FC<Props> = ({ role, isOpen }) => {
  const location = useLocation();

  // Main Menu State
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});

  // Child Menu State
  const [openChildMenus, setOpenChildMenus] = useState<Record<string, boolean>>(
    {},
  );

  const [heights, setHeights] = useState<Record<string, number>>({});

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const permissions: string[] = user.permissions || [];

  const menus: Menu[] = adminMenu[role] || [];

  const submenuRefs = useRef<Record<string, HTMLUListElement | null>>({});

  // Main Menu Toggle
  const toggleMenu = (name: string) => {
    setOpenMenus((prev) => {
      const isCurrentlyOpen = prev[name];

      return isCurrentlyOpen ? {} : { [name]: true };
    });

    // Auto close child menus
    setOpenChildMenus({});
  };

  // Child Menu Toggle
  const toggleChildMenu = (name: string) => {
    setOpenChildMenus((prev) => {
      const isCurrentlyOpen = prev[name];

      return isCurrentlyOpen ? {} : { [name]: true };
    });
  };

  // Dynamic Height
  useEffect(() => {
    const calculateHeights = () => {
      const newHeights: Record<string, number> = {};

      Object.keys(submenuRefs.current).forEach((key) => {
        const el = submenuRefs.current[key];

        if (el) {
          const isOpenMain = openMenus[key];
          const isOpenChild = openChildMenus[key];

          newHeights[key] = isOpenMain || isOpenChild ? el.scrollHeight : 0;
        }
      });

      setHeights(newHeights);
    };

    calculateHeights();

    const timer = setTimeout(calculateHeights, 310);

    return () => clearTimeout(timer);
  }, [openMenus, openChildMenus]);

  return (
    <div className={`custom-sidebar-nav ${isOpen ? "open" : "collapsed"}`}>
      <ul className="nav flex-column mt-3 mb-3">
        {menus.map((item) => {
          if (!hasPermission(permissions, item.permission)) return null;

          const hasChildren = !!item.children?.length;

          const isMenuOpen = !!openMenus[item.name];

          const isActive = location.pathname.startsWith(item.path);

          return (
            <li key={item.name} className="nav-item">
              <Link
                to={item.path === "#" ? "#" : item.path}
                data-title={item.name}
                onClick={(e) => {
                  if (hasChildren) {
                    e.preventDefault();
                    toggleMenu(item.name);
                  }
                }}
                className={`nav-link d-flex align-items-center justify-content-between ${
                  isActive ? "active" : ""
                }`}
              >
                <span className="d-flex align-items-center gap-2">
                  <span className="sidebar-icon">
                    <item.icon size={20} />
                  </span>

                  <span className="sidebar-text">{item.name}</span>
                </span>

                {hasChildren && isOpen && (
                  <span className={`arrow ${isMenuOpen ? "open" : ""}`}>
                    <MdKeyboardArrowDown />
                  </span>
                )}
              </Link>

              {hasChildren && isOpen && (
                <div
                  className="submenu-wrapper"
                  style={{
                    height: heights[item.name] || 0,
                    overflow: "hidden",
                    transition: "height 0.3s ease",
                  }}
                >
                  <ul
                    ref={(el) => {
                      submenuRefs.current[item.name] = el;
                    }}
                    className="nav flex-column ms-3"
                  >
                    {item.children?.map((child) => {
                      if (!hasPermission(permissions, child.permission))
                        return null;

                      const hasNested = !!child.nested_children?.length;

                      const isNestedOpen = !!openChildMenus[child.name];

                      return (
                        <li key={child.name} className="nav-item">
                          <Link
                            to={child.path === "#" ? "#" : child.path}
                            onClick={(e) => {
                              if (hasNested) {
                                e.preventDefault();
                                toggleChildMenu(child.name);
                              }
                            }}
                            className={`nav-link d-flex align-items-center justify-content-between ${
                              location.pathname === child.path ? "active" : ""
                            }`}
                          >
                            <span className="d-flex align-items-center gap-2">
                              <child.icon />

                              <span className="sidebar-text">{child.name}</span>
                            </span>

                            {hasNested && (
                              <span
                                className={`arrow ${
                                  isNestedOpen ? "open" : ""
                                }`}
                              >
                                <MdKeyboardArrowDown />
                              </span>
                            )}
                          </Link>

                          {hasNested && (
                            <div
                              className="submenu-wrapper"
                              style={{
                                height: heights[child.name] || 0,
                                overflow: "hidden",
                                transition: "height 0.3s ease",
                              }}
                            >
                              <ul
                                ref={(el) => {
                                  submenuRefs.current[child.name] = el;
                                }}
                                className="nav flex-column ms-3 border-start-custom"
                              >
                                {child.nested_children?.map((nested) => (
                                  <li key={nested.path}>
                                    <Link
                                      to={nested.path}
                                      className={`nav-link d-flex align-items-center gap-2 ${
                                        location.pathname === nested.path
                                          ? "active"
                                          : ""
                                      }`}
                                    >
                                      <nested.icon />

                                      <span className="sidebar-text">
                                        {nested.name}
                                      </span>
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
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
// import React, { useState, useRef, useEffect } from "react";
// import { Link, useLocation } from "react-router-dom";
// import { MdKeyboardArrowDown } from "react-icons/md";
// import { adminMenu, type Menu } from "../../../config/menuConfig";
// import { hasPermission } from "../../../utils/roleConfig";
// import "../../../assets/css/sidebar.css";

// type Props = {
//   role: number;
//   isOpen: boolean;
// };

// const Sidebar: React.FC<Props> = ({ role, isOpen }) => {
//   const location = useLocation();
//   const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});
//   const [heights, setHeights] = useState<Record<string, number>>({});

//   const user = JSON.parse(localStorage.getItem("user") || "{}");
//   const permissions: string[] = user.permissions || [];
//   const menus: Menu[] = adminMenu[role] || [];

//   const submenuRefs = useRef<Record<string, HTMLUListElement | null>>({});

//   // const toggleMenu = (name: string) => {
//   //   setOpenMenus((prev) => ({ ...prev, [name]: !prev[name] }));
//   // };
//   const toggleMenu = (name: string) => {
//     setOpenMenus((prev) => ({
//       [name]: !prev[name], // only keep current menu open
//     }));
//   };
//   useEffect(() => {
//     const calculateHeights = () => {
//       const newHeights: Record<string, number> = {};
//       Object.keys(submenuRefs.current).forEach((key) => {
//         const el = submenuRefs.current[key];
//         if (el) {
//           newHeights[key] = openMenus[key] ? el.scrollHeight : 0;
//         }
//       });
//       setHeights(newHeights);
//     };

//     calculateHeights();
//     const timer = setTimeout(calculateHeights, 310);
//     return () => clearTimeout(timer);
//   }, [openMenus]);

//   return (
//     <div className={`custom-sidebar-nav ${isOpen ? "open" : "collapsed"}`}>
//       <ul className="nav flex-column mt-3">
//         {menus.map((item) => {
//           if (!hasPermission(permissions, item.permission)) return null;

//           const hasChildren = !!item.children?.length;
//           const isMenuOpen = !!openMenus[item.name];
//           const isActive = location.pathname.startsWith(item.path);

//           return (
//             <li key={item.name} className="nav-item">
//               <Link
//                 to={item.path === "#" ? "#" : item.path}
//                 data-title={item.name}
//                 onClick={(e) => {
//                   if (hasChildren) {
//                     e.preventDefault();
//                     toggleMenu(item.name);
//                   }
//                 }}
//                 className={`nav-link d-flex align-items-center justify-content-between ${isActive ? "active" : ""}`}
//               >
//                 <span className="d-flex align-items-center gap-2">
//                   <span className="sidebar-icon">
//                     <item.icon size={20} />
//                   </span>
//                   <span className="sidebar-text">{item.name}</span>
//                 </span>
//                 {hasChildren && isOpen && (
//                   <span className={`arrow ${isMenuOpen ? "open" : ""}`}>
//                     <MdKeyboardArrowDown />
//                   </span>
//                 )}
//               </Link>

//               {hasChildren && isOpen && (
//                 <div
//                   className="submenu-wrapper"
//                   style={{ height: heights[item.name] || 0 }}
//                 >
//                   <ul
//                     ref={(el) => {
//                       submenuRefs.current[item.name] = el;
//                     }}
//                     className="nav flex-column ms-3"
//                   >
//                     {item.children?.map((child) => {
//                       if (!hasPermission(permissions, child.permission))
//                         return null;
//                       const hasNested = !!child.nested_children?.length;
//                       const isNestedOpen = !!openMenus[child.name];

//                       return (
//                         <li key={child.name} className="nav-item">
//                           <Link
//                             to={child.path === "#" ? "#" : child.path}
//                             onClick={(e) => {
//                               if (hasNested) {
//                                 e.preventDefault();
//                                 toggleMenu(child.name);
//                               }
//                             }}
//                             className="nav-link d-flex align-items-center justify-content-between"
//                           >
//                             <span className="d-flex align-items-center gap-2">
//                               <child.icon />
//                               <span className="sidebar-text">{child.name}</span>
//                             </span>
//                             {hasNested && (
//                               <span
//                                 className={`arrow ${isNestedOpen ? "open" : ""}`}
//                               >
//                                 <MdKeyboardArrowDown />
//                               </span>
//                             )}
//                           </Link>

//                           {hasNested && (
//                             <div
//                               className="submenu-wrapper"
//                               style={{ height: heights[child.name] || 0 }}
//                             >
//                               <ul
//                                 ref={(el) => {
//                                   submenuRefs.current[child.name] = el;
//                                 }}
//                                 className="nav flex-column ms-3 border-start-custom"
//                               >
//                                 {child.nested_children?.map((nested) => (
//                                   <li key={nested.path}>
//                                     <Link
//                                       to={nested.path}
//                                       className="nav-link d-flex align-items-center gap-2"
//                                     >
//                                       <nested.icon />
//                                       <span className="sidebar-text">
//                                         {nested.name}
//                                       </span>
//                                     </Link>
//                                   </li>
//                                 ))}
//                               </ul>
//                             </div>
//                           )}
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

// // import { useState, useRef, useEffect } from "react";
// import "../../../assets/css/sidebar.css";
// import { Link, useLocation } from "react-router-dom";
// import { MdKeyboardArrowDown } from "react-icons/md";
// import { adminMenu, type Menu } from "../../../config/menuConfig";
// import { hasPermission } from "../../../utils/roleConfig";

// type Props = {
//   role: number;
//   isOpen: boolean;
// };

// const Sidebar: React.FC<Props> = ({ role, isOpen }) => {
//   const location = useLocation();
//   const [openMenu, setOpenMenu] = useState<string | null>(null);

//   const user = JSON.parse(localStorage.getItem("user") || "{}");
//   const permissions: string[] = user.permissions || [];

//   // ✅ FIX 1: get role-based menu
//   const menus: Menu[] = adminMenu[role] || [];

//   // refs
//   const submenuRefs = useRef<Record<string, HTMLUListElement | null>>({});
//   const [heights, setHeights] = useState<Record<string, number>>({});

//   useEffect(() => {
//     const newHeights: Record<string, number> = {};

//     menus.forEach((item) => {
//       const el = submenuRefs.current[item.name];
//       const isOpenMenu = openMenu === item.name;

//       if (el) {
//         newHeights[item.name] = isOpenMenu ? el.scrollHeight : 0;
//       }
//     });

//     setHeights(newHeights);
//   }, [openMenu, menus]);

//   return (
//     <div className={`custom-sidebar-nav ${isOpen ? "open" : "collapsed"}`}>
//       <ul className="nav flex-column mt-3">
//         {menus.map((item) => {
//           const Icon = item.icon;
//           const hasChildren = !!item.children?.length;
//           const isOpenMenu = openMenu === item.name;
//           const isActive = location.pathname.startsWith(item.path);

//           if (!hasPermission(permissions, item.permission)) return null;

//           return (
//             <li key={item.name} className="nav-item">
//               <Link
//                 to={item.path === "#" ? "#" : item.path}
//                 onClick={(e) => {
//                   if (hasChildren) {
//                     e.preventDefault();
//                     setOpenMenu(isOpenMenu ? null : item.name);
//                   }
//                 }}
//                 className={`nav-link d-flex align-items-center justify-content-between ${
//                   isActive ? "active" : ""
//                 }`}
//               >
//                 <span className="d-flex align-items-center gap-2">
//                   <span className="sidebar-icon">
//                     <Icon />
//                   </span>
//                   <span className="sidebar-text">{item.name}</span>
//                 </span>

//                 {hasChildren && (
//                   <span className={`arrow ${isOpenMenu ? "open" : ""}`}>
//                     <MdKeyboardArrowDown />
//                   </span>
//                 )}
//               </Link>

//               {hasChildren && (
//                 <div
//                   className="submenu-wrapper"
//                   style={{ height: heights[item.name] || 0 }}
//                 >
//                   <ul
//                     ref={(el) => {
//                       submenuRefs.current[item.name] = el;
//                     }}
//                     className="nav flex-column ms-4"
//                   >
//                     {item.children
//                       ?.filter((child) =>
//                         hasPermission(permissions, child.permission),
//                       )
//                       .map((child) => {
//                         const ChildIcon = child.icon;
//                         const isChildActive = location.pathname.startsWith(
//                           child.path,
//                         );

//                         return (
//                           <li key={child.path}>
//                             <Link
//                               to={child.path}
//                               className={`nav-link d-flex align-items-center gap-2 ${
//                                 isChildActive ? "active" : ""
//                               }`}
//                             >
//                               <ChildIcon />
//                               <span className="sidebar-text">{child.name}</span>
//                             </Link>
//                           </li>
//                         );
//                       })}
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
