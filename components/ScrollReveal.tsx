'use client';

import { motion, useInView, Variants } from 'framer-motion';
import { useRef, ReactNode } from 'react';

interface ScrollRevealProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    duration?: number;
    variant?: 'fadeIn' | 'slideUp' | 'slideLeft' | 'slideRight' | 'scale';
    once?: boolean;
}

const variants: Record<string, Variants> = {
    fadeIn: {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    },
    slideUp: {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
    },
    slideLeft: {
        hidden: { opacity: 0, x: 50 },
        visible: { opacity: 1, x: 0 },
    },
    slideRight: {
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0 },
    },
    scale: {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1 },
    },
};

const ScrollReveal = ({
    children,
    className = '',
    delay = 0,
    duration = 0.6,
    variant = 'slideUp',
    once = true,
}: ScrollRevealProps) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once, margin: '-100px' });

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={variants[variant]}
            transition={{ duration, delay }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

export default ScrollReveal;
