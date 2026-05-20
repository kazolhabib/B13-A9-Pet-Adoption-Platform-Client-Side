"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Clock, ShieldCheck, Heart, Share2, Info, X, Loader2 } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function PetDetailsPage({ params }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const { user, API_BASE } = useAuth();
  
  const [pet, setPet] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Adoption request modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchPetDetails = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${API_BASE}/api/pets/${resolvedParams.id}`);
        const data = await response.json();
        if (response.ok && data.success) {
          setPet(data.data);
        } else {
          toast.error(data.message || "Failed to load companion details.");
        }
      } catch (error) {
        toast.error("Network error loading companion details.");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPetDetails();
  }, [resolvedParams.id, API_BASE]);

  const handleAdoptRequestClick = () => {
    if (!user) {
      toast.error("Please sign in to submit an adoption request.");
      router.push("/login");
      return;
    }
    setIsModalOpen(true);
  };

  const handleModalSubmit = async (e) => {
    e.preventDefault();
    if (!phone || !address) {
      toast.error("Phone number and address are required.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(`${API_BASE}/api/requests`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          petId: pet._id,
          phone,
          address,
          notes,
        }),
        credentials: "include",
      });

      const data = await response.json();
      if (response.ok && data.success) {
        toast.success(`Adoption request successfully submitted for ${pet.name}!`);
        setIsModalOpen(false);
        setPhone("");
        setAddress("");
        setNotes("");
      } else {
        toast.error(data.message || "Failed to submit adoption request.");
      }
    } catch (error) {
      toast.error("Network error submitting adoption request.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard!");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 animate-spin text-primary" />
          <p className="text-zinc-500 dark:text-zinc-400 font-medium">Fetching companion details...</p>
        </div>
      </div>
    );
  }

  if (!pet) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">Companion Not Found</h2>
          <p className="text-zinc-500 dark:text-zinc-400 mb-6">The companion listing you are looking for does not exist.</p>
          <Link href="/pets" className="px-6 py-2.5 bg-primary text-white font-medium rounded-xl">
            Back to Companions
          </Link>
        </div>
      </div>
    );
  }

  const isOwner = user?.email === pet.ownerEmail;
  const isAdopted = pet.status === "adopted";
  const petStatusCap = pet.status.charAt(0).toUpperCase() + pet.status.slice(1);

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
          {/* Pet Image Gallery */}
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
                  <span className={`w-2 h-2 rounded-full ${isAdopted ? 'bg-zinc-400' : 'bg-green-500 animate-pulse'}`}></span>
                  {petStatusCap}
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
                <span className="font-medium">Adoption Fee: {pet.adoptionFee > 0 ? `$${pet.adoptionFee}` : "Free"}</span>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">About {pet.name}</h3>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {pet.description}
              </p>
            </div>

            <div className="mt-auto pt-6 border-t border-zinc-200 dark:border-zinc-700">
              {isAdopted ? (
                <button 
                  disabled
                  className="w-full flex items-center justify-center gap-2 py-4 px-8 bg-zinc-200 dark:bg-zinc-850 text-zinc-400 dark:text-zinc-500 text-lg font-bold rounded-2xl cursor-not-allowed"
                >
                  <Heart className="w-6 h-6 text-zinc-400" />
                  Already Adopted
                </button>
              ) : isOwner ? (
                <button 
                  disabled
                  className="w-full flex items-center justify-center gap-2 py-4 px-8 bg-zinc-100 dark:bg-zinc-850 text-zinc-400 dark:text-zinc-500 text-lg font-bold rounded-2xl cursor-not-allowed border border-zinc-200 dark:border-zinc-800"
                >
                  You listed this companion for adoption
                </button>
              ) : (
                <button 
                  onClick={handleAdoptRequestClick}
                  className="w-full flex items-center justify-center gap-2 py-4 px-8 bg-primary text-white dark:text-zinc-950 text-lg font-bold rounded-2xl hover:bg-primary-600 dark:hover:bg-zinc-100 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
                >
                  <Heart className="w-6 h-6 fill-current" />
                  Request to Adopt {pet.name}
                </button>
              )}
              <p className="text-center text-sm text-zinc-500 dark:text-zinc-400 mt-4">
                By requesting to adopt, you agree to our <Link href="#" className="text-primary hover:underline font-medium">Adoption Policy</Link>.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Adoption Form Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-900/50 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-zinc-800 rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col"
            >
              <div className="p-6 border-b border-zinc-200 dark:border-zinc-700 flex justify-between items-center bg-zinc-50/50 dark:bg-zinc-900/20">
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white">Adoption Application</h3>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-1.5 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-250 bg-zinc-100 dark:bg-zinc-700 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleModalSubmit} className="p-6 space-y-5">
                {/* 3. Read-Only Fields */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-1.5">Pet Name (Read Only)</label>
                    <input
                      type="text"
                      readOnly
                      value={pet.name}
                      className="block w-full px-4 py-2.5 bg-zinc-100 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-700 rounded-xl text-zinc-500 dark:text-zinc-400 cursor-not-allowed font-medium text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-1.5">Applicant Name (Read Only)</label>
                      <input
                        type="text"
                        readOnly
                        value={user?.name || ""}
                        className="block w-full px-4 py-2.5 bg-zinc-100 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-700 rounded-xl text-zinc-500 dark:text-zinc-400 cursor-not-allowed font-medium text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-1.5">Applicant Email (Read Only)</label>
                      <input
                        type="text"
                        readOnly
                        value={user?.email || ""}
                        className="block w-full px-4 py-2.5 bg-zinc-100 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-700 rounded-xl text-zinc-500 dark:text-zinc-400 cursor-not-allowed font-medium text-sm"
                      />
                    </div>
                  </div>
                </div>

                <div className="h-px bg-zinc-100 dark:bg-zinc-700 my-2" />

                {/* Editable Fields */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +1 555-0199"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="block w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-650 rounded-xl text-zinc-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">Full Address *</label>
                    <input
                      type="text"
                      required
                      placeholder="Street, City, State, ZIP"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="block w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-650 rounded-xl text-zinc-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">Why do you want to adopt {pet.name}? (Optional)</label>
                    <textarea
                      rows={3}
                      placeholder="Tell the owner why you are a perfect fit..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="block w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-650 rounded-xl text-zinc-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent text-sm resize-y"
                    />
                  </div>
                </div>

                <div className="pt-4 flex gap-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 py-3 px-4 border border-zinc-200 dark:border-zinc-700 rounded-xl text-zinc-700 dark:text-zinc-300 font-medium hover:bg-zinc-50 dark:hover:bg-zinc-700/50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 py-3 px-4 bg-primary hover:bg-primary-600 text-white dark:text-zinc-950 rounded-xl font-bold transition-all disabled:opacity-70 shadow-sm"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Submitting...
                      </span>
                    ) : (
                      "Submit Application"
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
