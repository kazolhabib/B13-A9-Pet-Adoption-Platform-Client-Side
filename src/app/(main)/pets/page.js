"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Search, Filter, MapPin, Clock, ArrowUpDown } from "lucide-react";

const DUMMY_PETS = [
  { id: 1, name: "Bella", species: "Dog", breed: "Golden Retriever", age: "2 Years", location: "New York, NY", image: "https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", dateAdded: "2023-10-01" },
  { id: 2, name: "Luna", species: "Cat", breed: "Persian", age: "1 Year", location: "Los Angeles, CA", image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", dateAdded: "2023-10-05" },
  { id: 3, name: "Max", species: "Dog", breed: "German Shepherd", age: "3 Years", location: "Chicago, IL", image: "https://images.unsplash.com/photo-1589965716319-4a041b58fa8a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", dateAdded: "2023-09-20" },
  { id: 4, name: "Oliver", species: "Cat", breed: "Maine Coon", age: "4 Months", location: "Seattle, WA", image: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", dateAdded: "2023-10-10" },
  { id: 5, name: "Charlie", species: "Dog", breed: "French Bulldog", age: "1.5 Years", location: "Austin, TX", image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", dateAdded: "2023-09-15" },
  { id: 6, name: "Mango", species: "Bird", breed: "Cockatiel", age: "2 Years", location: "Miami, FL", image: "https://images.unsplash.com/photo-1452570053594-1b985d6ea890?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", dateAdded: "2023-10-12" },
  { id: 7, name: "Snowball", species: "Rabbit", breed: "Holland Lop", age: "1 Year", location: "Denver, CO", image: "https://images.unsplash.com/photo-1518796745738-41048802f99a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", dateAdded: "2023-10-02" },
  { id: 8, name: "Simba", species: "Cat", breed: "Bengal", age: "2 Years", location: "Portland, OR", image: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", dateAdded: "2023-09-28" },
];

export default function AllPetsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecies, setSelectedSpecies] = useState("All");
  const [sortBy, setSortBy] = useState("newest");

  // Filtering and Sorting logic
  let filteredPets = DUMMY_PETS.filter(pet => {
    const matchesSearch = pet.name.toLowerCase().includes(searchTerm.toLowerCase()) || pet.breed.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecies = selectedSpecies === "All" || pet.species === selectedSpecies;
    return matchesSearch && matchesSpecies;
  });

  filteredPets = filteredPets.sort((a, b) => {
    if (sortBy === "newest") return new Date(b.dateAdded) - new Date(a.dateAdded);
    if (sortBy === "oldest") return new Date(a.dateAdded) - new Date(b.dateAdded);
    if (sortBy === "name-asc") return a.name.localeCompare(b.name);
    if (sortBy === "name-desc") return b.name.localeCompare(a.name);
    return 0;
  });

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900/50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 text-center max-w-2xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-extrabold text-zinc-900 dark:text-white mb-4">
            Find Your <span className="text-primary">Best Friend</span>
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            Browse our list of adorable pets looking for a forever home. Use the filters to find the perfect match for you.
          </p>
        </div>

        {/* Filters Top Bar */}
        <div className="bg-white dark:bg-zinc-800 p-4 md:p-6 rounded-3xl shadow-sm border border-zinc-200 dark:border-zinc-700 mb-10">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1 w-full">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-400">
                <Search className="h-5 w-5" />
              </div>
              <input
                type="text"
                placeholder="Search by name or breed..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-11 pr-4 py-3 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-2xl text-zinc-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
            </div>

            <div className="flex w-full md:w-auto gap-4">
              {/* Filter by Species */}
              <div className="relative flex-1 md:w-48">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-400">
                  <Filter className="h-5 w-5" />
                </div>
                <select
                  value={selectedSpecies}
                  onChange={(e) => setSelectedSpecies(e.target.value)}
                  className="block w-full pl-11 pr-10 py-3 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-2xl text-zinc-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent appearance-none cursor-pointer"
                >
                  <option value="All">All Species</option>
                  <option value="Dog">Dogs</option>
                  <option value="Cat">Cats</option>
                  <option value="Bird">Birds</option>
                  <option value="Rabbit">Rabbits</option>
                </select>
              </div>

              {/* Sort By */}
              <div className="relative flex-1 md:w-48">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-400">
                  <ArrowUpDown className="h-5 w-5" />
                </div>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="block w-full pl-11 pr-10 py-3 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-2xl text-zinc-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent appearance-none cursor-pointer"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="name-asc">Name (A-Z)</option>
                  <option value="name-desc">Name (Z-A)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Pet Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <AnimatePresence>
            {filteredPets.length > 0 ? (
              filteredPets.map((pet, index) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  key={pet.id}
                  className="bg-white dark:bg-zinc-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group border border-zinc-100 dark:border-zinc-700"
                >
                  <div className="relative aspect-square overflow-hidden bg-zinc-100 dark:bg-zinc-700">
                    <img
                      src={pet.image}
                      alt={pet.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-zinc-700 dark:text-zinc-200 shadow-sm">
                      {pet.species}
                    </div>
                  </div>
                  
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="text-xl font-bold text-zinc-900 dark:text-white">{pet.name}</h3>
                      <span className="text-primary font-medium bg-primary/10 px-2 py-1 rounded-md text-xs">
                        {pet.age}
                      </span>
                    </div>
                    <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-4">{pet.breed}</p>
                    
                    <div className="flex flex-col gap-2 mb-6">
                      <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                        <MapPin className="w-4 h-4" />
                        {pet.location}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                        <Clock className="w-4 h-4" />
                        Added {new Date(pet.dateAdded).toLocaleDateString()}
                      </div>
                    </div>
                    
                    <Link
                      href={`/pets/${pet.id}`}
                      className="block w-full py-3 text-center bg-zinc-100 dark:bg-zinc-700 hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white text-zinc-700 dark:text-zinc-200 font-medium rounded-xl transition-colors duration-300"
                    >
                      View Details
                    </Link>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full py-20 text-center"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 bg-zinc-100 dark:bg-zinc-800 rounded-full mb-6 text-zinc-400">
                  <Search className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">No pets found</h3>
                <p className="text-zinc-500 dark:text-zinc-400">Try adjusting your filters or search term.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
