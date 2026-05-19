"use client";

import { motion } from "framer-motion";
import { Eye, Target, Users } from "lucide-react";

export function OurVision() {
  const cards = [
    {
      icon: Eye,
      title: "Our Vision",
      text: "To create a world where every companion animal finds a safe, loving, and permanent home, eliminating the need for shelters.",
    },
    {
      icon: Target,
      title: "Our Mission",
      text: "To connect compassionate people with pets in need, providing resources and education to ensure successful, lifelong adoptions.",
    },
    {
      icon: Users,
      title: "Our Values",
      text: "We believe in empathy, transparency, and the profound bond between humans and animals. Every life matters.",
    },
  ];

  return (
    <section className="py-24 bg-zinc-900 dark:bg-black text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-white/10 blur-3xl rounded-full" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-72 h-72 bg-zinc-500/20 blur-3xl rounded-full" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our Vision & Mission
          </h2>
          <p className="text-zinc-400 text-lg">
            We are driven by a deep commitment to animal welfare and the belief that every pet deserves a second chance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-zinc-800/50 backdrop-blur-sm border border-zinc-700 p-8 rounded-3xl text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 text-white mb-6">
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-4">{card.title}</h3>
                <p className="text-zinc-400 leading-relaxed">{card.text}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
