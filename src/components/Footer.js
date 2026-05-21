import Link from "next/link";
import { PawPrint, MessageCircle, Globe, Mail, Phone, MapPin, Send, ArrowRight } from "lucide-react";

const FacebookIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
  </svg>
);

const LinkedinIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
  </svg>
);

export function Footer() {
  return (
    <footer className="bg-zinc-50 dark:bg-[#09090b] border-t border-zinc-200 dark:border-zinc-800 pt-20 pb-10 transition-colors duration-300 relative overflow-hidden">
      {/* Decorative Blobs */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-rose-500/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          {/* Brand Info */}
          <div className="col-span-1 md:col-span-2 lg:col-span-4 text-center md:text-left">
            <Link href="/" className="inline-flex items-center justify-center md:justify-start gap-3 mb-6 group">
              <div className="bg-primary/10 p-2.5 rounded-xl text-primary shadow-sm group-hover:scale-105 transition-transform">
                <PawPrint className="w-6 h-6" />
              </div>
              <span className="font-black text-2xl tracking-tight text-zinc-900 dark:text-white">
                PetHaven<span className="text-primary">.</span>
              </span>
            </Link>
            <p className="text-zinc-600 dark:text-zinc-400 text-base leading-relaxed mb-8 max-w-sm mx-auto md:mx-0">
              Connecting loving families with animals in need. We believe every pet deserves a safe, happy, and forever home.
            </p>
            <div className="flex gap-3 justify-center md:justify-start">
              <a href="#" className="w-10 h-10 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-500 hover:text-blue-600 hover:border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all group shadow-sm" title="Facebook">
                <FacebookIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-500 hover:text-blue-500 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all group shadow-sm" title="LinkedIn">
                <LinkedinIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-500 hover:text-rose-500 hover:border-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-all group shadow-sm" title="Email">
                <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-500 hover:text-green-500 hover:border-green-500 hover:bg-green-50 dark:hover:bg-green-900/20 transition-all group shadow-sm" title="WhatsApp">
                <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1 lg:col-span-2 text-center md:text-left">
            <h3 className="font-bold text-lg text-zinc-900 dark:text-white mb-6">Quick Links</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/pets" className="text-zinc-600 dark:text-zinc-400 hover:text-primary dark:hover:text-primary transition-colors flex items-center justify-center md:justify-start gap-2 group">
                  <ArrowRight className="w-4 h-4 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all text-primary" />
                  Find a Pet
                </Link>
              </li>
              <li>
                <Link href="/dashboard/add-pet" className="text-zinc-600 dark:text-zinc-400 hover:text-primary dark:hover:text-primary transition-colors flex items-center justify-center md:justify-start gap-2 group">
                  <ArrowRight className="w-4 h-4 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all text-primary" />
                  Rehome a Pet
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-zinc-600 dark:text-zinc-400 hover:text-primary dark:hover:text-primary transition-colors flex items-center justify-center md:justify-start gap-2 group">
                  <ArrowRight className="w-4 h-4 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all text-primary" />
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/success-stories" className="text-zinc-600 dark:text-zinc-400 hover:text-primary dark:hover:text-primary transition-colors flex items-center justify-center md:justify-start gap-2 group">
                  <ArrowRight className="w-4 h-4 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all text-primary" />
                  Success Stories
                </Link>
              </li>
            </ul>
          </div>

          {/* Policies */}
          <div className="col-span-1 lg:col-span-2 text-center md:text-left">
            <h3 className="font-bold text-lg text-zinc-900 dark:text-white mb-6">Policies</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/privacy" className="text-zinc-600 dark:text-zinc-400 hover:text-primary dark:hover:text-primary transition-colors flex items-center justify-center md:justify-start gap-2 group">
                  <ArrowRight className="w-4 h-4 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all text-primary" />
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-zinc-600 dark:text-zinc-400 hover:text-primary dark:hover:text-primary transition-colors flex items-center justify-center md:justify-start gap-2 group">
                  <ArrowRight className="w-4 h-4 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all text-primary" />
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/adoption-policy" className="text-zinc-600 dark:text-zinc-400 hover:text-primary dark:hover:text-primary transition-colors flex items-center justify-center md:justify-start gap-2 group">
                  <ArrowRight className="w-4 h-4 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all text-primary" />
                  Adoption Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="col-span-1 md:col-span-2 lg:col-span-4 text-center md:text-left">
            <h3 className="font-bold text-lg text-zinc-900 dark:text-white mb-6">Stay Updated</h3>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4 text-sm">
              Subscribe to our newsletter for the latest pet adoption news and tips.
            </p>
            <form className="flex flex-col sm:flex-row gap-2 mb-8 max-w-sm mx-auto md:mx-0">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-primary/50 dark:text-white shadow-sm"
                required
              />
              <button 
                type="button" 
                className="px-6 py-3 rounded-xl bg-primary text-white dark:text-zinc-900 font-semibold hover:bg-primary/90 transition-all flex items-center justify-center gap-2 whitespace-nowrap shadow-md shadow-primary/20 hover:-translate-y-0.5 active:translate-y-0"
              >
                Subscribe
                <Send className="w-4 h-4" />
              </button>
            </form>

            <ul className="space-y-3">
              <li className="flex flex-col md:flex-row items-center md:items-start justify-center md:justify-start gap-3 text-sm text-zinc-600 dark:text-zinc-400 group">
                <MapPin className="w-5 h-5 text-zinc-400 group-hover:text-primary transition-colors shrink-0" />
                <span>123 Adoption Avenue, Pet City, PC 12345</span>
              </li>
              <li className="flex flex-col md:flex-row items-center justify-center md:justify-start gap-3 text-sm text-zinc-600 dark:text-zinc-400 group">
                <Phone className="w-5 h-5 text-zinc-400 group-hover:text-primary transition-colors shrink-0" />
                <span>(555) 123-4567</span>
              </li>
              <li className="flex flex-col md:flex-row items-center justify-center md:justify-start gap-3 text-sm text-zinc-600 dark:text-zinc-400 group">
                <Mail className="w-5 h-5 text-zinc-400 group-hover:text-primary transition-colors shrink-0" />
                <span>hello@pethaven.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-zinc-200 dark:border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-4 text-center">
          <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium">
            &copy; {new Date().getFullYear()} PetHaven Adoption Platform. All rights reserved.
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-zinc-500 dark:text-zinc-400 font-medium bg-white dark:bg-zinc-900 px-4 py-2 rounded-full border border-zinc-200 dark:border-zinc-800 shadow-sm">
            Made with <span className="text-rose-500 animate-pulse">❤️</span> for pets
          </div>
        </div>
      </div>
    </footer>
  );
}
