"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, MapPin, Clock, PawPrint, Heart } from "lucide-react";

export function FeaturedPets() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPets() {
      try {
        const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "";
        const response = await fetch(`${API_BASE}/api/pets`);
        const data = await response.json();
        if (data.success && data.data) {
          setPets(data.data.slice(0, 6));
        }
      } catch (error) {
        console.error("Error fetching pets:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPets();
  }, []);

  const getTagColor = (index) => {
    // Assign different tags based on pet index
    if (index === 0) return { tag: "Most Popular", color: "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900" };
    if (index === 1) return { tag: "New Arrival", color: "bg-zinc-800 text-zinc-100 dark:bg-zinc-200 dark:text-zinc-800" };
    if (index === pets.length - 1) return { tag: "Latest", color: "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900" };
    return { tag: "Available", color: "bg-white/90 text-zinc-800 dark:bg-zinc-900/90 dark:text-zinc-200 backdrop-blur-md" };
  };

  return (
    <section className="py-[3.75rem] md:py-26 bg-[var(--background)] relative overflow-hidden">
      {/* Decorative floating icons */}
      <div className="absolute top-10 left-10 text-black dark:text-white opacity-10 -rotate-12 z-0 pointer-events-none select-none">
        <PawPrint className="w-32 h-32 md:w-64 md:h-64" />
      </div>
      <div className="absolute bottom-20 right-5 text-black dark:text-white opacity-10 rotate-12 z-0 pointer-events-none select-none">
        <Heart className="w-24 h-24 md:w-48 md:h-48" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-zinc-500 dark:text-zinc-400 font-bold tracking-widest uppercase text-sm mb-2 block">Available for Adoption</span>
            <h2 className="text-4xl md:text-5xl font-black text-zinc-900 dark:text-white mb-4 tracking-tight">
              Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-900 to-zinc-500 dark:from-white dark:to-zinc-400">Friends</span>
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 text-lg font-medium">
              Meet some of our adorable friends who are currently looking for a loving family. Your new best friend might be right here!
            </p>
          </div>
          <Link
            href="/pets"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-zinc-200 dark:border-zinc-700 rounded-full text-zinc-800 dark:text-zinc-200 font-bold hover:border-zinc-900 hover:text-zinc-900 dark:hover:border-white dark:hover:text-white transition-all whitespace-nowrap group"
          >
            Explore All Pets
            <ArrowRight className="w-5 h-5 group-hover:tranzinc-x-1 transition-transform" />
          </Link>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-zinc-600 dark:text-zinc-400">Loading featured pets...</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pets.map((pet, index) => {
              const { tag, color } = getTagColor(index);
              return (
                <motion.div
                  key={pet._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                  className="bg-white dark:bg-zinc-800/80 rounded-[2rem] overflow-hidden shadow-lg shadow-zinc-200/50 dark:shadow-none hover:shadow-2xl hover:shadow-zinc-300/50 dark:hover:shadow-white/5 transition-all duration-500 group border border-zinc-100 dark:border-zinc-700/50 flex flex-col"
                >
                  <div className="relative aspect-[4/3] overflow-hidden m-3 rounded-[1.5rem]">
                    <img
                      src={pet.image}
                      alt={pet.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[15%]"
                    />
                    <div className={`absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-bold shadow-sm ${color}`}>
                      {tag}
                    </div>
                    <div className="absolute top-4 right-4 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold text-zinc-800 dark:text-zinc-200 shadow-sm">
                      {pet.species}
                    </div>
                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-zinc-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  
                  <div className="p-6 pt-4 flex flex-col flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight">{pet.name}</h3>
                      <span className="text-zinc-800 dark:text-zinc-200 font-bold bg-zinc-100 dark:bg-zinc-700 px-3 py-1 rounded-full text-sm">
                        {pet.age}
                      </span>
                    </div>
                    <p className="text-zinc-500 dark:text-zinc-400 font-medium mb-6">{pet.breed}</p>
                    
                    <div className="flex flex-col gap-3 mb-8 mt-auto">
                      <div className="flex items-center gap-3 text-sm font-medium text-zinc-600 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-900/50 p-2.5 rounded-xl">
                        <MapPin className="w-5 h-5 text-zinc-400" />
                        {pet.location}
                      </div>
                      <div className="flex items-center gap-3 text-sm font-medium text-zinc-600 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-900/50 p-2.5 rounded-xl">
                        <Clock className="w-5 h-5 text-zinc-400" />
                        Available Now
                      </div>
                    </div>
                    
                    <Link
                      href={`/pets/${pet._id}`}
                      className="block w-full py-4 text-center bg-zinc-900 dark:bg-zinc-700 hover:bg-zinc-800 dark:hover:bg-zinc-600 text-white font-bold rounded-2xl transition-colors duration-300 shadow-md hover:shadow-lg"
                    >
                      View Full Details
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
