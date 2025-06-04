import { HeroSection } from "@/components/landing/hero";
import { AboutSection } from "@/components/landing/about";
import { FounderSection } from "@/components/landing/founder";
import { WhatIsSowSuccessSection } from "@/components/landing/what-is";
import { WhyJoinSection } from "@/components/landing/why-join";
import { TrainingProgramsSection } from "@/components/landing/programs";
import { GetStartedSection } from "@/components/landing/get-started";
import { FaqSection } from "@/components/landing/faq";

import './globals.css';
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <FounderSection />
      <WhatIsSowSuccessSection />
      <WhyJoinSection />
      <TrainingProgramsSection />
      <GetStartedSection />
      <FaqSection />
    </>
  );
}
