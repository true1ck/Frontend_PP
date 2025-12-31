'use client';

import { motion } from 'framer-motion';
import Section from './Section';
import Button from './Button';

const CallToAction = () => {
  return (
    <Section className="relative overflow-hidden py-8">


      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative glass p-6 sm:p-8 md:p-12 rounded-2xl text-center max-w-4xl mx-auto"
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold font-display mb-4 sm:mb-6 bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent"
        >
          Ready to Build Something Amazing?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto px-4"
        >
          Let&apos;s transform your vision into a powerful digital product.
          Get a free consultation with our expert team today.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center"
        >
          <Button href="/contact" variant="primary">
            Book Free Consultation
          </Button>
          <Button href="/services" variant="outline">
            Explore Services
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-6 sm:mt-8 text-xs sm:text-sm text-gray-500"
        >
          No commitment required • Free project assessment • 24-48h response time
        </motion.div>
      </motion.div>
    </Section>
  );
};

export default CallToAction;
