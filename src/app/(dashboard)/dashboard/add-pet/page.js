"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { CheckCircle2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";

export default function AddPetPage() {
  const { user, API_BASE } = useAuth();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  
  const userEmail = user?.email || "";

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      // Map form imageUrl to backend schema field 'image'
      const petPayload = {
        name: data.name,
        species: data.species,
        breed: data.breed,
        age: data.age,
        gender: data.gender,
        healthStatus: data.healthStatus,
        vaccinationStatus: data.vaccinationStatus || "Fully Vaccinated",
        adoptionFee: Number(data.adoptionFee) || 0,
        location: data.location,
        image: data.imageUrl,
        description: data.description,
      };

      const response = await fetch(`${API_BASE}/api/pets`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(petPayload),
        credentials: "include",
      });

      const resData = await response.json();

      if (response.ok && resData.success) {
        toast.success("Pet listed successfully for adoption!");
        reset();
        router.push("/dashboard/listings");
      } else {
        toast.error(resData.message || "Failed to submit pet listing.");
      }
    } catch (error) {
      toast.error("Network error listing pet.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">List a Pet for Adoption</h1>
        <p className="text-zinc-600 dark:text-zinc-400 mt-1">Help a pet find a loving forever home by providing their details.</p>
      </div>

      <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-700 p-6 md:p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          
          {/* Section 1: Basic Info */}
          <div>
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-700 pb-3 mb-5">
              Basic Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Pet Name *</label>
                <input
                  type="text"
                  {...register("name", { required: "Name is required" })}
                  className={`block w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-900/50 border ${errors.name ? 'border-red-500' : 'border-zinc-200 dark:border-zinc-600'} rounded-xl text-zinc-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent`}
                  placeholder="e.g. Bella"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Species *</label>
                <select
                  {...register("species", { required: "Species is required" })}
                  className="block w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-600 rounded-xl text-zinc-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent appearance-none"
                >
                  <option value="">Select Species</option>
                  <option value="Dog">Dog</option>
                  <option value="Cat">Cat</option>
                  <option value="Bird">Bird</option>
                  <option value="Rabbit">Rabbit</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Breed *</label>
                <input
                  type="text"
                  {...register("breed", { required: "Breed is required" })}
                  className="block w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-600 rounded-xl text-zinc-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="e.g. Golden Retriever"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Age *</label>
                <input
                  type="text"
                  {...register("age", { required: "Age is required" })}
                  className="block w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-600 rounded-xl text-zinc-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="e.g. 2 Years, or 3 Months"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Gender *</label>
                <select
                  {...register("gender", { required: "Gender is required" })}
                  className="block w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-600 rounded-xl text-zinc-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent appearance-none"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Unknown">Unknown</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 2: Health & Adoption Details */}
          <div>
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-700 pb-3 mb-5">
              Health & Adoption Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Health / Vaccination Status</label>
                <input
                  type="text"
                  {...register("healthStatus")}
                  className="block w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-600 rounded-xl text-zinc-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="e.g. Fully Vaccinated, Spayed/Neutered"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Adoption Fee ($)</label>
                <input
                  type="number"
                  {...register("adoptionFee")}
                  className="block w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-600 rounded-xl text-zinc-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="0 for free"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Location *</label>
                <input
                  type="text"
                  {...register("location", { required: "Location is required" })}
                  className="block w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-600 rounded-xl text-zinc-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="City, State"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Media & Description */}
          <div>
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-700 pb-3 mb-5">
              Media & Description
            </h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Image URL *</label>
                <input
                  type="url"
                  {...register("imageUrl", { required: "Image URL is required" })}
                  className="block w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-600 rounded-xl text-zinc-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Description</label>
                <textarea
                  {...register("description")}
                  rows={4}
                  className="block w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-600 rounded-xl text-zinc-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent resize-y"
                  placeholder="Tell us about the pet's personality, habits, and what kind of home they would thrive in."
                />
              </div>
            </div>
          </div>

          {/* Section 4: Contact */}
          <div>
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-700 pb-3 mb-5">
              Owner Information
            </h3>
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Owner Email (Read Only)</label>
              <input
                type="email"
                readOnly
                value={userEmail}
                className="block w-full px-4 py-3 bg-zinc-100 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-700 rounded-xl text-zinc-500 dark:text-zinc-400 cursor-not-allowed font-medium"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-zinc-200 dark:border-zinc-700 flex justify-end gap-4">
            <button
              type="button"
              onClick={() => reset()}
              className="px-6 py-3 border border-zinc-200 dark:border-zinc-700 rounded-xl text-zinc-700 dark:text-zinc-300 font-medium hover:bg-zinc-50 dark:hover:bg-zinc-700/50 transition-colors"
            >
              Reset
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 px-8 py-3 bg-primary text-white font-medium rounded-xl hover:bg-primary-600 transition-colors shadow-sm disabled:opacity-75"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Listing...
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-5 h-5" />
                  List Pet for Adoption
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
