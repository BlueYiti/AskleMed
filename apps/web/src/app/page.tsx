import { Navbar } from "../components/layout/top-nav";
import { BackgroundBlobs } from "../components/layout/background-blobs";
import { HeroSection } from "../components/home/hero-section";
import { FeaturesSection } from "../components/home/features-section";
import { ProcessSection } from "../components/home/process-section";
import { CtaBanner } from "../components/home/cta-banner";
import { BackToTop } from "@/components/home/back-to-top";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background">
      <BackgroundBlobs />

      <Navbar />

      <div className="relative z-10">
        <HeroSection />
        <FeaturesSection />
        <ProcessSection />
        <CtaBanner />
      </div>

      <BackToTop />
    </main>
  );
}