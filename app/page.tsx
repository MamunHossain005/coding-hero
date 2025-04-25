import BgGradient from "@/components/common/bg-gradient";
import CTASection from "@/components/home/cta-Section";
import DemoSection from "@/components/home/demo-section";
import HeroSection from "@/components/home/hero-section";
import HowItWorks from "@/components/home/how-it-works-section";
import PricingSection from "@/components/home/pricing-section";

export default function Home() {
  return (
    <div >
      <div className="relative w-full">
        <BgGradient />
        <div className="flex flex-col">
          <HeroSection />
          <DemoSection />
          <HowItWorks />
          <PricingSection />
          <CTASection />
        </div>
      </div>
    </div>
  );
}
