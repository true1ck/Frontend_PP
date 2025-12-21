'use client';

import { motion } from 'framer-motion';
import Section from './Section';

const WhoWeAre = () => {
  return (
    <Section className="bg-gradient-to-b from-transparent to-blue-900/10">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center max-w-4xl mx-auto"
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display mb-4 sm:mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Who We Are
        </h2>
        <p className="text-base sm:text-lg text-gray-300 leading-relaxed mb-4 sm:mb-6 px-4">
          PandaPaths is a premium IT solutions company that transforms ambitious ideas into
          production-ready digital products. We specialize in building scalable, maintainable
          software systems that grow with your business.
        </p>
        <p className="text-base sm:text-lg text-gray-300 leading-relaxed mb-6 sm:mb-8 px-4">
          Our architecture-first mindset ensures every solution we deliver is built on solid foundations,
          optimized for performance, and designed for the future. From startups to enterprises, we engineer
          digital paths that lead to success.
        </p>

        {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mt-8 sm:mt-12">
          {[
            { number: '100+', label: 'Projects Delivered' },
            { number: '50+', label: 'Happy Clients' },
            { number: '10+', label: 'Years Experience' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              viewport={{ once: true }}
              className="glass p-6 rounded-xl"
            >
              <div className="text-3xl sm:text-4xl font-bold text-cyan-400 mb-2">{stat.number}</div>
              <div className="text-sm sm:text-base text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </div> */}
      </motion.div>
    </Section>
  );
};

export default WhoWeAre;
