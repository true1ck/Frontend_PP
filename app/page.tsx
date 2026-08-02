import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Hero from '@/components/Hero';
import Section from '@/components/Section';
import SectionHeading from '@/components/SectionHeading';
import TechGrid from '@/components/TechGrid';
import JsonLd from '@/components/JsonLd';
import { organizationSchema, websiteSchema, faqSchema, servicesSchema, OG_IMAGE, OG_DEFAULTS } from '@/lib/seo';
import { SITE } from '@/lib/content';

export const metadata: Metadata = {
  // Leads with the primary query and keeps the brand, while staying under the
  // ~60-char point where Google truncates. The homepage uses the `default`
  // title rather than the " · PandaPath" template, so the brand sits here.
  title: 'AI Development Agency India — WhatsApp & RAG | PandaPath',
  description:
    'PandaPath builds WhatsApp AI bots, RAG systems and full-stack AI products for Indian startups. Fixed pricing from ₹25,000, live in 2–4 weeks.',
  alternates: { canonical: '/' },
  openGraph: {
    ...OG_DEFAULTS,
    // OG titles are standalone (no template, no truncation limit), so this one
    // can be longer and more descriptive than the <title>.
    title: 'PandaPath — AI Products for Indian Startups, Shipped in Weeks',
    description:
      'WhatsApp AI bots, RAG systems, and full-stack AI builds. Fixed pricing from ₹25,000, live in 2–4 weeks. Bangalore-based, founder-direct.',
    url: SITE.url,
    images: [OG_IMAGE],
  },
  twitter: { images: [OG_IMAGE.url] },
};

// Below-the-fold sections stay lazy so the hero (and its WebGL background)
// gets the initial bundle to itself.
const WhoWeAre = dynamic(() => import('@/components/WhoWeAre'));
const ServicesOverview = dynamic(() => import('@/components/ServicesOverview'));
const CoFounderTeaser = dynamic(() => import('@/components/CoFounderTeaser'));
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
      <CoFounderTeaser />
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
