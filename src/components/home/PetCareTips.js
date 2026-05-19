"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export function PetCareTips() {
  const tips = [
    "Schedule regular veterinary check-ups to keep vaccinations up to date.",
    "Provide a balanced, nutritious diet appropriate for their age and breed.",
    "Ensure they get daily exercise to maintain physical and mental health.",
    "Create a safe, comfortable resting space for them in your home.",
    "Don't forget regular grooming, brushing, and dental care.",
  ];

  return (
    <section className="py-24 bg-white dark:bg-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex-1 w-full"
          >
            <div className="relative aspect-square md:aspect-[4/3] lg:aspect-square rounded-[3rem] overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Person petting dog" 
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex-1"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-6">
              Essential Pet Care Tips
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 text-lg mb-8 leading-relaxed">
              Bringing a pet home is just the beginning. Proper care ensures they live a long, happy, and healthy life by your side.
            </p>

            <ul className="space-y-4">
              {tips.map((tip, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                  <span className="text-zinc-700 dark:text-zinc-300">{tip}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
