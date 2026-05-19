import { Sidebar } from "@/components/Sidebar";
import { Navbar } from "@/components/Navbar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-[var(--background)]">
      {/* We can reuse the Navbar for the dashboard but maybe standard Dashboard has its own app bar? Let's keep the main Navbar but modify sidebar to be under it, or make it a full sidebar. */}
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-gray-50/50 dark:bg-gray-900/50">
          {children}
        </main>
      </div>
    </div>
  );
}
