'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import ScrollReveal from './ScrollReveal';

interface Technology {
    name: string;
    icon: string;
    category: string;
}

const technologies: Technology[] = [
    // Frontend
    { name: 'React', icon: '⚛️', category: 'Frontend' },
    { name: 'Next.js', icon: '▲', category: 'Frontend' },
    { name: 'Vue.js', icon: '💚', category: 'Frontend' },
    { name: 'Angular', icon: '🅰️', category: 'Frontend' },
    { name: 'TypeScript', icon: '📘', category: 'Frontend' },
    { name: 'Tailwind CSS', icon: '🎨', category: 'Frontend' },

    // Backend
    { name: 'Node.js', icon: '🟢', category: 'Backend' },
    { name: 'Python', icon: '🐍', category: 'Backend' },
    { name: 'Java', icon: '☕', category: 'Backend' },
    { name: 'Go', icon: '🔷', category: 'Backend' },
    { name: 'GraphQL', icon: '◼️', category: 'Backend' },
    { name: 'REST API', icon: '🔌', category: 'Backend' },

    // AI/ML
    { name: 'TensorFlow', icon: '🧠', category: 'AI' },
    { name: 'PyTorch', icon: '🔥', category: 'AI' },
    { name: 'LangChain', icon: '🦜', category: 'AI' },
    { name: 'OpenAI', icon: '🤖', category: 'AI' },
    { name: 'Hugging Face', icon: '🤗', category: 'AI' },

    // Cloud
    { name: 'AWS', icon: '☁️', category: 'Cloud' },
    { name: 'Google Cloud', icon: '🌐', category: 'Cloud' },
    { name: 'Azure', icon: '🔷', category: 'Cloud' },
    { name: 'Docker', icon: '🐳', category: 'Cloud' },
    { name: 'Kubernetes', icon: '☸️', category: 'Cloud' },

    // Databases
    { name: 'PostgreSQL', icon: '🐘', category: 'Database' },
    { name: 'MongoDB', icon: '🍃', category: 'Database' },
    { name: 'Redis', icon: '🔴', category: 'Database' },
    { name: 'MySQL', icon: '🐬', category: 'Database' },
];

const categories = ['All', 'Frontend', 'Backend', 'AI', 'Cloud', 'Database'];

const TechGrid = () => {
    const [activeCategory, setActiveCategory] = useState('All');

    const filteredTech = activeCategory === 'All'
        ? technologies
        : technologies.filter((tech) => tech.category === activeCategory);

    return (
        <div>
            {/* Category Filter */}
            <ScrollReveal variant="fadeIn">
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    {categories.map((category) => (
                        <motion.button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${activeCategory === category
                                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white neon-glow'
                                    : 'glass border border-gray-700 text-gray-300 hover:border-blue-500/50'
                                }`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {category}
                        </motion.button>
                    ))}
                </div>
            </ScrollReveal>

            {/* Tech Grid */}
            <motion.div
                className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6"
                layout
            >
                {filteredTech.map((tech, index) => (
                    <ScrollReveal
                        key={tech.name}
                        delay={index * 0.05}
                        variant="scale"
                    >
                        <motion.div
                            className="glass p-6 rounded-xl border border-gray-700 hover:border-blue-500/50 transition-all duration-300 flex flex-col items-center justify-center gap-3 group cursor-pointer"
                            whileHover={{
                                scale: 1.05,
                                boxShadow: '0 0 30px rgba(59, 130, 246, 0.3)',
                            }}
                            layout
                        >
                            <motion.div
                                className="text-4xl"
                                whileHover={{ rotate: 360, scale: 1.2 }}
                                transition={{ duration: 0.6 }}
                            >
                                {tech.icon}
                            </motion.div>
                            <div className="text-sm font-semibold text-center group-hover:text-blue-400 transition-colors">
                                {tech.name}
                            </div>
                            <div className="text-xs text-gray-500 font-mono">
                                {tech.category}
                            </div>
                        </motion.div>
                    </ScrollReveal>
                ))}
            </motion.div>
        </div>
    );
};

export default TechGrid;
