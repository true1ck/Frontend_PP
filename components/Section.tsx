'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

const Section = ({ children, className = '', id }: SectionProps) => {
  return (
    <section id={id} className={`py-12 sm:py-16 md:py-20 px-4 sm:px-6 ${className}`}>
      <div className="container mx-auto max-w-7xl">
        {children}
      </div>
    </section>
  );
};

export default Section;
