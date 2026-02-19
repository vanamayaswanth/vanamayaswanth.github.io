import { CustomCursor } from "@/components/custom-cursor"
import { StickyNav } from "@/components/sticky-nav"
import { HeroSection } from "@/components/hero-section"
import { SkillsSection } from "@/components/skills-section"
import { ProfessionalSummary } from "@/components/professional-summary"
import { NeuralGrid } from "@/components/neural-grid/neural-grid" // Updated Import
import { AuthoritySection } from "@/components/authority-section"
import { ContactFooter } from "@/components/contact-footer"
import { GrainOverlay } from "@/components/grain-overlay"
import { PageLoader } from "@/components/page-loader"

export default function Home() {
  return (
    <main className="relative min-h-screen bg-black text-white">
      <PageLoader />
      <GrainOverlay />
      <CustomCursor />
      <StickyNav />
      <HeroSection />
      <SkillsSection />
      <ProfessionalSummary />
      <NeuralGrid /> {/* Updated Component */}
      <AuthoritySection />
      <ContactFooter />
    </main>
  )
}
