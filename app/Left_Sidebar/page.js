"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  X,
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  MessageSquare,
  BarChart3,
  CreditCard,
  Settings,
  LogOut,
  Menu,
} from "lucide-react";

export default function Left_Sidebar({ sidebarOpen, setSidebarOpen }) {
  const pathname = usePathname();

  // MENU ITEMS DEFINITION WITH NAMES, ICONS, AND PATHS
  const menuItems = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/",
    },
    {
      name: "Products",
      icon: Package,
      path: "/AdminProduct",
    },
    {
      name: "Enquiry",
      icon: MessageSquare,
      path: "/Enquiry",
    },
    {
      name: "Course",
      icon: ShoppingCart,
      path: "/Course",
    },
    {
      name: "Students",
      icon: Users,
      path: "/Students",
    },
    {
      name: "Analytics",
      icon: BarChart3,
      path: "/Analytics",
    },
    {
      name: "Payments",
      icon: CreditCard,
      path: "/Payments",
    },
    {
      name: "Settings",
      icon: Settings,
      path: "/Settings",
    },
  ];

  // Helper function to handle active state styles
  const isMenuItemActive = (itemPath) => {
    if (itemPath === "/") {
      return pathname === itemPath;
    }
    return pathname.startsWith(itemPath);
  };

  // 1. DYNAMIC HEADER DETECTOR
  const activeItem = menuItems.find((item) => isMenuItemActive(item.path)) || {
    name: "Admin Dashboard",
    icon: LayoutDashboard,
  };

  const HeaderIcon = activeItem.icon;

  const handleLogout = () => {
    console.log("Logged out successfully");
  };

  return (
    <>
      {/* 2. DYNAMIC HEADER PANEL */}
      <header className="fixed top-0 right-0 left-0 lg:left-[240px] h-20 bg-white border-b border-gray-200 z-30 px-4 sm:px-8 flex items-center justify-between shadow-sm">
        
        {/* Left Side: Burger Menu (Mobile Only) + Dynamic Title */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-xl text-gray-700 transition"
          >
            <Menu size={24} />
          </button>

          <div className="flex items-center gap-3 text-gray-800">
            <div className="bg-gray-100 p-2 rounded-lg text-gray-700">
              <HeaderIcon size={22} className="stroke-[2.5]" />
            </div>
            <h1 className="text-lg sm:text-xl font-bold tracking-tight">
              Admin {activeItem.name}
            </h1>
          </div>
        </div>

        {/* Right Side: Logout Button */}
        <div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 group"
          >
            <LogOut size={18} className="group-hover:translate-x-0.5 transition-transform" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      {/* 3. SIDEBAR OVERLAY BACKGROUND (MOBILE) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* 4. LEFT NAVIGATION SIDEBAR */}
      <aside
        className={`fixed top-0 left-0 z-50 h-screen w-[240px] bg-gray-800 text-white p-5 sm:p-6 overflow-y-auto transform transition-all duration-300 shadow-2xl ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        {/* TOP PANEL SECTION */}
        <div className="flex items-center justify-between mb-10">
          <img
            src="https://resilientinstitute.in/wp-content/uploads/2026/04/ResilientLogo_Final.jpeg"
            alt="Logo"
            className="w-[150px] object-contain"
          />

          {/* SIDEBAR MOBILE CLOSE BUTTON */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden bg-red-500 hover:bg-red-600 w-9 h-9 rounded-full flex items-center justify-center transition shadow-md"
          >
            <X size={18} />
          </button>
        </div>

        {/* NAVIGATION LIST INTERFACE */}
        <ul className="space-y-2">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = isMenuItemActive(item.path);

            return (
              <li key={index}>
                <Link
                  href={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 group ${
                    isActive
                      ? "bg-yellow-400 text-black font-semibold shadow-md shadow-yellow-400/10"
                      : "hover:bg-white/10 text-gray-300 hover:text-white"
                  }`}
                >
                  <Icon
                    size={20}
                    className={`transition-transform duration-200 ${
                      isActive ? "scale-105" : "group-hover:scale-105"
                    }`}
                  />
                  <span className="text-sm sm:text-base">{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </aside>
    </>
  );
}