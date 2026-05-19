"use client";

import { motion } from "framer-motion";
import { Search, HeartHandshake, FileCheck, Home } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      id: "01",
      title: "Find Your Match",
      description: "Browse our extensive list of rescued pets. Filter by species, age, or breed to find the perfect companion for your lifestyle.",
      icon: Search,
    },
    {
      id: "02",
      title: "Meet & Greet",
      description: "Schedule a visit to meet the pet in person. Spend time together to ensure it's a perfect connection for both of you.",
      icon: HeartHandshake,
    },
    {
      id: "03",
      title: "Submit Application",
      description: "Fill out a simple adoption application. Our team will review your details to ensure a safe and happy environment.",
      icon: FileCheck,
    },
    {
      id: "04",
      title: "Welcome Home",
      description: "Once approved, pay the adoption fee and take your new best friend home! We'll provide all medical records and a starter kit.",
      icon: Home,
    },
  ];

  return (
    <section className="py-32 bg-zinc-50 dark:bg-[var(--background)] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-zinc-500 dark:text-zinc-400 font-bold tracking-widest uppercase text-sm mb-3 block">
            Adoption Process
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-zinc-900 dark:text-white mb-6 tracking-tight">
            How It Works
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-lg font-medium">
            We've streamlined our adoption process to make it as simple and transparent as possible, so you can focus on welcoming your new family member.
          </p>
        </div>

        <div className="relative">
          {/* Connecting Line for Desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-zinc-200 dark:via-zinc-800 to-transparent -translate-y-1/2 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
                className="relative group"
              >
                <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-8 rounded-[2rem] shadow-sm hover:shadow-2xl hover:shadow-zinc-200/50 dark:hover:shadow-white/5 transition-all duration-500 h-full relative z-10 flex flex-col items-center text-center">
                  
                  {/* Floating Number */}
                  <div className="absolute -top-6 -right-4 text-7xl font-black text-zinc-100 dark:text-zinc-800/50 -z-10 transition-transform duration-500 group-hover:-translate-y-2 group-hover:scale-110">
                    {step.id}
                  </div>

                  {/* Icon */}
                  <div className="w-20 h-20 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 shadow-inner">
                    <step.icon className="w-10 h-10 text-zinc-900 dark:text-white" />
                  </div>

                  <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-4 tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-zinc-500 dark:text-zinc-400 font-medium text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
