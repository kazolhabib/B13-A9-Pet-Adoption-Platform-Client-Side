"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

const AuthContext = createContext({});

// Allow overriding the backend URL via `NEXT_PUBLIC_API_BASE`.
// When not set, use a relative path so client fetches hit the Next.js API routes.
const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "";

async function parseJSONSafely(response) {
  const contentType = response.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    try {
      return await response.json();
    } catch (err) {
      console.error("Failed to parse JSON response:", err);
      return null;
    }
  }

  try {
    const text = await response.text();
    console.warn("Expected JSON but received non-JSON response:", text.slice(0, 300));
  } catch (err) {
    console.warn("Expected JSON but failed to read response text:", err);
  }

  return null;
}

// Normalize backend responses: Express returns {message, user}, mock returns {success, user}
function isSuccess(response, data) {
  if (!response.ok) return false;
  if (data?.success === true) return true;
  if (data?.success === false) return false;
  // Fallback: if response.ok and there's a user, treat as success
  if (data?.user) return true;
  return response.ok;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is logged in (via HTTPOnly cookie)
  useEffect(() => {
    const checkUserSession = async () => {
      try {
        const response = await fetch(`${API_BASE}/api/me`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });

        const data = await parseJSONSafely(response);
        if (isSuccess(response, data) && data?.user) {
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Session verification failed:", error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkUserSession();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await fetch(`${API_BASE}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      const data = await parseJSONSafely(response);

      if (isSuccess(response, data) && data?.user) {
        setUser(data.user);
        toast.success("Welcome back! Successfully signed in.");
        return { success: true };
      } else {
        toast.error((data && data.message) || "Failed to log in. Please try again.");
        return { success: false, message: data?.message };
      }
    } catch (error) {
      toast.error("Network error during login");
      return { success: false, message: error.message };
    }
  };

  const register = async (name, email, password, photoUrl) => {
    try {
      const response = await fetch(`${API_BASE}/api/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, photoUrl }),
        credentials: "include",
      });

      const data = await parseJSONSafely(response);

      if (isSuccess(response, data) && data?.user) {
        setUser(data.user);
        toast.success("Account created successfully!");
        return { success: true };
      } else {
        toast.error((data && data.message) || "Registration failed.");
        return { success: false, message: data?.message };
      }
    } catch (error) {
      toast.error("Network error during registration");
      return { success: false, message: error.message };
    }
  };

  const googleLogin = async (credential) => {
    try {
      const response = await fetch(`${API_BASE}/api/auth/google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ credential }),
        credentials: "include",
      });

      const data = await parseJSONSafely(response);

      if (isSuccess(response, data) && data?.user) {
        setUser(data.user);
        toast.success("Welcome! Signed in with Google successfully.");
        return { success: true };
      } else {
        toast.error((data && data.message) || "Google sign-in failed.");
        return { success: false, message: data?.message };
      }
    } catch (error) {
      toast.error("Network error during Google sign-in");
      return { success: false, message: error.message };
    }
  };

  const logout = async () => {
    try {
      const response = await fetch(`${API_BASE}/api/logout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (response?.ok) {
        setUser(null);
        toast.success("Logged out successfully.");
      } else {
        toast.error("Logout failed.");
      }
    } catch (error) {
      console.error("Logout error:", error);
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, googleLogin, logout, API_BASE }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
