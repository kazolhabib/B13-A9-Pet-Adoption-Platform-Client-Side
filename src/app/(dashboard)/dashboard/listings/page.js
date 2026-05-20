"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Edit2, Eye, Trash2, Users, AlertCircle, X, CheckCircle, Heart, Loader2 } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function MyListingsPage() {
  const { API_BASE } = useAuth();
  const [listings, setListings] = useState([]);
  const [receivedRequests, setReceivedRequests] = useState([]);
  const [isLoadingListings, setIsLoadingListings] = useState(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isRequestsModalOpen, setIsRequestsModalOpen] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);
  const [actionLoading, setActionLoading] = useState(null); // stores request ID currently being accepted/rejected

  const fetchListingsAndRequests = async () => {
    try {
      setIsLoadingListings(true);
      // Fetch listings
      const listResponse = await fetch(`${API_BASE}/api/pets/my-listings`, {
        credentials: "include",
      });
      const listData = await listResponse.json();

      // Fetch received requests
      const reqResponse = await fetch(`${API_BASE}/api/requests/received`, {
        credentials: "include",
      });
      const reqData = await reqResponse.json();

      if (listResponse.ok) {
        setListings(listData.data || listData || []);
      }
      if (reqResponse.ok) {
        setReceivedRequests(reqData.data || reqData || []);
      }
    } catch (error) {
      toast.error("Failed to load listings from server.");
      console.error(error);
    } finally {
      setIsLoadingListings(false);
    }
  };

  useEffect(() => {
    fetchListingsAndRequests();
  }, []);

  const stats = {
    total: listings.length,
    available: listings.filter(l => l.status === "available").length,
    adopted: listings.filter(l => l.status === "adopted").length,
  };

  const openDeleteModal = (pet) => {
    setSelectedPet(pet);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await fetch(`${API_BASE}/api/pets/${selectedPet._id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await response.json();
      if (response.ok && (data.success !== false)) {
        toast.success(`${selectedPet.name} has been removed from your listings.`);
        setListings(listings.filter(l => l._id !== selectedPet._id));
      } else {
        toast.error(data.message || "Failed to delete listing.");
      }
    } catch (error) {
      toast.error("Network error deleting listing.");
      console.error(error);
    } finally {
      setIsDeleteModalOpen(false);
      setSelectedPet(null);
    }
  };

  const openRequestsModal = (pet) => {
    setSelectedPet(pet);
    setIsRequestsModalOpen(true);
  };

  const handleRequestAction = async (requestId, action) => {
    setActionLoading(requestId);
    try {
      const response = await fetch(`${API_BASE}/api/requests/${requestId}/${action}`, {
        method: "PATCH",
        credentials: "include",
      });
      const data = await response.json();

      if (response.ok && (data.success !== false)) {
        toast.success(data.message || `Request successfully ${action}ed!`);
        // Refresh all listings and requests to update statuses
        await fetchListingsAndRequests();
        
        // If it was approved, close the requests modal as other requests are now auto-rejected and pet is adopted
        if (action === "approve") {
          setIsRequestsModalOpen(false);
        }
      } else {
        toast.error(data.message || `Failed to ${action} request.`);
      }
    } catch (error) {
      toast.error(`Network error performing ${action} action.`);
      console.error(error);
    } finally {
      setActionLoading(null);
    }
  };

  // Filter requests corresponding to the selected pet
  // petId can be either a string ObjectId or a populated object, so normalize with toString()
  const activeRequests = receivedRequests.filter(req => {
    const reqPetId = typeof req.petId === "object" && req.petId !== null ? req.petId._id : req.petId;
    return String(reqPetId) === String(selectedPet?._id);
  });

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">My Pet Listings</h1>
          <p className="text-zinc-600 dark:text-zinc-400 mt-1">Manage the pets you have listed for adoption.</p>
        </div>
        <Link
          href="/dashboard/add-pet"
          className="inline-flex items-center justify-center px-6 py-2.5 bg-primary text-white dark:text-zinc-950 font-medium rounded-xl hover:bg-primary-600 transition-colors shadow-sm"
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

      {isLoadingListings ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <Loader2 className="w-10 h-10 animate-spin text-primary" />
          <p className="text-zinc-500 dark:text-zinc-400">Loading listings...</p>
        </div>
      ) : listings.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-zinc-800 rounded-3xl border border-zinc-200 dark:border-zinc-700 shadow-sm">
          <div className="w-16 h-16 bg-zinc-100 dark:bg-zinc-700/50 rounded-full flex items-center justify-center text-zinc-400 dark:text-zinc-500 mx-auto mb-4">
            <Heart className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-1">No listed pets yet</h3>
          <p className="text-zinc-500 dark:text-zinc-400 mb-6 max-w-sm mx-auto">Get started by creating a pet listing to help them find a loving new home.</p>
          <Link
            href="/dashboard/add-pet"
            className="inline-flex items-center justify-center px-6 py-2.5 bg-primary text-white dark:text-zinc-950 font-medium rounded-xl hover:bg-primary-600 transition-colors shadow-sm"
          >
            Add First Pet
          </Link>
        </div>
      ) : (
        /* Listings Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {listings.map(pet => {
              const petRequests = receivedRequests.filter(req => {
                const reqPetId = typeof req.petId === "object" && req.petId !== null ? req.petId._id : req.petId;
                return String(reqPetId) === String(pet._id);
              });
              const petStatusCap = pet.status.charAt(0).toUpperCase() + pet.status.slice(1);
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  key={pet._id}
                  className="bg-white dark:bg-zinc-800 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-700 overflow-hidden flex flex-col group"
                >
                  <div className="h-48 relative overflow-hidden bg-zinc-100 dark:bg-zinc-700">
                    <img src={pet.image || pet.imageUrl} alt={pet.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute top-3 right-3 flex gap-2">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold shadow-sm backdrop-blur-sm ${pet.status === 'available' ? 'bg-green-500/90 text-white' : 'bg-zinc-500/90 text-white'}`}>
                        {petStatusCap}
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
                          Requests ({petRequests.length})
                        </button>
                        <Link 
                          href={`/pets/${pet._id}`}
                          className="flex items-center justify-center gap-1.5 py-2 px-3 bg-zinc-100 dark:bg-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-600 text-zinc-700 dark:text-zinc-300 rounded-lg text-sm font-medium transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                          View
                        </Link>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <button 
                          onClick={() => toast.info("Editing will be fully enabled soon!")}
                          className="flex items-center justify-center gap-1.5 py-2 px-3 border border-zinc-200 dark:border-zinc-600 hover:border-zinc-300 dark:hover:border-zinc-500 text-zinc-600 dark:text-zinc-400 rounded-lg text-sm font-medium transition-colors"
                        >
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
              );
            })}
          </AnimatePresence>
        </div>
      )}

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
                {activeRequests.length > 0 ? (
                  <div className="space-y-4">
                    {activeRequests.map((request, idx) => (
                      <div key={request._id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-zinc-200 dark:border-zinc-700 rounded-xl gap-4 bg-zinc-50/50 dark:bg-zinc-900/30">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold">
                            {request.requesterName.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-semibold text-zinc-900 dark:text-white">{request.requesterName}</p>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400">
                              {request.requesterEmail} • {request.phone || "No phone"} • {request.address || "No address"}
                            </p>
                            {request.notes && (
                              <p className="mt-2 text-sm italic text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 p-2 rounded-lg">
                                &quot;{request.notes}&quot;
                              </p>
                            )}
                            <div className="mt-2">
                              <span className={`inline-block px-2 py-0.5 text-xs font-semibold rounded-full ${
                                request.status === "approved" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" :
                                request.status === "rejected" ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" :
                                "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                              }`}>
                                {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        {request.status === "pending" && (
                          <div className="flex gap-2">
                            <button 
                              onClick={() => handleRequestAction(request._id, "approve")}
                              disabled={actionLoading === request._id}
                              className="flex items-center gap-1.5 px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50 shadow-sm"
                            >
                              {actionLoading === request._id ? (
                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                              ) : (
                                <CheckCircle className="w-3.5 h-3.5" />
                              )}
                              Approve
                            </button>
                            <button 
                              onClick={() => handleRequestAction(request._id, "reject")}
                              disabled={actionLoading === request._id}
                              className="px-3 py-1.5 bg-red-100 hover:bg-red-200 dark:bg-red-900/30 dark:hover:bg-red-900/50 text-red-700 dark:text-red-400 text-sm font-medium rounded-lg transition-colors disabled:opacity-50"
                            >
                              Reject
                            </button>
                          </div>
                        )}
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
