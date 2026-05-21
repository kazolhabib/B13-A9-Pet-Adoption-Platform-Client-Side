"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Search, MapPin, Clock, ArrowUpDown, ArrowRight, Sparkles, Filter, Loader2, PawPrint, Heart } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

export default function AllPetsPage() {
  const { API_BASE } = useAuth();
  const [pets, setPets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecies, setSelectedSpecies] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [typedText, setTypedText] = useState("");

  // Typewriter effect
  useEffect(() => {
    const texts = ["Best Friend", "Best Buddy"];
    let textIndex = 0;
    let i = 0;
    let isDeleting = false;
    let timeout;
    
    const type = () => {
      const currentText = texts[textIndex];
      setTypedText(currentText.substring(0, i));
      
      if (isDeleting) {
        if (i > 0) {
          i--;
          timeout = setTimeout(type, 80);
        } else {
          isDeleting = false;
          textIndex = (textIndex + 1) % texts.length;
          timeout = setTimeout(type, 500);
        }
      } else {
        if (i < currentText.length) {
          i++;
          timeout = setTimeout(type, 120);
        } else {
          isDeleting = true;
          timeout = setTimeout(type, 2000);
        }
      }
    };
    
    timeout = setTimeout(type, 500);
    return () => clearTimeout(timeout);
  }, []);

  // Quick category tabs list
  const categories = [
    { name: "All", label: "All Companions" },
    { name: "Dog", label: "Dogs" },
    { name: "Cat", label: "Cats" },
    { name: "Bird", label: "Birds" },
    { name: "Rabbit", label: "Rabbits" }
  ];

  // Fetch pets from server with debounce
  useEffect(() => {
    const fetchHandler = setTimeout(async () => {
      setIsLoading(true);
      try {
        const queryParams = new URLSearchParams();
        if (selectedSpecies && selectedSpecies !== "All") {
          queryParams.append("species", selectedSpecies);
        }
        if (searchTerm) {
          queryParams.append("search", searchTerm);
        }
        if (sortBy) {
          queryParams.append("sort", sortBy);
        }

        const response = await fetch(`${API_BASE}/api/pets?${queryParams.toString()}`);
        const resData = await response.json();
        
        if (response.ok) {
          setPets(resData.success ? resData.data : Array.isArray(resData) ? resData : []);
        } else {
          toast.error(resData.message || "Failed to load companions.");
        }
      } catch (error) {
        toast.error("Network error loading companions.");
        console.warn("All pets unavailable. Is the backend API running?", error?.message || error);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(fetchHandler);
  }, [searchTerm, selectedSpecies, sortBy, API_BASE]);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Premium background ambient blur */}
      <div className="absolute top-0 left-1/4 -mt-24 w-96 h-96 bg-primary/10 dark:bg-primary/5 blur-3xl rounded-full z-0" />
      <div className="absolute bottom-1/3 right-1/4 -mb-24 w-80 h-80 bg-rose-500/10 dark:bg-rose-500/5 blur-3xl rounded-full z-0" />

      {/* Decorative floating icons */}
      <div className="absolute top-20 left-10 md:left-20 text-black dark:text-white opacity-10 -rotate-12 z-0 pointer-events-none select-none">
        <PawPrint className="w-48 h-48 md:w-80 md:h-80" />
      </div>
      <div className="absolute top-64 right-5 md:right-20 text-black dark:text-white opacity-10 rotate-12 z-0 pointer-events-none select-none">
        <Heart className="w-32 h-32 md:w-64 md:h-64" />
      </div>
      <div className="absolute bottom-40 left-1/4 text-black dark:text-white opacity-10 rotate-45 z-0 pointer-events-none select-none">
        <PawPrint className="w-40 h-40 md:w-72 md:h-72" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Hero Area */}
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-900 text-xs font-bold tracking-widest uppercase text-zinc-500 dark:text-zinc-400 mb-6 border border-zinc-200/50 dark:border-zinc-800/50 shadow-sm"
          >
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }}>
              <Sparkles className="w-4 h-4 text-primary" />
            </motion.div>
            Our Companions
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black text-zinc-900 dark:text-white mb-6 tracking-tight"
          >
            Find Your{" "}
            <span className="relative inline-block border-b-[5px] md:border-b-[8px] border-zinc-300 dark:border-zinc-700 pb-1 text-inherit">
              <span className="invisible">Best Friend</span>
              <span className="absolute left-0 top-0 whitespace-nowrap text-inherit">
                {typedText}<span className="animate-[pulse_1s_ease-in-out_infinite] text-primary ml-[2px]">|</span>
              </span>
            </span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed max-w-2xl mx-auto"
          >
            Browse our list of rescue companions looking for a forever home. Each one is vaccinated, house-trained, and ready to share their love.
          </motion.p>
        </div>

        {/* Premium Filter Controls */}
        <div className="mb-12 space-y-6">
          {/* Quick Category Chips */}
          <div className="flex justify-center overflow-x-auto no-scrollbar py-2 -mx-4 px-4 sm:mx-0 sm:px-0">
            <div className="flex gap-3">
              {categories.map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => setSelectedSpecies(cat.name)}
                  className={`px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 whitespace-nowrap ${
                    selectedSpecies === cat.name
                      ? "bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 shadow-md shadow-zinc-900/10 dark:shadow-white/5 scale-[1.03]"
                      : "bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/80 text-zinc-500 dark:text-zinc-400 hover:border-zinc-900 dark:hover:border-white hover:text-zinc-900 dark:hover:text-white"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Search Console Block */}
          <div className="max-w-3xl mx-auto">
            <div className="backdrop-blur-md bg-white/60 dark:bg-zinc-900/60 border border-zinc-200/50 dark:border-zinc-800/50 p-3 rounded-[2rem] shadow-xl shadow-zinc-200/30 dark:shadow-none flex flex-col md:flex-row gap-3 items-center">
              {/* Search input field */}
              <div className="relative flex-1 w-full pl-3">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-400" />
                <input
                  type="text"
                  placeholder="Search by name or breed..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-4 py-3.5 bg-transparent border-none focus:outline-none focus:ring-0 text-zinc-900 dark:text-white placeholder-zinc-400 text-base"
                />
              </div>

              {/* Vertical separator */}
              <div className="hidden md:block w-px h-8 bg-zinc-200 dark:bg-zinc-800" />

              {/* Sorting options */}
              <div className="relative w-full md:w-56 pr-2">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="block w-full pl-4 pr-10 py-3.5 bg-transparent border-none text-zinc-700 dark:text-zinc-300 font-bold text-sm focus:outline-none focus:ring-0 appearance-none cursor-pointer"
                >
                  <option value="newest" className="bg-white dark:bg-zinc-900">Newest Arrivals</option>
                  <option value="oldest" className="bg-white dark:bg-zinc-900">Oldest First</option>
                  <option value="name-asc" className="bg-white dark:bg-zinc-900">Name (A-Z)</option>
                  <option value="name-desc" className="bg-white dark:bg-zinc-900">Name (Z-A)</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400">
                  <ArrowUpDown className="h-4 w-4" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pet Grid */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <Loader2 className="w-12 h-12 animate-spin text-primary" />
            <p className="text-zinc-500 dark:text-zinc-400 font-semibold text-lg">Loading companion matches...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            <AnimatePresence mode="popLayout">
              {pets.length > 0 ? (
                pets.map((pet) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.95, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 15 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    key={pet._id}
                    className="bg-white dark:bg-zinc-900/60 backdrop-blur-md rounded-[2.5rem] border border-zinc-200/50 dark:border-zinc-800/50 hover:border-zinc-300 dark:hover:border-zinc-750 shadow-[0_8px_30px_rgb(0,0,0,0.02)] dark:shadow-none hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] dark:hover:shadow-white/[0.01] transition-all duration-500 group flex flex-col overflow-hidden"
                  >
                    {/* Image container */}
                    <div className="relative aspect-[5/4] overflow-hidden m-3.5 rounded-[2rem] bg-zinc-100 dark:bg-zinc-800/60">
                      <img
                        src={pet.image || pet.imageUrl}
                        alt={pet.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      
                      {/* Species glass badge */}
                      <div className="absolute top-4 left-4 bg-zinc-950/80 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-black text-white border border-white/10 shadow-sm uppercase tracking-wider">
                        {pet.species}
                      </div>

                      {/* Age glass badge */}
                      <div className="absolute top-4 right-4 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold text-zinc-900 dark:text-white border border-zinc-200/20 dark:border-zinc-800/20 shadow-sm">
                        {pet.age}
                      </div>

                      {/* Adopted status overlay */}
                      {pet.status === "adopted" && (
                        <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center">
                          <span className="px-5 py-2.5 bg-zinc-900 text-white font-extrabold uppercase tracking-widest text-sm rounded-xl border border-white/15 shadow-2xl scale-[1.05]">
                            Adopted
                          </span>
                        </div>
                      )}
                    </div>
                    
                    {/* Info block */}
                    <div className="p-6 pt-2 flex flex-col flex-1">
                      <span className="text-[10px] uppercase tracking-widest font-black text-zinc-400 dark:text-zinc-500 mb-1 block">
                        {pet.breed}
                      </span>
                      <h3 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight mb-4 group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition-colors">
                        {pet.name}
                      </h3>
                      
                      {/* Minimalist divider */}
                      <div className="h-px w-full bg-zinc-100 dark:bg-zinc-800/80 mb-5" />

                      {/* Inline metadata icons */}
                      <div className="flex items-center justify-between text-xs font-bold text-zinc-500 dark:text-zinc-400 mt-auto">
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-4 h-4 text-zinc-400" />
                          <span>{pet.location}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-zinc-400 dark:text-zinc-500 text-[10px]">
                          <Clock className="w-3.5 h-3.5" />
                          <span>Added {new Date(pet.dateAdded || pet.createdAt).toLocaleDateString(undefined, {month: 'short', day: 'numeric'})}</span>
                        </div>
                      </div>
                      
                      {/* View Details CTA */}
                      <Link
                        href={`/pets/${pet._id}`}
                        className="mt-6 w-full py-4 text-center bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 font-bold rounded-2xl hover:bg-zinc-850 dark:hover:bg-zinc-100 transition-all duration-300 flex items-center justify-center gap-2 group/btn shadow-[0_4px_12px_rgba(0,0,0,0.03)] dark:shadow-none hover:scale-[1.01]"
                      >
                        <span>Meet {pet.name}</span>
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                      </Link>
                    </div>
                  </motion.div>
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="col-span-full py-24 text-center"
                >
                  <div className="inline-flex items-center justify-center w-24 h-24 bg-zinc-100 dark:bg-zinc-900 rounded-full mb-6 text-zinc-400 border border-zinc-200/50 dark:border-zinc-800/50">
                    <Filter className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-black text-zinc-900 dark:text-white mb-2">No Companions Found</h3>
                  <p className="text-zinc-500 dark:text-zinc-400 text-sm max-w-sm mx-auto font-medium">We couldn&apos;t find any pets matching your criteria. Try adjusting your filters or search terms.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
