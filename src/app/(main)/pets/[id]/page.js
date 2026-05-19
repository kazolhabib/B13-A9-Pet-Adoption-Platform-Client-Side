"use client";

import { useState } from "react";
import { use } from "react";
import { motion } from "framer-motion";
import { MapPin, Clock, ShieldCheck, Heart, Share2, Info, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

export default function PetDetailsPage({ params }) {
  // In Next.js 15+ we unwrap params with React.use() when it's a promise, but in a client component it might not be a promise if handled by layout.
  // Actually, since Next 15, `params` is a promise, so we must unwrap it using `use(params)`.
  const resolvedParams = use(params);
  
  const [isRequesting, setIsRequesting] = useState(false);

  // Mock fetching pet details based on ID
  const pet = {
    id: resolvedParams.id,
    name: "Bella",
    species: "Dog",
    breed: "Golden Retriever",
    age: "2 Years",
    gender: "Female",
    location: "New York, NY",
    image: "https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    dateAdded: "2023-10-01",
    healthStatus: "Fully Vaccinated, Spayed",
    adoptionFee: 150,
    description: "Bella is a sweet, energetic Golden Retriever looking for an active family. She loves long walks, playing fetch in the park, and cuddling on the couch. She gets along great with other dogs and is very gentle with children. Bella is fully house-trained and knows basic commands like sit, stay, and paw.",
    ownerEmail: "owner@example.com",
    status: "Available"
  };

  const handleAdoptRequest = () => {
    setIsRequesting(true);
    setTimeout(() => {
      setIsRequesting(false);
      toast.success(`Adoption request sent for ${pet.name}!`);
    }, 1500);
  };

  const handleShare = () => {
    toast.success("Link copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900/50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex text-sm text-zinc-500 dark:text-zinc-400 mb-8">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/pets" className="hover:text-primary transition-colors">Pets</Link>
          <span className="mx-2">/</span>
          <span className="text-zinc-900 dark:text-zinc-200 font-medium">{pet.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Pet Image Gallery (Simplified for demo) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-xl border-8 border-white dark:border-zinc-800">
              <img 
                src={pet.image} 
                alt={pet.name} 
                className="w-full h-full object-cover"
              />
              <div className="absolute top-6 right-6">
                <span className="px-4 py-2 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md rounded-full text-sm font-bold text-zinc-900 dark:text-white shadow-lg flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  {pet.status}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Pet Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col"
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-4xl md:text-5xl font-extrabold text-zinc-900 dark:text-white mb-2">
                  {pet.name}
                </h1>
                <p className="text-xl text-zinc-600 dark:text-zinc-400 font-medium">
                  {pet.breed} • {pet.species}
                </p>
              </div>
              <button 
                onClick={handleShare}
                className="p-3 bg-white dark:bg-zinc-800 rounded-full text-zinc-500 hover:text-primary shadow-sm border border-zinc-100 dark:border-zinc-700 transition-colors"
                title="Share"
              >
                <Share2 className="w-6 h-6" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-white dark:bg-zinc-800 p-4 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-700 flex flex-col items-center justify-center text-center">
                <span className="text-sm text-zinc-500 dark:text-zinc-400 mb-1">Age</span>
                <span className="text-lg font-bold text-zinc-900 dark:text-white">{pet.age}</span>
              </div>
              <div className="bg-white dark:bg-zinc-800 p-4 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-700 flex flex-col items-center justify-center text-center">
                <span className="text-sm text-zinc-500 dark:text-zinc-400 mb-1">Gender</span>
                <span className="text-lg font-bold text-zinc-900 dark:text-white">{pet.gender}</span>
              </div>
            </div>

            <div className="space-y-4 mb-8 text-zinc-700 dark:text-zinc-300">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-primary" />
                <span className="font-medium">{pet.location}</span>
              </div>
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-primary" />
                <span className="font-medium">{pet.healthStatus}</span>
              </div>
              <div className="flex items-center gap-3">
                <Info className="w-5 h-5 text-primary" />
                <span className="font-medium">Adoption Fee: ${pet.adoptionFee}</span>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">About {pet.name}</h3>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {pet.description}
              </p>
            </div>

            <div className="mt-auto pt-6 border-t border-zinc-200 dark:border-zinc-700">
              <button 
                onClick={handleAdoptRequest}
                disabled={isRequesting}
                className="w-full flex items-center justify-center gap-2 py-4 px-8 bg-primary text-white text-lg font-bold rounded-2xl hover:bg-primary-600 transition-all shadow-lg hover:shadow-xl hover:-tranzinc-y-1 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:tranzinc-y-0"
              >
                {isRequesting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    Sending Request...
                  </span>
                ) : (
                  <>
                    <Heart className="w-6 h-6 fill-white" />
                    Request to Adopt {pet.name}
                  </>
                )}
              </button>
              <p className="text-center text-sm text-zinc-500 dark:text-zinc-400 mt-4">
                By requesting to adopt, you agree to our <Link href="#" className="text-primary hover:underline">Adoption Policy</Link>.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
