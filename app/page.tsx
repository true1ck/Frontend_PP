import dynamic from 'next/dynamic';
import Hero from "@/components/Hero";

// Lazy load below-the-fold components to improve initial page load
// These components will load as the user scrolls, reducing initial bundle size
const WhoWeAre = dynamic(() => import("@/components/WhoWeAre"), {
  loading: () => <div className="min-h-[400px]" />, // Placeholder to prevent layout shift
});

const ServicesOverview = dynamic(() => import("@/components/ServicesOverview"), {
  loading: () => <div className="min-h-[400px]" />,
});

const FeaturedProjects = dynamic(() => import("@/components/FeaturedProjects"), {
  loading: () => <div className="min-h-[400px]" />,
});

const OurProcess = dynamic(() => import("@/components/OurProcess"), {
  loading: () => <div className="min-h-[400px]" />,
});

const TechStack = dynamic(() => import("@/components/TechStack"), {
  loading: () => <div className="min-h-[400px]" />,
});

const CallToAction = dynamic(() => import("@/components/CallToAction"), {
  loading: () => <div className="min-h-[400px]" />,
});

export default function Home() {
  return (
    <>
      <Hero />
      <WhoWeAre />
      <ServicesOverview />
      <FeaturedProjects />
      <OurProcess />
      <TechStack />
      <CallToAction />
    </>
  );
}
