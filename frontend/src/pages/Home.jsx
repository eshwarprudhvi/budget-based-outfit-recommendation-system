import Hero from "../components/landingPage/Hero";
import HowItWorks from "../components/landingPage/HowItWorks";
import WhyChooseUs from "../components/landingPage/WhyChooseUs";
import PoweredSection from "../components/landingPage/PoweredSection";
import LastSection from "../components/landingPage/LastSection";
export default function Home() {
  return (
    <div className="min-h-screen w-full">
      <Hero />
      <WhyChooseUs />
      <HowItWorks />
      <PoweredSection />
      <LastSection />
    </div>
  );
}
