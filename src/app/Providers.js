"use client";

import { Toaster } from "sonner";
import { useEffect, useState } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";

import { AuthProvider } from "@/context/AuthContext";

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "";

export function Providers({ children }) {
  useEffect(() => {
    // Initialize theme based on user preference or local storage
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark" || (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <AuthProvider>
        <Toaster position="top-center" richColors />
        {children}
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}
