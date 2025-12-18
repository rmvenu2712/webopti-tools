import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { HowItWorks } from "@/components/how-it-works"
import { SEOSection } from "@/components/seo-section"
import { FloatingElements } from "@/components/cta-section"
import { StatsSection } from "@/components/stats-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-green-50 overflow-hidden relative">
      <FloatingElements />
      <Header />
      <main className="flex flex-col relative z-10">
        <HeroSection />
        {/* <StatsSection /> */}
        <FeaturesSection />
        <SEOSection />
        <HowItWorks />
      </main>
      <Footer />
    </div>
  )
}
