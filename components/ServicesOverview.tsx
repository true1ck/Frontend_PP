'use client';

import { motion } from 'framer-motion';
import Section from './Section';
import Card from './Card';

const ServicesOverview = () => {
  const services = [
    {
      title: 'Web Development',
      description: 'Modern, responsive web applications built with React, Next.js, and cutting-edge technologies.',
      icon: '🌐',
      technologies: ['React', 'Next.js', 'TypeScript'],
    },
    {
      title: 'Mobile App Development',
      description: 'Native and cross-platform mobile apps for iOS and Android that users love.',
      icon: '📱',
      technologies: ['Android', 'iOS', 'Flutter'],
    },
    {
      title: 'AI & Machine Learning',
      description: 'Intelligent systems powered by LLMs, RAG, and custom ML models.',
      icon: '🤖',
      technologies: ['LLMs', 'RAG', 'Custom ML'],
    },
    {
      title: 'System Design',
      description: 'Scalable, maintainable architecture that grows with your business.',
      icon: '🏗️',
      technologies: ['Microservices', 'Cloud-Native', 'API Design'],
    },
    {
      title: 'Cloud & DevOps',
      description: 'Cloud infrastructure and deployment automation on AWS, GCP, and more.',
      icon: '☁️',
      technologies: ['AWS', 'GCP', 'Docker'],
    },
    {
      title: 'Automation & APIs',
      description: 'Workflow automation and seamless third-party integrations.',
      icon: '⚡',
      technologies: ['REST', 'GraphQL', 'Webhooks'],
    },
  ];

  return (
    <Section className="pt-0 -mt-12 sm:-mt-16 md:-mt-20 lg:-mt-24 -mb-12 sm:-mb-16 md:-mb-20 lg:-mb-24">
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
          End-to-end IT solutions tailored to your business needs
        </motion.p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
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
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3">{service.title}</h3>
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
