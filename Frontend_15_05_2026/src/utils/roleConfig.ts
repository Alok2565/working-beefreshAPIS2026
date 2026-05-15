// // export type Menu = {
// //   name: string;
// //   path: string;
// // };

// // export const ROLE = {
// //   ADMIN: 1,
// //   USER: 2,
// // };

// // export const sidebarConfig: Record<number, Menu[]> = {
// //   [ROLE.ADMIN]: [
// //     { name: "Dashboard", path: "/admin/dashboard" },
// //     { name: "Users", path: "/admin/manage/users" },
// //     { name: "Roles", path: "/admin/manage/roles" },
// //     { name: "Products", path: "/admin/manage/products" },
// //     { name: "Orders", path: "/admin/manage/orders" },
// //   ],

// //   [ROLE.USER]: [
// //     { name: "Dashboard", path: "/user/dashboard" },
// //     { name: "My Orders", path: "/user/dashboard/orders" },
// //     { name: "Profile", path: "/user/dashboard/profile" },
// //     { name: "Change Password", path: "/user/change-password" },
// //   ],
// // };

// // export type Menu = {
// //   name: string;
// //   path: string;
// // };

// // export const ROLE = {
// //   ADMIN: 1,
// //   USER: 2,
// // };

// // export const sidebarConfig: Record<number, Menu[]> = {
// //   [ROLE.ADMIN]: [
// //     { name: "Dashboard", path: "/admin/dashboard" },
// //     { name: "Users", path: "/admin/manage/users" },
// //     { name: "Roles", path: "/admin/manage/roles" },
// //     { name: "Products", path: "/admin/manage/products" },
// //     { name: "Orders", path: "/admin/manage/orders" },
// //   ],
// //   [ROLE.USER]: [
// //     { name: "Dashboard", path: "/user/dashboard" },
// //     { name: "My Orders", path: "/user/dashboard/orders" },
// //     { name: "Profile", path: "/user/dashboard/profile" },
// //     { name: "Change Password", path: "/user/change-password" },
// //   ],
// // };
// import {
//   FaTachometerAlt,
//   FaUsers,
//   FaUserFriends,
//   FaBox,
//   FaShoppingCart,
//   FaUser,
//   FaKey,
//   FaLock,
//   FaUserPlus,
//   FaFileInvoice,
//   FaRegListAlt,
// } from "react-icons/fa";
// import { FaSliders } from "react-icons/fa6";
// import { MdCompost } from "react-icons/md";
// export type Menu = {
//   name: string;
//   path: string;
//   icon: React.ElementType;
//   children?: Menu[];
// };

// export const ROLE = {
//   ADMIN: 1,
//   USER: 2,
// };

// export const sidebarConfig: Record<number, Menu[]> = {
//   [ROLE.ADMIN]: [
//     {
//       name: "Dashboard",
//       path: "/admin/dashboard",
//       icon: FaTachometerAlt,
//     },
//     {
//       name: "Home Banner",
//       path: "#",
//       icon: FaSliders,
//       children: [
//         {
//           name: "Banners",
//           path: "/admin/manage/banners",
//           icon: FaRegListAlt,
//         },
//         {
//           name: "Add New",
//           path: "/admin/manage/banner/add-new",
//           icon: FaLock,
//         },
//       ],
//     },
//     {
//       name: "Posts",
//       path: "#",
//       icon: MdCompost,
//       children: [
//         {
//           name: "Posts",
//           path: "/admin/manage/posts",
//           icon: FaRegListAlt,
//         },
//         {
//           name: "Add New",
//           path: "/admin/manage/post/add-new",
//           icon: FaLock,
//         },
//       ],
//     },
//     {
//       name: "Users",
//       path: "#",
//       icon: FaUsers,
//       children: [
//         {
//           name: "Users",
//           path: "admin/manage/users",
//           icon: FaRegListAlt,
//         },
//         {
//           name: "Add User",
//           path: "admin/manage/user/add-new",
//           icon: FaKey,
//         },
//         {
//           name: "User Role & Permission",
//           path: "/admin/manage/user/user-role-permission",
//           icon: FaLock,
//         },
//         {
//           name: "View Profile",
//           path: "/admin/manage/profile",
//           icon: FaLock,
//         },
//       ],
//     },
//     {
//       name: "Roles",
//       path: "admin/manage/roles",
//       icon: FaUserFriends,
//     },
//     {
//       name: "Role & Access",
//       path: "#",
//       icon: FaUserPlus,
//       children: [
//         {
//           name: "Role & Access",
//           path: "/admin/manage/role/role-access",
//           icon: FaKey,
//         },
//         {
//           name: "Assign Role",
//           path: "/admin/manage/role/assign-role",
//           icon: FaLock,
//         },
//       ],
//     },
//     {
//       name: "Products",
//       path: "/admin/manage/products",
//       icon: FaBox,
//       children: [
//         {
//           name: "Orders",
//           path: "/admin/manage/roles",
//           icon: FaKey,
//         },
//         {
//           name: "Payment",
//           path: "/admin/manage/permissions",
//           icon: FaLock,
//         },
//       ],
//     },
//     {
//       name: "Orders",
//       path: "/admin/manage/orders",
//       icon: FaShoppingCart,
//     },
//     {
//       name: "Invoice",
//       path: "#",
//       icon: FaFileInvoice,
//       children: [
//         {
//           name: "List",
//           path: "/admin/manage/roles",
//           icon: FaRegListAlt,
//         },
//         {
//           name: "preview",
//           path: "/admin/manage/permissions",
//           icon: FaLock,
//         },
//         {
//           name: "Add New",
//           path: "/admin/manage/permissions",
//           icon: FaLock,
//         },
//         {
//           name: "Edit",
//           path: "/admin/manage/permissions",
//           icon: FaLock,
//         },
//       ],
//     },
//   ],

//   [ROLE.USER]: [
//     {
//       name: "Dashboard",
//       path: "/user/dashboard",
//       icon: FaTachometerAlt,
//     },
//     {
//       name: "My Orders",
//       path: "/user/dashboard/orders",
//       icon: FaShoppingCart,
//     },
//     {
//       name: "Profile",
//       path: "/user/dashboard/profile",
//       icon: FaUser,
//     },
//     {
//       name: "Change Password",
//       path: "/user/change-password",
//       icon: FaKey,
//     },
//   ],
// };

export const ROLE = {
  ADMIN: 1,
  USER: 2,
};

export const hasPermission = (
  userPermissions: string[],
  permission?: string,
): boolean => {
  if (!permission) return true;
  return userPermissions.includes(permission);
};
