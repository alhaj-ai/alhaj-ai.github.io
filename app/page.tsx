import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { AboutAndArchitecture } from "@/components/AboutAndArchitecture";
import { ProjectsShowcase } from "@/components/ProjectsShowcase";
import { CredentialsAndSkills } from "@/components/CredentialsAndSkills";
import { FooterSection } from "@/components/FooterSection";
import { NeuralBackdrop } from "@/components/NeuralBackdrop";

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-canvas text-ink">
      <NeuralBackdrop />
      <Navbar />
      <main id="main-content" className="relative z-10">
        <HeroSection />
        <AboutAndArchitecture />
        <ProjectsShowcase />
        <CredentialsAndSkills />
      </main>
      <FooterSection />
    </div>
  );
}
