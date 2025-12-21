'use client';

import { motion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';

interface ProcessStep {
    number: string;
    title: string;
    description: string;
    icon: string;
}

const steps: ProcessStep[] = [
    {
        number: '01',
        title: 'Discover',
        description: 'We dive deep into your business goals, challenges, and requirements to understand the full scope of your project.',
        icon: '🔍',
    },
    {
        number: '02',
        title: 'Design',
        description: 'Our architects craft scalable system designs and user experiences that align with your vision and technical needs.',
        icon: '✏️',
    },
    {
        number: '03',
        title: 'Build',
        description: 'Expert engineers develop your solution using cutting-edge technologies and best practices for quality and performance.',
        icon: '⚙️',
    },
    {
        number: '04',
        title: 'Deploy',
        description: 'We ensure smooth deployment to production with comprehensive testing, monitoring, and infrastructure setup.',
        icon: '🚀',
    },
    {
        number: '05',
        title: 'Scale',
        description: 'Continuous optimization and support to help your product grow and adapt to changing business needs.',
        icon: '📈',
    },
];

const ProcessTimeline = () => {
    return (
        <div className="relative">
            {/* Connecting Line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-cyan-400 to-purple-500 hidden md:block" />

            <div className="space-y-12 md:space-y-24">
                {steps.map((step, index) => (
                    <ScrollReveal
                        key={step.number}
                        delay={index * 0.1}
                        variant={index % 2 === 0 ? 'slideRight' : 'slideLeft'}
                    >
                        <div
                            className={`flex flex-col md:flex-row items-center gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                                }`}
                        >
                            {/* Content */}
                            <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                                <motion.div
                                    className="glass p-6 md:p-8 rounded-xl border border-gray-700 hover:border-blue-500/50 transition-all duration-300"
                                    whileHover={{ scale: 1.02 }}
                                >
                                    <div className="text-sm font-mono text-cyan-400 mb-2">
                                        Step {step.number}
                                    </div>
                                    <h3 className="text-2xl md:text-3xl font-bold font-display mb-3 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                                        {step.title}
                                    </h3>
                                    <p className="text-gray-300 leading-relaxed">
                                        {step.description}
                                    </p>
                                </motion.div>
                            </div>

                            {/* Icon Circle */}
                            <div className="relative flex-shrink-0">
                                <motion.div
                                    className="w-16 h-16 md:w-20 md:h-20 rounded-full glass border-2 border-blue-500 flex items-center justify-center text-3xl md:text-4xl relative z-10"
                                    whileHover={{ scale: 1.1, rotate: 360 }}
                                    transition={{ duration: 0.6 }}
                                >
                                    {step.icon}
                                </motion.div>
                                {/* Glow */}
                                <div className="absolute inset-0 rounded-full bg-blue-500/30 blur-xl" />
                            </div>

                            {/* Spacer for alternating layout */}
                            <div className="flex-1 hidden md:block" />
                        </div>
                    </ScrollReveal>
                ))}
            </div>
        </div>
    );
};

export default ProcessTimeline;
