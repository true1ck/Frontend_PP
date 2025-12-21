import Hero from "@/components/Hero";
import WhoWeAre from "@/components/WhoWeAre";
import ServicesOverview from "@/components/ServicesOverview";
import FeaturedProjects from "@/components/FeaturedProjects";
import OurProcess from "@/components/OurProcess";
import TechStack from "@/components/TechStack";
import CallToAction from "@/components/CallToAction";

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
