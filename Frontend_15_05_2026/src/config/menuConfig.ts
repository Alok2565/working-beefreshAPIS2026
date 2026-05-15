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
  FaClipboardList,
  FaWeight,
  FaQuinscape,
  FaShippingFast,
  FaCannabis,
} from "react-icons/fa";
import {
  FaLayerGroup,
  FaSliders,
  FaUsersRectangle,
  FaWallet,
  FaWarehouse,
  FaHandHoldingDroplet,
} from "react-icons/fa6";
import {
  MdCompost,
  MdAddBox,
  MdCategory,
  MdOutlineSettings,
  MdAirplaneTicket,
  MdOutlineQueryBuilder,
  MdDynamicFeed,
  MdInventory,
  MdBatchPrediction,
  MdBackpack,
} from "react-icons/md";
import { BsChatDotsFill, BsReverseListColumnsReverse } from "react-icons/bs";
import { FcSupport } from "react-icons/fc";
import { SiZerotier, SiManageiq } from "react-icons/si";
import { GrCatalog } from "react-icons/gr";
import { CgPlayListAdd } from "react-icons/cg";
import { RiPagesFill } from "react-icons/ri";

export type Menu = {
  name: string;
  path: string;
  icon: React.ElementType;
  children?: Menu[];
  nested_children?: Menu[];
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
      name: "Content Management",
      path: "#",
      icon: SiManageiq,
      children: [
        {
          name: "Posts",
          path: "#",
          icon: MdCompost,
          nested_children: [
            {
              name: "All Posts",
              path: "/admin/manage/posts",
              icon: FaRegListAlt,
            },
          ],
        },
        {
          name: "Pages",
          path: "/admin/manage/pages",
          icon: RiPagesFill,
        },
        {
          name: "FAQs",
          path: "/admin/manage/faqs",
          icon: FaQuinscape,
        },
        {
          name: "Testimonials",
          path: "/admin/manage/testimonials",
          icon: FaUsersRectangle,
        },
      ],
    },
    {
      name: "Users Roles & Permissions",
      path: "#",
      icon: FaUsers,
      children: [
        {
          name: "Users",
          path: "#",
          icon: FaRegListAlt,
          nested_children: [
            {
              name: "All Users",
              path: "/admin/manage/users",
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
          nested_children: [
            {
              name: "All Roles",
              path: "admin/manage/roles",
              icon: FaRegListAlt,
            },
            {
              name: "Add Role",
              path: "admin/manage/role/add-new",
              icon: MdAddBox,
            },
          ],
        },
        {
          name: "Permissions",
          path: "#",
          icon: FaUserPlus,
          nested_children: [
            {
              name: "All Permissions",
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
          nested_children: [
            {
              name: "All Role & Access",
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
      ],
    },

    {
      name: "Catalog Management",
      path: "#",
      icon: GrCatalog,
      children: [
        {
          name: "Peroducts",
          path: "#",
          icon: FaBox,
          nested_children: [
            {
              name: "All Products",
              path: "/admin/manage/products",
              icon: FaRegListAlt,
            },
            {
              name: "Add Product",
              path: "/admin/manage/products/add-new",
              icon: FaRegListAlt,
            },
            {
              name: "Featured Products",
              path: "/admin/manage/products/featured",
              icon: MdAddBox,
            },
            {
              name: "Best Sellers",
              path: "/admin/manage/products/best-sellers",
              icon: MdAddBox,
            },
            {
              name: "Archived Products",
              path: "/admin/manage/products/archived",
              icon: MdAddBox,
            },
          ],
        },
      ],
    },
    {
      name: "Category Management",
      path: "#",
      icon: MdCategory,
      children: [
        {
          name: "All Categories",
          path: "/admin/manage/products/categories",
          icon: FaRegListAlt,
        },
        {
          name: "Add Category",
          path: "/admin/manage/products/category/add-new",
          icon: MdAddBox,
        },
        {
          name: "Callections",
          path: "/admin/manage/products/collections",
          icon: MdOutlineSettings,
        },
      ],
    },
    {
      name: "Attribute Management",
      path: "#",
      icon: FaClipboardList,
      children: [
        {
          name: "Flavors",
          path: "/admin/manage/products/attribute/flavors",
          icon: FaCannabis,
        },
        {
          name: "Packaging Types",
          path: "/admin/manage/products/attribute/packaging-types",
          icon: MdBackpack,
        },
        {
          name: "Purity Levels",
          path: "/admin/manage/products/attribute/purities",
          icon: FaHandHoldingDroplet,
        },
        {
          name: "Weight Units",
          path: "/admin/manage/products/weight-units",
          icon: FaWeight,
        },
        {
          name: "Product Attributes",
          path: "/admin/manage/products/attributes",
          icon: CgPlayListAdd,
        },
        {
          name: "Attribute Values",
          path: "/admin/manage/products/attribute/values",
          icon: FaClipboardList,
        },
      ],
    },
    {
      name: "Inventory Management",
      path: "#",
      icon: MdInventory,
      children: [
        {
          name: "Stock Management",
          path: "/admin/manage/products/stock-management",
          icon: FaLayerGroup,
        },
        {
          name: "Warehouse Stock",
          path: "/admin/manage/products/warehouse-stock",
          icon: FaWarehouse,
        },
        {
          name: "Batch Tracking",
          path: "/admin/manage/products/batch-tracking",
          icon: MdBatchPrediction,
        },
        {
          name: "Expiry Management",
          path: "/admin/manage/products/expiry-management",
          icon: SiZerotier,
        },
        {
          name: "SKU Management",
          path: "/admin/manage/products/sku-management",
          icon: BsReverseListColumnsReverse,
        },
      ],
    },
    {
      name: "Reviews & Ratings",
      path: "#",
      icon: FaRegListAlt,
      children: [
        {
          name: "Reviews",
          path: "/admin/manage/reviews",
          icon: FaRegListAlt,
        },
        {
          name: "Ratings",
          path: "/admin/manage/ratings",
          icon: FaRegListAlt,
        },
      ],
    },
    {
      name: "Order Management",
      path: "#",
      icon: FaShoppingCart,
      children: [
        {
          name: "Orders",
          path: "#",
          icon: FaRegListAlt,
          nested_children: [
            {
              name: "All Orders",
              path: "/admin/products/orders",
              icon: FaRegListAlt,
            },
            {
              name: "New Orders",
              path: "/admin/products/orders/new",
              icon: MdAddBox,
            },
            {
              name: "Processing Orders",
              path: "/admin/products/orders/processing",
              icon: MdAddBox,
            },
            {
              name: "Packed Orders",
              path: "/admin/products/orders/packed",
              icon: MdAddBox,
            },
            {
              name: "Shipped Orders",
              path: "/admin/products/orders/shipped",
              icon: MdAddBox,
            },
            {
              name: "Delivered Orders",
              path: "/admin/products/orders/delivered",
              icon: MdAddBox,
            },
            {
              name: "Cancelled Orders",
              path: "/admin/products/orders/cancelled",
              icon: MdAddBox,
            },
            {
              name: "Returned Orders",
              path: "/admin/products/orders/returned",
              icon: MdAddBox,
            },
          ],
        },
        {
          name: "Invoice",
          path: "#",
          icon: FaFileInvoice,
          nested_children: [
            {
              name: "Invoice Lists",
              path: "/admin/orders/invoices",
              icon: FaRegListAlt,
            },
            {
              name: "Generate Invoice",
              path: "/admin/orders/invoice-generate",
              icon: FaRegListAlt,
            },
            {
              name: "Credit Notes",
              path: "/admin/orders/credit-notes",
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
        {
          name: "Shipments",
          path: "#",
          icon: FaRegListAlt,
          nested_children: [
            {
              name: "Shipment Lists",
              path: "/admin/orders/shipments",
              icon: FaRegListAlt,
            },
            {
              name: "Shipment Tracking",
              path: "/admin/orders/shipments/tracking",
              icon: FaRegListAlt,
            },
            {
              name: "Delivery partners",
              path: "/admin/orders/shipments/delivery-partners",
              icon: FaRegListAlt,
            },
            {
              name: "Shipment Status",
              path: "/admin/orders/shipments/status",
              icon: FaLock,
            },
            {
              name: "Shimpment Labels",
              path: "/admin/orders/shipments/labels",
              icon: MdAddBox,
            },
          ],
        },
      ],
    },
    {
      name: "Customer Management",
      path: "#",
      icon: FaUsers,
      children: [
        {
          name: "Customers",
          path: "#",
          icon: FaUsers,
          nested_children: [
            {
              name: "All Customers",
              path: "/admin/manage/customers",
              icon: FaRegListAlt,
            },
            {
              name: "Customer Groups",
              path: "/admin/manage/customers/groups",
              icon: FaRegListAlt,
            },
            {
              name: "Subscribers",
              path: "/admin/manage/customers/subscribers",
              icon: FaRegListAlt,
            },
            {
              name: "Wallet Users",
              path: "/admin/manage/customers/wallet-users",
              icon: FaRegListAlt,
            },
          ],
        },
        {
          name: "Support",
          path: "#",
          icon: FcSupport,
          nested_children: [
            {
              name: "Support Tickets",
              path: "/admin/manage/support/tickets",
              icon: MdAirplaneTicket,
            },
            {
              name: "Live Chat",
              path: "/admin/manage/support/live-chat",
              icon: BsChatDotsFill,
            },
            {
              name: "Complaints",
              path: "/admin/manage/support/complaints",
              icon: MdOutlineQueryBuilder,
            },
            {
              name: "Feedback",
              path: "/admin/manage/support/feedback",
              icon: MdDynamicFeed,
            },
          ],
        },
      ],
    },
    {
      name: "Marketing & Promotions",
      path: "#",
      icon: FaUsersRectangle,
      children: [
        {
          name: "Promotions",
          path: "#",
          icon: FaUsersRectangle,
          nested_children: [
            {
              name: "Discounts & Coupons",
              path: "/admin/manage/marketing/discounts",
              icon: FaRegListAlt,
            },
            {
              name: "Promo Codes",
              path: "/admin/manage/marketing/promo-codes",
              icon: FaRegListAlt,
            },
            {
              name: "Falash Sales",
              path: "/admin/manage/marketing/flash-sales",
              icon: FaRegListAlt,
            },
            {
              name: "Combo Offers",
              path: "/admin/manage/marketing/combo-offers",
              icon: FaRegListAlt,
            },
            {
              name: "Free Shipping Rules",
              path: "/admin/manage/marketing/free-shipping-rules",
              icon: FaRegListAlt,
            },
          ],
        },
        {
          name: "Campaigns",
          path: "#",
          icon: FaUsersRectangle,
          nested_children: [
            {
              name: "Email Campaigns",
              path: "/admin/manage/marketing/email-campaigns",
              icon: FaRegListAlt,
            },
            {
              name: "SMS Marketing",
              path: "/admin/manage/marketing/sms",
              icon: FaRegListAlt,
            },
            {
              name: "Push Notifications",
              path: "/admin/manage/marketing/push-notifications",
              icon: FaRegListAlt,
            },
          ],
        },
        {
          name: "SEO",
          path: "#",
          icon: FaUsersRectangle,
          nested_children: [
            {
              name: "Meta Tags",
              path: "/admin/manage/marketing/seo/meta-tags",
              icon: FaRegListAlt,
            },
            {
              name: "Sitemap",
              path: "/admin/manage/marketing/seo/sitemap",
              icon: FaRegListAlt,
            },
            {
              name: "URL Redirects",
              path: "/admin/manage/marketing/seo/url-redirects",
              icon: FaRegListAlt,
            },
            {
              name: "Blog SEO",
              path: "/admin/manage/marketing/seo/blog-seo",
              icon: FaRegListAlt,
            },
          ],
        },
      ],
    },
    {
      name: "Finance & Accounting",
      path: "#",
      icon: FaWallet,
      children: [
        {
          name: "Financial",
          path: "#",
          icon: FaWallet,
          nested_children: [
            {
              name: "Transactions",
              path: "/admin/manage/finance/transactions",
              icon: FaRegListAlt,
            },
            {
              name: "Payment Gateways",
              path: "/admin/manage/finance/payouts",
              icon: FaRegListAlt,
            },
            {
              name: "Refunds",
              path: "/admin/manage/finance/refunds",
              icon: FaRegListAlt,
            },
            {
              name: "COD Orders",
              path: "/admin/manage/finance/cod-orders",
              icon: FaRegListAlt,
            },
          ],
        },
        {
          name: "Accounting",
          path: "#",
          icon: FaUsersRectangle,
          nested_children: [
            {
              name: "Sales Reports",
              path: "/admin/manage/accounting/sales-reports",
              icon: FaRegListAlt,
            },
            {
              name: "Profit Reports",
              path: "/admin/manage/accounting/profit-reports",
              icon: FaRegListAlt,
            },
            {
              name: "GST Reports",
              path: "/admin/manage/accounting/gst-reports",
              icon: FaRegListAlt,
            },
            {
              name: "Expense Tracking",
              path: "/admin/manage/accounting/expense-tracking",
              icon: FaRegListAlt,
            },
          ],
        },
      ],
    },
    {
      name: "Logistics & Shipping",
      path: "#",
      icon: FaShippingFast,
      children: [
        {
          name: "Shipping",
          path: "#",
          icon: FaShippingFast,
          nested_children: [
            {
              name: "Shipping Zones",
              path: "/admin/manage/logistics/shipping-zones",
              icon: FaRegListAlt,
            },
            {
              name: "Pincode Serviceability",
              path: "/admin/manage/logistics/pincode-serviceability",
              icon: FaRegListAlt,
            },
            {
              name: "Shipping Rates",
              path: "/admin/manage/logistics/shipping-rates",
              icon: FaRegListAlt,
            },
            {
              name: "Delivery Time Slots",
              path: "/admin/manage/logistics/delivery-time-slots",
              icon: FaRegListAlt,
            },
          ],
        },
        {
          name: "Vendors",
          path: "#",
          icon: FaUsersRectangle,
          nested_children: [
            {
              name: "Delivery Partners",
              path: "/admin/manage/logistics/delivery-partners",
              icon: FaRegListAlt,
            },
            {
              name: "Warehouse Partners",
              path: "/admin/manage/logistics/warehouse-partners",
              icon: FaRegListAlt,
            },
          ],
        },
      ],
    },
    {
      name: "Analytics & Reports",
      path: "#",
      icon: MdOutlineQueryBuilder,
      children: [
        {
          name: "Sales Analytics",
          path: "#",
          icon: FaRegListAlt,
          nested_children: [
            {
              name: "Daily Sales",
              path: "/admin/manage/analytics/daily-sales",
              icon: FaRegListAlt,
            },
            {
              name: "Monthly Revenue",
              path: "/admin/manage/analytics/monthly-revenue",
              icon: FaRegListAlt,
            },
            {
              name: "Product Performance",
              path: "/admin/manage/analytics/product-performance",
              icon: FaRegListAlt,
            },
            {
              name: "Category Performance",
              path: "/admin/manage/analytics/category-performance",
              icon: FaRegListAlt,
            },
          ],
        },
        {
          name: "Customer Analytics",
          path: "#",
          icon: FaRegListAlt,
          nested_children: [
            {
              name: "Repeat Customers",
              path: "/admin/manage/analytics/repeat-customers",
              icon: FaRegListAlt,
            },
            {
              name: "Customer Growth",
              path: "/admin/manage/analytics/customer-growth",
              icon: FaRegListAlt,
            },
            {
              name: "Abandoned Carts",
              path: "/admin/manage/analytics/abandoned-carts",
              icon: FaRegListAlt,
            },
          ],
        },

        {
          name: "Inventory Analytics",
          path: "#",
          icon: FaRegListAlt,
          nested_children: [
            {
              name: "Stock Reports",
              path: "/admin/manage/analytics/stock-reports",
              icon: FaRegListAlt,
            },
            {
              name: "Expiry Reports",
              path: "/admin/manage/analytics/expiry-reports",
              icon: FaRegListAlt,
            },
            {
              name: "Damage Reports",
              path: "/admin/manage/analytics/damage-reports",
              icon: FaRegListAlt,
            },
          ],
        },
      ],
    },
    {
      name: "General Settings",
      path: "#",
      icon: MdOutlineSettings,
      children: [
        {
          name: "Website Settings",
          path: "/admin/manage/settings/site",
          icon: FaRegListAlt,
        },
        {
          name: "Contact Details",
          path: "/admin/manage/settings/contact",
          icon: FaRegListAlt,
        },
        {
          name: "Social Media",
          path: "/admin/manage/settings/social",
          icon: FaRegListAlt,
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
