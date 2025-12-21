'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

const Card = ({ children, className = '', hover = true }: CardProps) => {
  return (
    <motion.div
      whileHover={hover ? { scale: 1.02, rotateY: 2 } : {}}
      className={`glass rounded-xl p-6 ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default Card;
