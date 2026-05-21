import Link from "next/link";
import { Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="relative mb-8 inline-block">
          <h1 className="text-9xl font-extrabold text-zinc-200 dark:text-zinc-800 tracking-tighter">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-primary/10 p-4 rounded-full text-primary animate-bounce">
              <Search className="w-12 h-12" />
            </div>
          </div>
        </div>
        
        <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-4">
          Oops! Page Not Found
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400 mb-8 text-lg">
          It looks like the page you&apos;re looking for went out for a walk. Let&apos;s get you back home!
        </p>
        
        <Link
          href="/"
          className="inline-flex items-center justify-center px-8 py-4 bg-primary text-black font-medium rounded-full hover:bg-primary-600 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
