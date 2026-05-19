"use client";

import { motion } from "framer-motion";
import { HeartHandshake, ShieldCheck, Stethoscope } from "lucide-react";

export function WhyAdopt() {
  const reasons = [
    {
      icon: HeartHandshake,
      title: "Save a Life",
      description: "When you adopt, you're not just bringing a pet home; you're literally saving a life and making room for another animal in need at the shelter.",
      color: "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400",
    },
    {
      icon: Stethoscope,
      title: "Healthy & Vaccinated",
      description: "Our pets receive thorough medical examinations, vaccinations, and are spayed or neutered before they are ready for their new forever homes.",
      color: "bg-zinc-100 dark:bg-zinc-900/30 text-zinc-600 dark:text-zinc-400",
    },
    {
      icon: ShieldCheck,
      title: "Lifelong Support",
      description: "We don't just say goodbye. We provide ongoing resources, behavioral tips, and a community to support you throughout your pet parenting journey.",
      color: "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400",
    },
  ];

  return (
    <section className="py-24 bg-white dark:bg-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-4">
            Why Adopt Pets?
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-lg">
            Choosing to adopt is a beautiful decision that brings endless joy and transforms lives. Here is why you should consider giving a rescue a second chance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="p-8 rounded-3xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-700 hover:shadow-lg transition-shadow"
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${reason.color}`}>
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">
                  {reason.title}
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {reason.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
