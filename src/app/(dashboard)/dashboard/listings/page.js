"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Edit2, Eye, Trash2, Users, AlertCircle, X, CheckCircle, Heart } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

const MOCK_LISTINGS = [
  { id: 1, name: "Bella", species: "Dog", breed: "Golden Retriever", status: "Available", image: "https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", requests: 3 },
  { id: 2, name: "Luna", species: "Cat", breed: "Persian", status: "Adopted", image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", requests: 0 },
  { id: 3, name: "Max", species: "Dog", breed: "German Shepherd", status: "Available", image: "https://images.unsplash.com/photo-1589965716319-4a041b58fa8a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", requests: 1 },
];

export default function MyListingsPage() {
  const [listings, setListings] = useState(MOCK_LISTINGS);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isRequestsModalOpen, setIsRequestsModalOpen] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);

  const stats = {
    total: listings.length,
    available: listings.filter(l => l.status === "Available").length,
    adopted: listings.filter(l => l.status === "Adopted").length,
  };

  const openDeleteModal = (pet) => {
    setSelectedPet(pet);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    setListings(listings.filter(l => l.id !== selectedPet.id));
    toast.success(`${selectedPet.name} has been removed from your listings.`);
    setIsDeleteModalOpen(false);
    setSelectedPet(null);
  };

  const openRequestsModal = (pet) => {
    setSelectedPet(pet);
    setIsRequestsModalOpen(true);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">My Pet Listings</h1>
          <p className="text-zinc-600 dark:text-zinc-400 mt-1">Manage the pets you have listed for adoption.</p>
        </div>
        <Link
          href="/dashboard/add-pet"
          className="inline-flex items-center justify-center px-6 py-2.5 bg-primary text-white font-medium rounded-xl hover:bg-primary-600 transition-colors shadow-sm"
        >
          Add New Pet
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white dark:bg-zinc-800 p-6 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-700 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Total Listings</p>
            <p className="text-3xl font-bold text-zinc-900 dark:text-white mt-1">{stats.total}</p>
          </div>
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
            <Users className="w-6 h-6" />
          </div>
        </div>
        <div className="bg-white dark:bg-zinc-800 p-6 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-700 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Available</p>
            <p className="text-3xl font-bold text-zinc-900 dark:text-white mt-1">{stats.available}</p>
          </div>
          <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-600 dark:text-green-400">
            <CheckCircle className="w-6 h-6" />
          </div>
        </div>
        <div className="bg-white dark:bg-zinc-800 p-6 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-700 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Adopted</p>
            <p className="text-3xl font-bold text-zinc-900 dark:text-white mt-1">{stats.adopted}</p>
          </div>
          <div className="w-12 h-12 bg-zinc-100 dark:bg-zinc-900/30 rounded-full flex items-center justify-center text-zinc-600 dark:text-zinc-400">
            <Heart className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Listings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {listings.map(pet => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              key={pet.id}
              className="bg-white dark:bg-zinc-800 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-700 overflow-hidden flex flex-col group"
            >
              <div className="h-48 relative overflow-hidden">
                <img src={pet.image} alt={pet.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute top-3 right-3 flex gap-2">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold shadow-sm backdrop-blur-sm ${pet.status === 'Available' ? 'bg-green-500/90 text-white' : 'bg-zinc-500/90 text-white'}`}>
                    {pet.status}
                  </span>
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-xl font-bold text-zinc-900 dark:text-white">{pet.name}</h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">{pet.species} • {pet.breed}</p>
                  </div>
                </div>
                
                <div className="mt-auto pt-6">
                  <div className="grid grid-cols-2 gap-2 mb-2">
                    <button 
                      onClick={() => openRequestsModal(pet)}
                      className="flex items-center justify-center gap-1.5 py-2 px-3 bg-zinc-100 dark:bg-zinc-700 hover:bg-primary/10 hover:text-primary dark:hover:bg-primary/20 dark:hover:text-primary text-zinc-700 dark:text-zinc-300 rounded-lg text-sm font-medium transition-colors"
                    >
                      <Users className="w-4 h-4" />
                      Requests ({pet.requests})
                    </button>
                    <Link 
                      href={`/pets/${pet.id}`}
                      className="flex items-center justify-center gap-1.5 py-2 px-3 bg-zinc-100 dark:bg-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-600 text-zinc-700 dark:text-zinc-300 rounded-lg text-sm font-medium transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                      View
                    </Link>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <button className="flex items-center justify-center gap-1.5 py-2 px-3 border border-zinc-200 dark:border-zinc-600 hover:border-zinc-300 dark:hover:border-zinc-500 text-zinc-600 dark:text-zinc-400 rounded-lg text-sm font-medium transition-colors">
                      <Edit2 className="w-4 h-4" />
                      Edit
                    </button>
                    <button 
                      onClick={() => openDeleteModal(pet)}
                      className="flex items-center justify-center gap-1.5 py-2 px-3 border border-red-200 dark:border-red-900/50 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg text-sm font-medium transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {isDeleteModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-900/50 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-zinc-800 rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl"
            >
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center text-red-600 dark:text-red-400 mx-auto mb-6">
                <AlertCircle className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-center text-zinc-900 dark:text-white mb-2">Delete Listing?</h3>
              <p className="text-center text-zinc-600 dark:text-zinc-400 mb-8">
                Are you sure you want to delete the listing for <span className="font-semibold text-zinc-900 dark:text-white">{selectedPet?.name}</span>? This action cannot be undone.
              </p>
              <div className="flex gap-4">
                <button 
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="flex-1 py-3 px-4 border border-zinc-200 dark:border-zinc-700 rounded-xl text-zinc-700 dark:text-zinc-300 font-medium hover:bg-zinc-50 dark:hover:bg-zinc-700/50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={confirmDelete}
                  className="flex-1 py-3 px-4 bg-red-600 hover:bg-red-700 text-white rounded-xl font-medium transition-colors shadow-sm"
                >
                  Yes, Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Requests Modal */}
      <AnimatePresence>
        {isRequestsModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-900/50 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="bg-white dark:bg-zinc-800 rounded-3xl w-full max-w-2xl shadow-2xl flex flex-col max-h-[80vh]"
            >
              <div className="p-6 border-b border-zinc-200 dark:border-zinc-700 flex justify-between items-center shrink-0">
                <div>
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-white">Adoption Requests</h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">For {selectedPet?.name}</p>
                </div>
                <button 
                  onClick={() => setIsRequestsModalOpen(false)}
                  className="p-2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-700 dark:hover:bg-zinc-600 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-6 overflow-y-auto flex-1">
                {selectedPet?.requests > 0 ? (
                  <div className="space-y-4">
                    {/* Mock requests list */}
                    {[1, 2, 3].slice(0, selectedPet.requests).map(i => (
                      <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-zinc-200 dark:border-zinc-700 rounded-xl gap-4">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold">
                            {String.fromCharCode(64 + i)}
                          </div>
                          <div>
                            <p className="font-semibold text-zinc-900 dark:text-white">Applicant {i}</p>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400">applicant{i}@example.com • 1 day ago</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button className="px-3 py-1.5 bg-green-100 hover:bg-green-200 dark:bg-green-900/30 dark:hover:bg-green-900/50 text-green-700 dark:text-green-400 text-sm font-medium rounded-lg transition-colors">
                            Accept
                          </button>
                          <button className="px-3 py-1.5 bg-red-100 hover:bg-red-200 dark:bg-red-900/30 dark:hover:bg-red-900/50 text-red-700 dark:text-red-400 text-sm font-medium rounded-lg transition-colors">
                            Reject
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-zinc-100 dark:bg-zinc-800 rounded-full mb-4 text-zinc-400">
                      <Users className="w-8 h-8" />
                    </div>
                    <p className="text-zinc-500 dark:text-zinc-400 font-medium text-lg">No requests yet.</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
