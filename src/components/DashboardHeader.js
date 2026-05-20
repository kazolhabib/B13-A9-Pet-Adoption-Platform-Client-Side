"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { Sun, Moon, Menu, Bell, Search, PawPrint, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

export function DashboardHeader({ onToggleSidebar }) {
  const { user } = useAuth();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (document.documentElement.classList.contains("dark")) {
      setIsDark(true);
    }
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (nextDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  const firstName = user?.name?.split(" ")[0] || "User";

  return (
    <header className="sticky top-0 z-40 w-full">
      <div className="mx-4 mt-4 rounded-2xl bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-zinc-200/60 dark:border-zinc-700/60 shadow-sm shadow-zinc-200/50 dark:shadow-zinc-900/50">
        <div className="flex items-center justify-between h-16 px-5">
          {/* Left: Hamburger + Greeting */}
          <div className="flex items-center gap-4">
            <button
              onClick={onToggleSidebar}
              className="md:hidden p-2.5 rounded-xl text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              aria-label="Toggle sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="hidden sm:block">
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <p className="text-xs font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                  {getGreeting()}
                </p>
                <h2 className="text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-1.5">
                  {firstName}
                  <span className="text-xl">👋</span>
                </h2>
              </motion.div>
            </div>
          </div>

          {/* Center: Breadcrumb */}
          <div className="hidden lg:flex items-center gap-2 text-sm text-zinc-400 dark:text-zinc-500">
            <Link href="/" className="hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors flex items-center gap-1.5">
              <PawPrint className="w-3.5 h-3.5" />
              PetHaven
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-zinc-700 dark:text-zinc-200 font-medium">Dashboard</span>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="relative p-2.5 rounded-xl text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              aria-label="Toggle theme"
            >
              <motion.div
                key={isDark ? "sun" : "moon"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </motion.div>
            </motion.button>

            {/* Avatar */}
            <Link href="/" className="group">
              <div className="relative">
                {user?.photoUrl ? (
                  <img
                    src={user.photoUrl}
                    alt={user.name}
                    className="w-9 h-9 rounded-xl object-cover ring-2 ring-zinc-200 dark:ring-zinc-700 group-hover:ring-emerald-400 dark:group-hover:ring-emerald-500 transition-all"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-bold text-sm ring-2 ring-zinc-200 dark:ring-zinc-700 group-hover:ring-emerald-400 transition-all">
                    {firstName.charAt(0).toUpperCase()}
                  </div>
                )}
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 border-2 border-white dark:border-zinc-900 rounded-full" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
