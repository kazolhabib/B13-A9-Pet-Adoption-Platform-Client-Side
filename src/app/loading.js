import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="fixed inset-0 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-primary/20 rounded-full"></div>
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
      </div>
      <p className="mt-4 text-zinc-600 dark:text-zinc-400 font-medium animate-pulse">
        Fetching good boys and girls...
      </p>
    </div>
  );
}
