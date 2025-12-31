import Hero from "@/components/Hero";
import WhoWeAre from "@/components/WhoWeAre";
import ServicesOverview from "@/components/ServicesOverview";
import FeaturedProjects from "@/components/FeaturedProjects";
import OurProcess from "@/components/OurProcess";
// import TechStack from "@/components/TechStack";
import Section from "@/components/Section";
import ScrollReveal from "@/components/ScrollReveal";
import TechGrid from "@/components/TechGrid";
import CallToAction from "@/components/CallToAction";

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
