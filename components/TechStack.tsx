'use client';

import { motion } from 'framer-motion';
import Section from './Section';

const TechStack = () => {
  const categories = [
    {
      name: 'Frontend',
      technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Vue.js'],
      color: 'blue',
    },
    {
      name: 'Backend',
      technologies: ['Node.js', 'Python', 'Go', 'Java', 'GraphQL'],
      color: 'purple',
    },
    {
      name: 'AI/ML',
      technologies: ['OpenAI', 'LangChain', 'TensorFlow', 'PyTorch', 'Hugging Face'],
      color: 'cyan',
    },
    {
      name: 'Cloud',
      technologies: ['AWS', 'GCP', 'Azure', 'Docker', 'Kubernetes'],
      color: 'purple',
    },
    {
      name: 'Databases',
      technologies: ['PostgreSQL', 'MongoDB', 'Redis', 'Elasticsearch', 'DynamoDB'],
      color: 'blue',
    },
  ];

  return (
    <Section className="bg-gradient-to-b from-blue-900/10 to-purple-900/10">
      <div className="text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold font-display mb-3 sm:mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"
        >
          Technology Stack
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto px-4"
        >
          We use cutting-edge technologies to build future-proof solutions
        </motion.p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {categories.map((category, index) => (
          <motion.div
            key={category.name}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            viewport={{ once: true }}
            className="glass p-6 rounded-xl"
          >
            <h3 className={`text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-${category.color}-400`}>
              {category.name}
            </h3>
            <div className="flex flex-wrap gap-2">
              {category.technologies.map((tech) => (
                <motion.span
                  key={tech}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm bg-${category.color}-500/10 text-${category.color}-400 rounded-lg border border-${category.color}-500/30 cursor-default`}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};

export default TechStack;
