"use client";

import { motion } from "framer-motion";
import { Quote, Heart } from "lucide-react";

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
      image: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&w=600&q=80",
      quote: "I was looking for a quiet companion, and Whiskers is exactly that. Adopting her was the best decision I've made this year.",
    },
    {
      id: 3,
      name: "Mike & Shadow",
      image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=600&q=80",
      quote: "Shadow is the smartest dog I've ever met. We love going on hiking trips together. Thank you PetHaven!",
    },
    {
      id: 4,
      name: "Emily & Bella",
      image: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=600&q=80",
      quote: "Bella the rabbit is so adorable! She has her own little space in my apartment and loves to cuddle while I read.",
    },
    {
      id: 5,
      name: "David & Max",
      image: "https://images.unsplash.com/photo-1589965716319-4a041b58fa8a?auto=format&fit=crop&w=600&q=80",
      quote: "Adopting Max gave me a reason to stay active. He is the most loyal friend I could have asked for.",
    }
  ];

  // Duplicate stories to create a seamless infinite loop
  const marqueeStories = [...stories, ...stories];

  return (
    <section className="py-[3.75rem] md:py-32 bg-primary/5 dark:bg-primary/5 overflow-hidden">
      <style>{`
        .marquee-track {
          display: flex;
          width: max-content;
          animation: marquee 35s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-500/10 text-rose-500 mb-6">
            <Heart className="w-4 h-4 fill-rose-500" />
            <span className="text-sm font-bold tracking-wide uppercase">Happy Tails</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-zinc-900 dark:text-white mb-6 tracking-tight">
            Heartwarming <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-primary">Success Stories</span>
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-lg md:text-xl leading-relaxed">
            Read heartwarming stories from families who found their perfect match through our platform.
          </p>
        </motion.div>
      </div>

      {/* Marquee Container */}
      <div 
        className="w-full relative"
        style={{ 
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
          maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'
        }}
      >
        <div className="marquee-track py-8">
          {marqueeStories.map((story, index) => (
            <div
              key={`${story.id}-${index}`}
              className="bg-white dark:bg-zinc-800/80 backdrop-blur-sm rounded-3xl p-8 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col md:flex-row gap-6 items-center w-[350px] md:w-[500px] shrink-0 mx-4 border border-transparent hover:border-primary/20 cursor-pointer"
            >
              <div className="w-24 h-24 md:w-32 md:h-32 shrink-0 rounded-full overflow-hidden border-4 border-primary/20">
                <img src={story.image} alt={story.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <Quote className="w-8 h-8 text-primary/30 mb-3" />
                <p className="text-zinc-700 dark:text-zinc-300 italic mb-4 line-clamp-3 text-sm md:text-base">&quot;{story.quote}&quot;</p>
                <h4 className="font-bold text-zinc-900 dark:text-white">{story.name}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
