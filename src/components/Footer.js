import Link from "next/link";
import { PawPrint, MessageCircle, Hash, Globe, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 pt-16 pb-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Info */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4 group inline-flex">
              <div className="bg-primary/10 p-2 rounded-xl text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                <PawPrint className="w-6 h-6" />
              </div>
              <span className="font-bold text-xl tracking-tight text-zinc-900 dark:text-white">
                PetHaven
              </span>
            </Link>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed mb-6">
              Connecting loving families with animals in need. We believe every pet deserves a safe, happy, and forever home.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-zinc-400 hover:text-primary transition-colors">
                <Globe className="w-5 h-5" />
              </a>
              <a href="#" className="text-zinc-400 hover:text-primary transition-colors">
                <Hash className="w-5 h-5" />
              </a>
              <a href="#" className="text-zinc-400 hover:text-primary transition-colors">
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-zinc-900 dark:text-white mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/pets" className="text-zinc-600 dark:text-zinc-400 hover:text-primary dark:hover:text-primary text-sm transition-colors">
                  Find a Pet
                </Link>
              </li>
              <li>
                <Link href="/dashboard/add-pet" className="text-zinc-600 dark:text-zinc-400 hover:text-primary dark:hover:text-primary text-sm transition-colors">
                  Rehome a Pet
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-zinc-600 dark:text-zinc-400 hover:text-primary dark:hover:text-primary text-sm transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/success-stories" className="text-zinc-600 dark:text-zinc-400 hover:text-primary dark:hover:text-primary text-sm transition-colors">
                  Success Stories
                </Link>
              </li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h3 className="font-semibold text-zinc-900 dark:text-white mb-4">Policies</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/privacy" className="text-zinc-600 dark:text-zinc-400 hover:text-primary dark:hover:text-primary text-sm transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-zinc-600 dark:text-zinc-400 hover:text-primary dark:hover:text-primary text-sm transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/adoption-policy" className="text-zinc-600 dark:text-zinc-400 hover:text-primary dark:hover:text-primary text-sm transition-colors">
                  Adoption Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-zinc-900 dark:text-white mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-zinc-600 dark:text-zinc-400">
                <MapPin className="w-5 h-5 text-primary shrink-0" />
                <span>123 Adoption Avenue, Pet City, PC 12345</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-zinc-600 dark:text-zinc-400">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <span>(555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-zinc-600 dark:text-zinc-400">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <span>hello@pethaven.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-zinc-200 dark:border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            &copy; {new Date().getFullYear()} PetHaven Adoption Platform. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
            Made with <span className="text-red-500">❤️</span> for pets
          </div>
        </div>
      </div>
    </footer>
  );
}
