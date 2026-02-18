import { CustomCursor } from "@/components/custom-cursor"
import { GrainBackground } from "@/components/grain-background"
import { StickyNav } from "@/components/sticky-nav"
import { HeroSection } from "@/components/hero-section"
import { ProfessionalSummary } from "@/components/professional-summary"
import { ProjectsGallery } from "@/components/projects-gallery"
import { AuthoritySection } from "@/components/authority-section"
import { ContactFooter } from "@/components/contact-footer"

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background text-foreground">
      <GrainBackground />
      <CustomCursor />
      <StickyNav />
      <HeroSection />
      <ProfessionalSummary />
      <ProjectsGallery />
      <AuthoritySection />
      <ContactFooter />
    </main>
  )
}
