"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  PlusCircle,
  List,
  LogOut,
  PawPrint,
  X,
  Home,
  Sparkles,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export function Sidebar({ isOpen, onClose }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  const menuItems = [
    { name: "My Requests", href: "/dashboard/requests", icon: LayoutDashboard, color: "from-violet-500 to-purple-600" },
    { name: "Add Pet", href: "/dashboard/add-pet", icon: PlusCircle, color: "from-emerald-500 to-teal-600" },
    { name: "My Listings", href: "/dashboard/listings", icon: List, color: "from-amber-500 to-orange-600" },
  ];

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  const firstName = user?.name?.split(" ")[0] || "User";

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Brand Header */}
      <div className="px-5 pt-6 pb-4">
        <Link href="/" className="flex items-center gap-3 group" onClick={onClose}>
          <div className="relative">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600 flex items-center justify-center shadow-lg shadow-emerald-500/25 dark:shadow-emerald-500/10 group-hover:shadow-emerald-500/40 transition-shadow">
              <PawPrint className="w-5 h-5 text-white" />
            </div>
            <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white dark:border-zinc-900 animate-pulse" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-zinc-900 dark:text-white tracking-tight">
              PetHaven
            </h1>
            <p className="text-[10px] font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
              Dashboard
            </p>
          </div>
        </Link>
      </div>

      {/* User Card */}
      <div className="mx-4 mb-5 p-3.5 rounded-2xl bg-gradient-to-br from-zinc-50 to-zinc-100/50 dark:from-zinc-800/50 dark:to-zinc-800/30 border border-zinc-200/60 dark:border-zinc-700/40">
        <div className="flex items-center gap-3">
          {user?.photoUrl ? (
            <img
              src={user.photoUrl}
              alt={user.name}
              className="w-10 h-10 rounded-xl object-cover ring-2 ring-white dark:ring-zinc-700"
            />
          ) : (
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-bold text-sm ring-2 ring-white dark:ring-zinc-700">
              {firstName.charAt(0).toUpperCase()}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-zinc-900 dark:text-white truncate">
              {user?.name || "User"}
            </p>
            <p className="text-xs text-zinc-400 dark:text-zinc-500 truncate">
              {user?.email || ""}
            </p>
          </div>
        </div>
      </div>

      {/* Divider with label */}
      <div className="px-5 mb-3">
        <p className="text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-[0.15em]">
          Navigation
        </p>
      </div>

      {/* Navigation */}
      <nav className="px-3 flex-1 space-y-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={onClose}
              className={`relative flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${
                isActive
                  ? "text-zinc-900 dark:text-white"
                  : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="sidebar-active-pill"
                  className="absolute inset-0 bg-white dark:bg-zinc-800 rounded-xl shadow-sm shadow-zinc-200/50 dark:shadow-zinc-900/50 border border-zinc-200/60 dark:border-zinc-700/40"
                  style={{ zIndex: -1 }}
                  transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                />
              )}
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 ${
                  isActive
                    ? `bg-gradient-to-br ${item.color} text-white shadow-sm`
                    : "bg-zinc-100 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-600 dark:group-hover:text-zinc-300"
                }`}
              >
                <Icon className="w-4 h-4" />
              </div>
              <span>{item.name}</span>
              {isActive && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-400"
                />
              )}
            </Link>
          );
        })}

        {/* Quick Links */}
        <div className="pt-4 mt-4 border-t border-zinc-200/60 dark:border-zinc-700/40">
          <p className="px-3.5 mb-3 text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-[0.15em]">
            Quick Links
          </p>
          <Link
            href="/"
            onClick={onClose}
            className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-all"
          >
            <div className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-400 dark:text-zinc-500">
              <Home className="w-4 h-4" />
            </div>
            Back to Home
          </Link>
          <Link
            href="/pets"
            onClick={onClose}
            className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-all"
          >
            <div className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-400 dark:text-zinc-500">
              <Sparkles className="w-4 h-4" />
            </div>
            Browse Pets
          </Link>
        </div>
      </nav>

      {/* Logout */}
      <div className="p-3 mt-2 border-t border-zinc-200/60 dark:border-zinc-700/40">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-medium text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
        >
          <div className="w-8 h-8 rounded-lg bg-red-50 dark:bg-red-950/30 flex items-center justify-center">
            <LogOut className="w-4 h-4" />
          </div>
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-[260px] flex-col flex-shrink-0 h-full border-r border-zinc-200/60 dark:border-zinc-800/60 bg-zinc-50/50 dark:bg-zinc-950/50">
        {sidebarContent}
      </aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-zinc-900/40 backdrop-blur-sm md:hidden"
              onClick={onClose}
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", bounce: 0.15, duration: 0.4 }}
              className="fixed top-0 left-0 z-50 w-[280px] h-full bg-white dark:bg-zinc-900 shadow-2xl shadow-zinc-900/20 md:hidden"
            >
              <button
                onClick={onClose}
                className="absolute top-5 right-4 p-2 rounded-xl text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                aria-label="Close sidebar"
              >
                <X className="w-5 h-5" />
              </button>
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
