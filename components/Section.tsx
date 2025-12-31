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
    <section id={id} className={`py-6 sm:py-8 md:py-10 lg:py-12 xl:py-14 px-4 sm:px-6 md:px-8 lg:px-12 ${className}`}>
      <div className="container mx-auto max-w-7xl">
        {children}
      </div>
    </section>
  );


};

export default Section;
