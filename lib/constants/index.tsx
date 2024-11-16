import {
  Barcode,
  Box,
  ChartBarStacked,
  ChartNoAxesColumn,
  Clipboard,
  Clock4,
  Cog,
  Inbox,
  LayoutDashboard,
  Lock,
  LogOut,
  Package,
  TrendingDown,
  User,
  User2,
  UserCheck,
  UserCog,
} from "lucide-react";

export const navLinks = [
  {
    heading: "Main",
    body: [
      {
        title: "Dashboard",
        link: "/dashboard",
        icon: <LayoutDashboard strokeWidth={1.5} size={20} />,
      },
    ],
  },
  {
    heading: "Inventory",
    body: [
      {
        title: "Products",
        link: "/products",
        icon: <Box strokeWidth={1.5} size={20} />,
      },
      {
        title: "Low Stocks",
        link: "/low-stocks",
        icon: <TrendingDown strokeWidth={1.5} size={20} />,
      },
      {
        title: "Category",
        link: "/category",
        icon: <ChartBarStacked strokeWidth={1.5} size={20} />,
      },
      {
        title: "Units",
        link: "/units",
        icon: <Box strokeWidth={1.5} size={20} />,
      },
      {
        title: "Print Barcode",
        link: "/print-barcode",
        icon: <Barcode strokeWidth={1.5} size={20} />,
      },
    ],
  },
  {
    heading: "Stock",
    body: [
      {
        title: "Manage Stock",
        link: "/manage-stock",
        icon: <Package strokeWidth={1.5} size={20} />,
      },
      {
        title: "Stock Adjustment",
        link: "/stock-adjustment",
        icon: <Clipboard strokeWidth={1.5} size={20} />,
      },
    ],
  },
  {
    heading: "Sales",
    body: [
      {
        title: "Sales",
        link: "/sales",
        icon: <Package strokeWidth={1.5} size={20} />,
      },
      {
        title: "POS",
        link: "/pos",
        icon: <Clipboard strokeWidth={1.5} size={20} />,
      },
    ],
  },
  {
    heading: "People",
    body: [
      {
        title: "Suppliers",
        link: "/suppliers",
        icon: <User2 strokeWidth={1.5} size={20} />,
      },
    ],
  },
  {
    heading: "HRM",
    body: [
      {
        title: "Employees",
        link: "/employees",
        icon: <User2 strokeWidth={1.5} size={20} />,
      },
      {
        title: "Departments",
        link: "/departments",
        icon: <User strokeWidth={1.5} size={20} />,
      },
      {
        title: "Shifts",
        link: "/shifts",
        icon: <User strokeWidth={1.5} size={20} />,
      },
      {
        title: "Attendance",
        link: "/attendance",
        icon: <Clock4 strokeWidth={1.5} size={20} />,
      },
    ],
  },
  {
    heading: "Reports",
    body: [
      {
        title: "Sales Report",
        link: "/sales-report",
        icon: <ChartNoAxesColumn strokeWidth={1.5} size={20} />,
      },
      {
        title: "Inventory Report",
        link: "/inventory-report",
        icon: <Inbox strokeWidth={1.5} size={20} />,
      },
      {
        title: "Profit & Loss",
        link: "/profit-loss",
        icon: <TrendingDown strokeWidth={1.5} size={20} />,
      },
    ],
  },
  {
    heading: "Users Management",
    body: [
      {
        title: "Users",
        link: "/users",
        icon: <UserCheck strokeWidth={1.5} size={20} />,
      },
      {
        title: "Roles & Permissions",
        link: "/roles-permission",
        icon: <UserCog strokeWidth={1.5} size={20} />,
      },
      {
        title: "Delete Account Request",
        link: "/delete-account-request",
        icon: <Lock strokeWidth={1.5} size={20} />,
      },
    ],
  },
  {
    heading: "Settings",
    body: [
      {
        title: "Profile",
        link: "/profile",
        icon: <User strokeWidth={1.5} size={20} />,
      },
      {
        title: "General Settings",
        link: "/general-settings",
        icon: <Cog strokeWidth={1.5} size={20} />,
      },
      {
        title: "Logout",
        link: "/",
        icon: <LogOut strokeWidth={1.5} size={20} />,
      },
    ],
  },
];

export const actionColors = {
  "Add Product": "bg-blue-500",
  "Edit Product": "bg-yellow-500",
  "Delete Product": "bg-red-500",
  "Add Order": "bg-green-500",
  "Edit Order": "bg-orange-500",
  "Delete Order": "bg-purple-500",
  "Login": "bg-teal-500",
  "Logout": "bg-gray-500",
  "Failed Login Attempt": "bg-pink-500",
  "View Report": "bg-indigo-500",
  "Update Settings": "bg-cyan-500",
};

