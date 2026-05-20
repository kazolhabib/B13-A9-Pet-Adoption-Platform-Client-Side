"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { PawPrint, Mail, Lock, LogIn } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { GoogleLogin } from "@react-oauth/google";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, googleLogin } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const res = await login(email, password);
    setIsSubmitting(false);
    if (res.success) {
      router.push("/pets");
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    const res = await googleLogin(credentialResponse.credential);
    if (res.success) {
      router.push("/pets");
    }
  };

  const handleGoogleError = () => {
    // Toast is already handled inside googleLogin if needed
    console.error("Google Sign-In popup was closed or failed.");
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-zinc-50 dark:bg-zinc-900/50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white dark:bg-zinc-800 rounded-[2rem] p-8 shadow-xl border border-zinc-100 dark:border-zinc-700"
      >
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
            <PawPrint className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-extrabold text-zinc-900 dark:text-white mb-2">
            Welcome Back
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400">
            Sign in to continue to PetHaven
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
                <Mail className="h-5 w-5" />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-zinc-200 dark:border-zinc-600 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all placeholder-zinc-400"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Password
              </label>
              <a href="#" className="text-sm text-primary hover:text-primary-600 font-medium transition-colors">
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
                <Lock className="h-5 w-5" />
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-zinc-200 dark:border-zinc-600 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all placeholder-zinc-400"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 border border-transparent rounded-xl shadow-sm text-base font-medium text-white dark:text-zinc-950 bg-primary hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all disabled:opacity-75"
          >
            {isSubmitting ? (
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            ) : (
              <>
                <LogIn className="w-5 h-5" />
                Sign In
              </>
            )}
          </button>
        </form>

        <div className="mt-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-zinc-200 dark:border-zinc-700" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-zinc-800 text-zinc-500">
                Or continue with
              </span>
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              shape="rectangular"
              size="large"
              width="360"
              text="signin_with"
              theme="outline"
            />
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-zinc-600 dark:text-zinc-400">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-medium text-primary hover:text-primary-600 transition-colors"
          >
            Sign up now
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
