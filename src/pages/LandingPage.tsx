import { AICapabilities } from "@/components/capabilities/AICapabilities";
import { VoiceDemo } from "@/components/demo/VoiceDemo";
import { FAQ } from "@/components/faq/FAQ";
import { FeaturesSection } from "@/components/features/FeaturesSection";
import { FinalCTA } from "@/components/final-cta/FinalCTA";
import { HeroSection } from "@/components/hero/HeroSection";
import { HowItWorks } from "@/components/how-it-works/HowItWorks";
import { MemorySection } from "@/components/memory/MemorySection";
import { PersonalizationSection } from "@/components/personalization/PersonalizationSection";
import { ProblemSection } from "@/components/problem/ProblemSection";
import { SecuritySection } from "@/components/security/SecuritySection";
import { SolutionSection } from "@/components/solution/SolutionSection";
import { TrustSection } from "@/components/trust/TrustSection";
import { UseCases } from "@/components/use-cases/UseCases";

export default function LandingPage() {
  return (
    <>
      <HeroSection />
      <TrustSection />
      <ProblemSection />
      <SolutionSection />
      <HowItWorks />
      <FeaturesSection />
      <VoiceDemo />
      <UseCases />
      <AICapabilities />
      <PersonalizationSection />
      <MemorySection />
      <SecuritySection />
      <FAQ />
      <FinalCTA />
    </>
  );
}
