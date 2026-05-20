# PetHaven - Frontend (Client-Side)

## Project Purpose
PetHaven is a modern, responsive Pet Adoption Platform aimed at giving rescued animals a forever home. The platform allows users to browse available pets, view detailed profiles, submit adoption requests, and allows pet owners to list their pets for adoption and manage requests. 

## Live URL
[https://your-client-url.vercel.app](https://your-client-url.vercel.app)

## Features
- **Dynamic Pet Exploration**: Explore all pets through a seamless grid interface with advanced Search (by name/breed) and Filtering (by species) options.
- **Secure Authentication System**: Users can register and login using their email/password or use Google OAuth Sign-In. JWT tokens are managed automatically via HTTPOnly cookies for maximum security.
- **Role-based Dashboards**: Interactive dashboard layouts specifically tailored for pet owners to manage their listings, approve/reject requests, and for adopters to track their requested pets.
- **Interactive Modals and Animations**: Rich UI featuring Framer Motion page transitions, modal overlays for adoption forms, and real-time toast notifications for all CRUD operations.
- **Read-Only Automated Forms**: Adoption request forms auto-fill the user's details directly from their session and set them as read-only to streamline the request process.
- **Responsive & Dark Mode Support**: Fully responsive across mobile, tablet, and desktop views with an integrated Light/Dark theme toggle.

## NPM Packages Used
- `next`: The React framework for production (App Router used).
- `framer-motion`: For fluid, professional layout animations and UI interactions.
- `lucide-react`: A clean, beautiful, and consistent icon library.
- `sonner`: For elegant, accessible, and customizable toast notifications.
- `react-hook-form`: Performant, flexible, and extensible forms with easy validation.
- `tailwindcss`: Utility-first CSS framework for rapid and highly customized UI styling.
- `@react-oauth/google`: Handles Google Sign-In popups and credential retrievals seamlessly.
