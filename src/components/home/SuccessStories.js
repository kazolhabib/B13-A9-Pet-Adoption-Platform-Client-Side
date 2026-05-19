"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

export function SuccessStories() {
  const stories = [
    {
      id: 1,
      name: "The Johnson Family & Buster",
      image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      quote: "Buster brought so much joy into our home. We couldn't imagine our weekends without his goofy smile and endless energy.",
    },
    {
      id: 2,
      name: "Sarah & Whiskers",
      image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      quote: "I was looking for a quiet companion, and Whiskers is exactly that. Adopting her was the best decision I've made this year.",
    },
  ];

  return (
    <section className="py-24 bg-primary/5 dark:bg-primary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-4">
            Success Stories
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-lg">
            Read heartwarming stories from families who found their perfect match through our platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {stories.map((story, index) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-white dark:bg-zinc-800 rounded-3xl p-8 shadow-sm flex flex-col md:flex-row gap-6 items-center"
            >
              <div className="w-32 h-32 shrink-0 rounded-full overflow-hidden border-4 border-primary/20">
                <img src={story.image} alt={story.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <Quote className="w-8 h-8 text-primary/30 mb-3" />
                <p className="text-zinc-700 dark:text-zinc-300 italic mb-4">&quot;{story.quote}&quot;</p>
                <h4 className="font-bold text-zinc-900 dark:text-white">{story.name}</h4>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
