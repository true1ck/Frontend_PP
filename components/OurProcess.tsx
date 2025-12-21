'use client';

import { motion } from 'framer-motion';
import Section from './Section';

const OurProcess = () => {
  const steps = [
    {
      number: '01',
      title: 'Discover',
      description: 'We dive deep into your business goals, challenges, and requirements to create a solid foundation.',
      icon: '🔍',
    },
    {
      number: '02',
      title: 'Design',
      description: 'Our architects craft scalable solutions with user experience and technical excellence in mind.',
      icon: '✏️',
    },
    {
      number: '03',
      title: 'Build',
      description: 'Agile development with regular updates, ensuring quality code and continuous integration.',
      icon: '⚙️',
    },
    {
      number: '04',
      title: 'Deploy',
      description: 'Smooth deployment to production with monitoring, testing, and rollback strategies.',
      icon: '🚀',
    },
    {
      number: '05',
      title: 'Scale',
      description: 'Ongoing optimization, support, and scaling as your business grows.',
      icon: '📈',
    },
  ];

  return (
    <Section className="bg-gradient-to-b from-transparent to-blue-900/10">
      <div className="text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold font-display mb-3 sm:mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent"
        >
          Our Process
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto px-4"
        >
          A proven methodology that delivers results
        </motion.p>
      </div>

      <div className="relative">
        {/* Connection Line */}
        <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 transform -translate-y-1/2" />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8 relative">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-3 sm:mb-4 glass rounded-full flex items-center justify-center text-3xl sm:text-4xl relative z-10"
              >
                {step.icon}
              </motion.div>
              <div className="text-cyan-400 text-xs sm:text-sm font-mono mb-2">{step.number}</div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2">{step.title}</h3>
              <p className="text-gray-400 text-xs sm:text-sm">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default OurProcess;
