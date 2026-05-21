"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Heart, Sparkles, ShieldCheck, PawPrint } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[var(--background)] pt-24 pb-32">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-1/2 -tranzinc-x-1/2 w-[120%] h-[800px] bg-gradient-to-b from-zinc-200/50 dark:from-zinc-800/30 via-transparent to-transparent rounded-[100%] blur-3xl -z-10" />
      <div className="absolute top-40 right-10 w-72 h-72 bg-zinc-300/30 dark:bg-zinc-800/50 blur-[100px] rounded-full -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Text Content */}
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm mb-8 backdrop-blur-md">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="w-4 h-4 text-zinc-800 dark:text-zinc-200" />
                </motion.div>
                <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 tracking-wide uppercase">
                  Premium Pet Adoption
                </span>
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-zinc-900 dark:text-white leading-[1.1] mb-8 tracking-tight">
                Give a <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-900 to-zinc-500 dark:from-white dark:to-zinc-400">Forever Home</span> <br />
                To a Furry Friend
              </h1>
              
              <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium">
                Every animal deserves a loving family. Explore our platform to connect with rescued pets who are waiting to bring joy, warmth, and unconditional love into your life.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-5 justify-center lg:justify-start">
                <Link
                  href="/pets"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-bold rounded-2xl hover:opacity-90 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1"
                >
                  Adopt Now
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/about"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white font-bold rounded-2xl hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all shadow-md border border-zinc-200 dark:border-zinc-800 hover:shadow-lg hover:-translate-y-1"
                >
                  Learn More
                </Link>
              </div>

              {/* Trust Indicators */}
              <style>{`
                @keyframes verifyPulse {
                  0%, 100% { color: inherit; transform: scale(1) rotate(0deg); }
                  10% { color: #22c55e; transform: scale(1.2) rotate(-10deg); }
                  20% { color: #22c55e; transform: scale(1.2) rotate(10deg); }
                  30% { color: #22c55e; transform: scale(1.2) rotate(-10deg); }
                  40% { color: inherit; transform: scale(1) rotate(0deg); }
                }
                .animate-verify {
                  animation: verifyPulse 3s ease-in-out infinite;
                  display: inline-block;
                }
                @keyframes heartBeat {
                  0%, 100% { color: inherit; transform: scale(1); }
                  50% { color: #ef4444; transform: scale(1.2); }
                }
                .animate-heartbeat {
                  animation: heartBeat 2s ease-in-out infinite;
                  display: inline-block;
                }
              `}</style>
              <div className="mt-12 flex items-center justify-center lg:justify-start gap-8">
                <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
                  <div className="animate-verify text-zinc-800 dark:text-zinc-300">
                    <ShieldCheck className="w-5 h-5 fill-transparent" />
                  </div>
                  <span className="text-sm font-medium">Verified Pets</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
                  <div className="animate-heartbeat text-zinc-800 dark:text-zinc-300">
                    <Heart className="w-5 h-5 fill-current" />
                  </div>
                  <span className="text-sm font-medium">Healthy & Vaccinated</span>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Right Image/Graphic Area */}
          <div className="relative w-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, rotate: -2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="relative aspect-[4/5] sm:aspect-square lg:aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white/80 dark:border-zinc-800/80 backdrop-blur-sm grayscale-[20%]"
            >
              <img
                src="https://images.unsplash.com/photo-1592194996308-7b43878e84a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                alt="Cute cat looking at camera"
                className="w-full h-full object-cover"
              />
              {/* Image Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 via-transparent to-transparent" />
            </motion.div>
            
            {/* Floating Glassmorphism Card 1 */}
            <motion.div
              initial={{ opacity: 0, y: 30, x: -30 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="absolute -bottom-8 -left-8 md:bottom-10 md:-left-12 z-20"
            >
              <motion.div 
                animate={{ y: -15 }}
                transition={{ duration: 2.5, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
                className="bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl p-5 rounded-3xl shadow-2xl border border-zinc-200 dark:border-zinc-800 flex items-center gap-4"
              >
                <div className="bg-zinc-900 dark:bg-white p-3.5 rounded-2xl text-white dark:text-zinc-900 shadow-lg">
                  <Heart className="w-6 h-6 fill-current text-rose-500 dark:text-rose-500" />
                </div>
                <div>
                  <p className="text-3xl font-black text-zinc-900 dark:text-white tracking-tight">5,000+</p>
                  <p className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">Happy Adoptions</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Floating Glassmorphism Card 2 */}
            <motion.div
              initial={{ opacity: 0, y: -30, x: 30 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="absolute -top-8 -right-8 md:top-10 md:-right-8 z-20"
            >
              <motion.div
                animate={{ y: 20 }}
                transition={{ duration: 3, repeat: Infinity, repeatType: "mirror", ease: "easeInOut", delay: 0.5 }}
                className="bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl p-4 rounded-3xl shadow-2xl border border-zinc-200 dark:border-zinc-800 flex items-center gap-3"
              >
                <div className="bg-zinc-100 dark:bg-zinc-800 p-3 rounded-2xl text-zinc-900 dark:text-white shadow-sm">
                  <PawPrint className="w-5 h-5 text-primary" />
                </div>
                <p className="text-sm font-bold text-zinc-800 dark:text-zinc-200 pr-2">
                  100+ Shelters
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
