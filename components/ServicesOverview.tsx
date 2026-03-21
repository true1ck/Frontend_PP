'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Section from './Section';
import Card from './Card';
import { useTheme } from '@/contexts/ThemeContext';

const ServicesOverview = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  const services = [
    {
      title: 'WhatsApp AI Bot',
      tagline: 'from ₹25,000 · 2 weeks',
      description: 'Fully automated WhatsApp assistant for customer queries, lead capture, and sales — 24/7, no human agent needed.',
      icon: '💬',
      technologies: ['WhatsApp API', 'LLMs', 'Node.js'],
    },
    {
      title: 'RAG Knowledge System',
      tagline: 'from ₹40,000 · 3 weeks',
      description: 'Turn your docs, PDFs, and SOPs into a smart AI assistant your team or customers can query in plain English.',
      icon: '🧠',
      technologies: ['RAG', 'OpenAI / Gemini', 'Vector DB'],
    },
    {
      title: 'Full AI Product Build',
      tagline: 'from ₹80,000 · 4–6 weeks',
      description: 'End-to-end AI-powered web or mobile app — with production deployment, APIs, and 30 days post-launch support.',
      icon: '🚀',
      technologies: ['Next.js', 'React Native', 'AI APIs'],
    },
    {
      title: 'AI Business Audit',
      tagline: '₹6,000 · 2 hours',
      description: 'Not sure where to start? We review your business and tell you exactly which AI tool saves the most time and money.',
      icon: '🔍',
      technologies: ['Strategy', 'Process mapping', 'Tooling'],
    },
  ];

  return (
    <Section className="py-8">
      <div className="text-center mb-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold font-display mb-3 sm:mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
        >
          Our Services
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto px-4"
        >
          AI-first builds for Indian startups — WhatsApp bots, RAG systems, and full-stack products.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8">
        {services.map((service, index) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="h-full">
              <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">{service.icon}</div>
              <h3 className={`text-xl sm:text-2xl font-bold mb-1 sm:mb-2 transition-colors ${
                !mounted 
                  ? 'text-white hover:text-cyan-400'
                  : theme === 'light' 
                    ? 'text-gray-900 hover:text-gray-700' 
                    : 'text-white hover:text-cyan-400'
              }`}>{service.title}</h3>
              <div className="text-xs font-semibold text-cyan-400 font-mono mb-2 sm:mb-3">{service.tagline}</div>
              <p className="text-sm sm:text-base text-gray-400 mb-3 sm:mb-4">{service.description}</p>
              <div className="flex flex-wrap gap-2">
                {service.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-xs bg-blue-500/20 text-blue-400 rounded-full border border-blue-500/30"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};

export default ServicesOverview;
