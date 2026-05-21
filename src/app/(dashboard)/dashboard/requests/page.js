"use client";

import { useState, useEffect } from "react";
import { Eye, XCircle, CheckCircle, Clock, Loader2, Trash2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";

export default function MyRequestsPage() {
  const { API_BASE } = useAuth();
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(null);

  const fetchMyRequests = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("token");
      const headers = {};
      if (token) headers["Authorization"] = `Bearer ${token}`;

      const response = await fetch(`${API_BASE}/api/requests/my-requests`, {
        headers,
        credentials: "include",
      });
      const data = await response.json();
      if (response.ok) {
        setRequests(data.data || data || []);
      } else {
        toast.error(data.message || "Failed to load requests.");
      }
    } catch (error) {
      toast.error("Network error fetching requests.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line
    fetchMyRequests();
  }, []);

  const handleDeleteRequest = async (requestId) => {
    if (!confirm("Are you sure you want to cancel this adoption request?")) return;
    
    setIsDeleting(requestId);
    try {
      const token = localStorage.getItem("token");
      const headers = {};
      if (token) headers["Authorization"] = `Bearer ${token}`;

      const response = await fetch(`${API_BASE}/api/requests/${requestId}`, {
        method: "DELETE",
        headers,
        credentials: "include",
      });
      const data = await response.json();
      
      if (response.ok && data.success !== false) {
        toast.success(data.message || "Request cancelled successfully.");
        setRequests(requests.filter((r) => r._id !== requestId));
      } else {
        toast.error(data.message || "Failed to cancel request.");
      }
    } catch (error) {
      toast.error("Network error cancelling request.");
      console.error(error);
    } finally {
      setIsDeleting(null);
    }
  };

  const getStatusBadge = (status) => {
    const statusLower = status.toLowerCase();
    switch (statusLower) {
      case "approved":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
            <CheckCircle className="w-3.5 h-3.5" />
            Approved
          </span>
        );
      case "pending":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400">
            <Clock className="w-3.5 h-3.5" />
            Pending
          </span>
        );
      case "rejected":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400">
            <XCircle className="w-3.5 h-3.5" />
            Rejected
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">My Adoption Requests</h1>
        <p className="text-zinc-600 dark:text-zinc-400 mt-1">Track the status of the pets you want to bring home.</p>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <Loader2 className="w-10 h-10 animate-spin text-primary" />
          <p className="text-zinc-500 dark:text-zinc-400">Loading requests...</p>
        </div>
      ) : (
        <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-zinc-50 dark:bg-zinc-800/50 border-b border-zinc-200 dark:border-zinc-700">
                  <th className="py-4 px-6 text-sm font-semibold text-zinc-900 dark:text-zinc-200">Request ID</th>
                  <th className="py-4 px-6 text-sm font-semibold text-zinc-900 dark:text-zinc-200">Pet Name</th>
                  <th className="py-4 px-6 text-sm font-semibold text-zinc-900 dark:text-zinc-200">Request Date</th>
                  <th className="py-4 px-6 text-sm font-semibold text-zinc-900 dark:text-zinc-200">Pickup Date</th>
                  <th className="py-4 px-6 text-sm font-semibold text-zinc-900 dark:text-zinc-200">Status</th>
                  <th className="py-4 px-6 text-sm font-semibold text-zinc-900 dark:text-zinc-200 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
                {requests.map((request, index) => (
                  <motion.tr 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    key={request._id} 
                    className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors"
                  >
                    <td className="py-4 px-6 text-sm font-semibold text-zinc-500 dark:text-zinc-400">
                      #{request._id.slice(-6).toUpperCase()}
                    </td>
                    <td className="py-4 px-6 text-sm text-zinc-900 dark:text-white font-semibold flex items-center gap-3">
                      {request.petImage && (
                        <img src={request.petImage} alt={request.petName} className="w-8 h-8 rounded-full object-cover bg-zinc-100" />
                      )}
                      {request.petName}
                    </td>
                    <td className="py-4 px-6 text-sm text-zinc-600 dark:text-zinc-400">
                      {new Date(request.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-6 text-sm text-zinc-600 dark:text-zinc-400">
                      {request.status.toLowerCase() === "approved" ? "Within 7 Days" : "TBD"}
                    </td>
                    <td className="py-4 px-6">{getStatusBadge(request.status)}</td>
                    <td className="py-4 px-6 flex justify-end gap-3">
                      <Link 
                        href={`/pets/${request.petId}`}
                        className="p-2 rounded-lg text-zinc-500 hover:text-primary hover:bg-primary/10 transition-colors"
                        title="View Pet Details"
                      >
                        <Eye className="w-5 h-5" />
                      </Link>
                      <button 
                        onClick={() => handleDeleteRequest(request._id)}
                        disabled={isDeleting === request._id}
                        className="p-2 rounded-lg text-zinc-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors disabled:opacity-50"
                        title="Cancel Request"
                      >
                        {isDeleting === request._id ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                          <Trash2 className="w-5 h-5" />
                        )}
                      </button>
                    </td>
                  </motion.tr>
                ))}
                {requests.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-zinc-500 dark:text-zinc-400 font-medium">
                      You have no active adoption requests.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
