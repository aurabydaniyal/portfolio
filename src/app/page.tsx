import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import TechLoopSection from "@/components/sections/TechLoopSection";
import AboutSection from "@/components/sections/AboutSection";
import OverviewSection from "@/components/sections/OverviewSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ThoughtLineSection from "@/components/sections/ThoughtLineSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import EngineeringSection from "@/components/sections/EngineeringSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import InviteSection from "@/components/sections/InviteSection";
import ContactSection from "@/components/sections/ContactSection";
import ScrollTheme from "@/components/ui/ScrollTheme";
import BackToTop from "@/components/ui/BackToTop";
import PortfolioBackground from "@/components/ui/PortfolioBackground";
import GradualBlur from "@/components/GradualBlur";
import IntroGate from "@/components/ui/IntroGate";

export default function Home() {
  return (
    <>
      <IntroGate />
      <div id="site-root">
        <PortfolioBackground />
        <ScrollTheme />
        <a href="#about" className="skip">Skip to content</a>
        <Navbar />
        <main>
          <HeroSection />
          <TechLoopSection />
          <AboutSection />
          <OverviewSection />
          <SkillsSection />
          <ThoughtLineSection />
          <ProjectsSection />
          <EngineeringSection />
          <ExperienceSection />
          <InviteSection />
          <ContactSection />
        </main>
        <Footer />
        <GradualBlur
          position="bottom"
          target="page"
          height="2.25rem"
          strength={0.4}
          layers={2}
          autoHide
          zIndex={30}
          className="edge-blur"
        />
        <BackToTop />
      </div>
    </>
  );
}
