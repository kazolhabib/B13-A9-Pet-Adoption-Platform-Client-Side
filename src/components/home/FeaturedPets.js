"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, MapPin, Clock } from "lucide-react";

export function FeaturedPets() {
  const pets = [
    { id: 1, name: "Bella", species: "Dog", breed: "Golden Retriever", age: "2 Years", location: "New York, NY", image: "https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", tag: "Most Popular" },
    { id: 2, name: "Luna", species: "Cat", breed: "Persian", age: "1 Year", location: "Los Angeles, CA", image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", tag: "New Arrival" },
    { id: 3, name: "Max", species: "Dog", breed: "German Shepherd", age: "3 Years", location: "Chicago, IL", image: "https://images.unsplash.com/photo-1589965716319-4a041b58fa8a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", tag: "Urgent" },
    { id: 4, name: "Oliver", species: "Cat", breed: "Maine Coon", age: "4 Months", location: "Seattle, WA", image: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", tag: "Kitten" },
    { id: 5, name: "Charlie", species: "Dog", breed: "French Bulldog", age: "1.5 Years", location: "Austin, TX", image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", tag: "Friendly" },
    { id: 6, name: "Mango", species: "Bird", breed: "Cockatiel", age: "2 Years", location: "Miami, FL", image: "https://images.unsplash.com/photo-1452570053594-1b985d6ea890?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", tag: "Playful" },
  ];

  const getTagColor = (tag) => {
    switch(tag) {
      case "Urgent": return "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900";
      case "New Arrival": return "bg-zinc-800 text-zinc-100 dark:bg-zinc-200 dark:text-zinc-800";
      default: return "bg-white/90 text-zinc-800 dark:bg-zinc-900/90 dark:text-zinc-200 backdrop-blur-md";
    }
  };

  return (
    <section className="py-28 bg-[var(--background)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-zinc-500 dark:text-zinc-400 font-bold tracking-widest uppercase text-sm mb-2 block">Available for Adoption</span>
            <h2 className="text-4xl md:text-5xl font-black text-zinc-900 dark:text-white mb-4 tracking-tight">
              Featured Friends
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {pets.map((pet, index) => (
            <motion.div
              key={pet.id}
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
                <div className={`absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-bold shadow-sm ${getTagColor(pet.tag)}`}>
                  {pet.tag}
                </div>
                <div className="absolute top-4 right-4 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold text-zinc-800 dark:text-zinc-200 shadow-sm">
                  {pet.species}
                </div>
                {/* Gradient overlay at bottom of image for sleek transition */}
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
                  href={`/pets/${pet.id}`}
                  className="block w-full py-4 text-center bg-zinc-900 dark:bg-zinc-700 hover:bg-zinc-800 dark:hover:bg-zinc-600 text-white font-bold rounded-2xl transition-colors duration-300 shadow-md hover:shadow-lg"
                >
                  View Full Details
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
