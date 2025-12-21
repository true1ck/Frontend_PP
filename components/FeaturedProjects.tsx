'use client';

import { motion } from 'framer-motion';
import Section from './Section';
import Card from './Card';
import Button from './Button';

const FeaturedProjects = () => {
  const projects = [
    {
      title: 'E-Commerce Platform',
      client: 'RetailTech Inc.',
      description: 'Built a scalable e-commerce platform handling 100K+ daily transactions with AI-powered recommendations.',
      technologies: ['Next.js', 'Node.js', 'PostgreSQL', 'Redis'],
      impact: '3x increase in conversion rate',
    },
    {
      title: 'Healthcare AI Assistant',
      client: 'MedHealth Solutions',
      description: 'Developed an intelligent chatbot using RAG and LLMs to assist patients with medical queries.',
      technologies: ['Python', 'LangChain', 'OpenAI', 'FastAPI'],
      impact: '80% reduction in support tickets',
    },
    {
      title: 'FinTech Mobile App',
      client: 'PayFlow',
      description: 'Cross-platform mobile app for seamless money transfers with biometric authentication.',
      technologies: ['Flutter', 'Firebase', 'AWS', 'Stripe'],
      impact: '500K+ downloads in 6 months',
    },
  ];

  return (
    <Section className="bg-gradient-to-b from-purple-900/10 to-transparent">
      <div className="text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold font-display mb-3 sm:mb-4 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent"
        >
          Featured Projects
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto px-4"
        >
          Real results for real businesses
        </motion.p>
      </div>

      <div className="space-y-8 mb-12">
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <div className="text-xs sm:text-sm text-cyan-400 mb-2">{project.client}</div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3">{project.title}</h3>
                  <p className="text-sm sm:text-base text-gray-400 mb-3 sm:mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs bg-purple-500/20 text-purple-400 rounded-full border border-purple-500/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col justify-center">
                  <div className="glass p-4 sm:p-6 rounded-lg text-center">
                    <div className="text-2xl sm:text-3xl font-bold text-green-400 mb-2">✓</div>
                    <div className="text-sm sm:text-base text-white font-semibold">{project.impact}</div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="text-center">
        <Button href="/case-studies" variant="secondary">
          View All Case Studies
        </Button>
      </div>
    </Section>
  );
};

export default FeaturedProjects;
