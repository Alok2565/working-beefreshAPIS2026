import {
  FaTachometerAlt,
  FaUsers,
  FaUserFriends,
  FaBox,
  FaShoppingCart,
  FaUser,
  FaKey,
  FaLock,
  FaUserPlus,
  FaFileInvoice,
  FaRegListAlt,
} from "react-icons/fa";
import { FaSliders } from "react-icons/fa6";
import { MdCompost, MdAddBox } from "react-icons/md";
export type Menu = {
  name: string;
  path: string;
  icon: React.ElementType;
  children?: Menu[];
  permission?: string;
};

export const ROLE = {
  ADMIN: 1,
  USER: 2,
};

export const adminMenu: Record<number, Menu[]> = {
  [ROLE.ADMIN]: [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: FaTachometerAlt,
    },
    {
      name: "Home Banner",
      path: "#",
      icon: FaSliders,
      children: [
        {
          name: "Banners",
          path: "/admin/manage/home-banners",
          icon: FaRegListAlt,
        },
        {
          name: "Add New",
          path: "/admin/manage/home-banner/add-new",
          icon: MdAddBox,
        },
      ],
    },
    {
      name: "Posts",
      path: "#",
      icon: MdCompost,
      children: [
        {
          name: "Posts",
          path: "/admin/manage/posts",
          icon: FaRegListAlt,
        },
        {
          name: "Add New",
          path: "/admin/manage/post/add-new",
          icon: MdAddBox,
        },
      ],
    },
    {
      name: "Users",
      path: "#",
      icon: FaUsers,
      children: [
        {
          name: "Users",
          path: "admin/manage/users",
          icon: FaRegListAlt,
        },
        {
          name: "Add User",
          path: "admin/manage/user/add-new",
          icon: MdAddBox,
        },
        {
          name: "User Role & Permission",
          path: "/admin/manage/user-role-permission",
          icon: FaLock,
        },
        {
          name: "View Profile",
          path: "/admin/manage/profile",
          icon: FaLock,
        },
      ],
    },
    {
      name: "Roles",
      path: "",
      icon: FaUserFriends,
      children: [
        {
          name: "Roles",
          path: "admin/manage/roles",
          icon: FaRegListAlt,
        },
        {
          name: "Add New",
          path: "/admin/manage/role/add-new",
          icon: MdAddBox,
        },
      ],
    },
    {
      name: "Permissions",
      path: "#",
      icon: FaUserPlus,
      children: [
        {
          name: "Permissions",
          path: "/admin/manage/permissions",
          icon: FaKey,
        },
        {
          name: "Add New",
          path: "/admin/manage/permission/add-new",
          icon: MdAddBox,
        },
      ],
    },
    {
      name: "Role & Access",
      path: "#",
      icon: FaUserPlus,
      children: [
        {
          name: "Role & Access",
          path: "admin/manage/role/permission-view",
          icon: FaKey,
        },
        {
          name: "Assign Role",
          path: "admin/role/permission/assign",
          icon: MdAddBox,
        },
      ],
    },
    {
      name: "Products",
      path: "/admin/manage/products",
      icon: FaBox,
      children: [
        {
          name: "Orders",
          path: "/admin/manage/roles",
          icon: FaKey,
        },
        {
          name: "Payment",
          path: "/manage/payment",
          icon: MdAddBox,
        },
      ],
    },
    {
      name: "Orders",
      path: "/admin/manage/orders",
      icon: FaShoppingCart,
    },
    {
      name: "Invoice",
      path: "#",
      icon: FaFileInvoice,
      children: [
        {
          name: "List",
          path: "/admin/orders/invoices",
          icon: FaRegListAlt,
        },
        {
          name: "preview",
          path: "/admin/orders/invoice-view",
          icon: FaLock,
        },
        {
          name: "Add New",
          path: "/admin/manage/order/invoice/add-new",
          icon: MdAddBox,
        },
        {
          name: "Edit",
          path: "/admin/manage/order/invoice/",
          icon: FaLock,
        },
      ],
    },
  ],

  [ROLE.USER]: [
    {
      name: "Dashboard",
      path: "/user/dashboard",
      icon: FaTachometerAlt,
    },
    {
      name: "My Orders",
      path: "/user/dashboard/orders",
      icon: FaShoppingCart,
    },
    {
      name: "Profile",
      path: "/user/dashboard/profile",
      icon: FaUser,
    },
    {
      name: "Change Password",
      path: "/user/change-password",
      icon: FaKey,
    },
  ],
};
