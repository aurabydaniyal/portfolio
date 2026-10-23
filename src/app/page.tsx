import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import TechLoopSection from "@/components/sections/TechLoopSection";
import AboutSection from "@/components/sections/AboutSection";
import OverviewSection from "@/components/sections/OverviewSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import EngineeringSection from "@/components/sections/EngineeringSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import ContactSection from "@/components/sections/ContactSection";
import ScrollTheme from "@/components/ui/ScrollTheme";
import BackToTop from "@/components/ui/BackToTop";

import IntroGate from "@/components/ui/IntroGate";

export default function Home() {
  return (
    <>
      <IntroGate />
      <div id="site-root">
        <ScrollTheme />
        <a href="#about" className="skip">Skip to content</a>
        <Navbar />
        <main>
          <HeroSection />
          <TechLoopSection />
          <AboutSection />
          <OverviewSection />
          <SkillsSection />
          <ProjectsSection />
          <EngineeringSection />
          <ExperienceSection />
          <ContactSection />
        </main>
        <Footer />
        <BackToTop />
      </div>
    </>
  );
}
