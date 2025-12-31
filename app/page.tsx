import dynamic from 'next/dynamic';
import Hero from "@/components/Hero";
import Section from "@/components/Section";
import ScrollReveal from "@/components/ScrollReveal";
import TechGrid from "@/components/TechGrid";

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
      {/*
      <TechStack />
      */}

      {/* Technology Stack section from Process & Tech page */}
      <Section className="py-8">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal variant="fadeIn">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold font-display mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Technology Stack
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                We leverage the best tools and frameworks to build scalable, performant, and maintainable solutions.
              </p>
            </div>
          </ScrollReveal>
          <TechGrid />
        </div>
      </Section>
      <CallToAction />
    </>
  );
}
