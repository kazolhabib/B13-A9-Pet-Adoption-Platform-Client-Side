"use client";

import { motion } from "framer-motion";
import { HeartHandshake, ShieldCheck, Stethoscope, Sparkles } from "lucide-react";

export function WhyAdopt() {
  const reasons = [
    {
      icon: HeartHandshake,
      title: "Save a Life",
      description: "When you adopt, you're not just bringing a pet home; you're literally saving a life and making room for another animal in need at the shelter.",
      color: "from-rose-400 to-red-500",
      iconColor: "text-rose-500",
      bgLight: "bg-rose-50",
      bgDark: "dark:bg-rose-500/10"
    },
    {
      icon: Stethoscope,
      title: "Healthy & Vaccinated",
      description: "Our pets receive thorough medical examinations, vaccinations, and are spayed or neutered before they are ready for their new forever homes.",
      color: "from-blue-400 to-indigo-500",
      iconColor: "text-blue-500",
      bgLight: "bg-blue-50",
      bgDark: "dark:bg-blue-500/10"
    },
    {
      icon: ShieldCheck,
      title: "Lifelong Support",
      description: "We don't just say goodbye. We provide ongoing resources, behavioral tips, and a community to support you throughout your pet parenting journey.",
      color: "from-emerald-400 to-teal-500",
      iconColor: "text-emerald-500",
      bgLight: "bg-emerald-50",
      bgDark: "dark:bg-emerald-500/10"
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <section id="why-adopt" className="relative py-[3.75rem] md:py-28 bg-zinc-50 dark:bg-zinc-900/50 overflow-hidden">
      {/* Decorative Background Blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px] -z-10 mix-blend-multiply dark:mix-blend-overlay animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[100px] -z-10 mix-blend-multiply dark:mix-blend-overlay animate-pulse" style={{ animationDelay: '2s' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-bold tracking-wide uppercase">Make a Difference</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-zinc-900 dark:text-white mb-6 tracking-tight">
            Why <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-amber-500">Adopt</span> Pets?
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-lg md:text-xl leading-relaxed">
            Choosing to adopt is a beautiful decision that brings endless joy and transforms lives. Here is why you should consider giving a rescue a second chance.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
        >
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.02 }}
                className="relative group h-full"
              >
                {/* Glow effect on hover */}
                <div className={`absolute inset-0 bg-gradient-to-r ${reason.color} rounded-[2rem] blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-10`} />
                
                <div className="h-full p-8 sm:p-10 rounded-[2rem] bg-white/80 dark:bg-zinc-800/80 backdrop-blur-xl border border-zinc-200/50 dark:border-zinc-700/50 shadow-xl shadow-zinc-200/20 dark:shadow-none flex flex-col items-center text-center transition-all duration-300">
                  
                  <div className={`w-20 h-20 rounded-3xl flex items-center justify-center mb-8 ${reason.bgLight} ${reason.bgDark} group-hover:scale-110 transition-transform duration-500 shadow-inner`}>
                    <Icon className={`w-10 h-10 ${reason.iconColor}`} />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4 group-hover:text-primary transition-colors">
                    {reason.title}
                  </h3>
                  
                  <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-base">
                    {reason.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
