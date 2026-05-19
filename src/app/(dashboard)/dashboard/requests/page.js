"use client";

import { useState } from "react";
import { Eye, XCircle, CheckCircle, Clock } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

const MOCK_REQUESTS = [
  { id: "REQ-001", petName: "Bella", date: "2023-10-15", pickupDate: "2023-10-22", status: "Approved" },
  { id: "REQ-002", petName: "Luna", date: "2023-10-18", pickupDate: "TBD", status: "Pending" },
  { id: "REQ-003", petName: "Max", date: "2023-09-05", pickupDate: "-", status: "Rejected" },
];

export default function MyRequestsPage() {
  const [requests, setRequests] = useState(MOCK_REQUESTS);

  const handleCancel = (id) => {
    toast.success("Adoption request cancelled successfully");
    setRequests(requests.filter(req => req.id !== id));
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Approved":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
            <CheckCircle className="w-3.5 h-3.5" />
            Approved
          </span>
        );
      case "Pending":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400">
            <Clock className="w-3.5 h-3.5" />
            Pending
          </span>
        );
      case "Rejected":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400">
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
                  transition={{ delay: index * 0.1 }}
                  key={request.id} 
                  className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors"
                >
                  <td className="py-4 px-6 text-sm font-medium text-zinc-900 dark:text-white">{request.id}</td>
                  <td className="py-4 px-6 text-sm text-zinc-600 dark:text-zinc-300 font-semibold">{request.petName}</td>
                  <td className="py-4 px-6 text-sm text-zinc-600 dark:text-zinc-400">{request.date}</td>
                  <td className="py-4 px-6 text-sm text-zinc-600 dark:text-zinc-400">{request.pickupDate}</td>
                  <td className="py-4 px-6">{getStatusBadge(request.status)}</td>
                  <td className="py-4 px-6 flex justify-end gap-3">
                    <button 
                      className="p-2 rounded-lg text-zinc-500 hover:text-primary hover:bg-primary/10 transition-colors"
                      title="View Details"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                    {request.status === "Pending" && (
                      <button 
                        onClick={() => handleCancel(request.id)}
                        className="p-2 rounded-lg text-zinc-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                        title="Cancel Request"
                      >
                        <XCircle className="w-5 h-5" />
                      </button>
                    )}
                  </td>
                </motion.tr>
              ))}
              {requests.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-zinc-500 dark:text-zinc-400">
                    You have no active adoption requests.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
