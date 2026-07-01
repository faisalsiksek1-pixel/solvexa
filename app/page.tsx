import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { Tutors } from "@/components/landing/Tutors";
import { CTA } from "@/components/landing/CTA";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Tutors />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
