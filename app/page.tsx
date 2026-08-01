import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Hero from '@/components/Hero';
import Section from '@/components/Section';
import SectionHeading from '@/components/SectionHeading';
import TechGrid from '@/components/TechGrid';
import JsonLd from '@/components/JsonLd';
import { organizationSchema, websiteSchema, faqSchema, servicesSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'AI Development Agency in India — WhatsApp Bots & RAG Systems | PandaPath',
  description:
    'PandaPath builds WhatsApp AI bots, RAG knowledge systems and full-stack AI products for Indian startups. Fixed pricing from ₹25,000, live in 2–4 weeks, direct access to your developer. Based in Bangalore.',
  alternates: { canonical: '/' },
};

// Below-the-fold sections stay lazy so the hero (and its WebGL background)
// gets the initial bundle to itself.
const WhoWeAre = dynamic(() => import('@/components/WhoWeAre'));
const ServicesOverview = dynamic(() => import('@/components/ServicesOverview'));
const FeaturedProjects = dynamic(() => import('@/components/FeaturedProjects'));
const OurProcess = dynamic(() => import('@/components/OurProcess'));
const FAQ = dynamic(() => import('@/components/FAQ'));
const CallToAction = dynamic(() => import('@/components/CallToAction'));

export default function Home() {
  return (
    <>
      <JsonLd data={organizationSchema} />
      <JsonLd data={websiteSchema} />
      <JsonLd data={servicesSchema} />
      <JsonLd data={faqSchema} />

      <Hero />
      <WhoWeAre />
      <ServicesOverview />
      <FeaturedProjects />
      <OurProcess />

      <Section id="tech-stack" aura>
        <SectionHeading
          eyebrow="Technology"
          title="The stack we build on"
          description="Boring, proven tools chosen because they are fast to build with and cheap for you to maintain after we hand over."
        />
        <div className="mt-12">
          <TechGrid />
        </div>
      </Section>

      <FAQ />
      <CallToAction />
    </>
  );
}
