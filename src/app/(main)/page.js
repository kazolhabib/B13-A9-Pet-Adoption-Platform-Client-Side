import { Hero } from "@/components/home/Hero";
import { FeaturedPets } from "@/components/home/FeaturedPets";
import { WhyAdopt } from "@/components/home/WhyAdopt";
import { SuccessStories } from "@/components/home/SuccessStories";
import { PetCareTips } from "@/components/home/PetCareTips";
import { OurVision } from "@/components/home/OurVision";
import { HowItWorks } from "@/components/home/HowItWorks";

export const metadata = {
  title: "PetHaven | Find Your Perfect Companion",
  description: "Adopt a pet today and give them a forever home. PetHaven connects you with thousands of rescued animals.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedPets />
      <WhyAdopt />
      <SuccessStories />
      <PetCareTips />
      <OurVision />
      <HowItWorks />
    </>
  );
}
