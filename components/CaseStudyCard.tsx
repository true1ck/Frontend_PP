'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

interface CaseStudyCardProps {
    slug: string;
    title: string;
    client: string;
    description: string;
    technologies: string[];
    image?: string;
    category: string;
}

const CaseStudyCard = ({
    slug,
    title,
    client,
    description,
    technologies,
    image,
    category,
}: CaseStudyCardProps) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        // Temporarily disabled - will be used later
        // <Link href={`/case-studies/${slug}`}>
        <motion.div
            className="relative group h-full"
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            whileHover={{ y: -8 }}
            transition={{ duration: 0.3 }}
        >
            <div className="glass rounded-xl overflow-hidden border border-gray-700 hover:border-blue-500/50 transition-all duration-300 h-full flex flex-col">
                {/* Image */}
                <div className="relative h-48 bg-gradient-to-br from-blue-900/30 to-purple-900/30 overflow-hidden">
                    {image ? (
                        <Image
                            src={image}
                            alt={title}
                            fill
                            className="object-cover"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center">
                            <div className="text-6xl opacity-20">💼</div>
                        </div>
                    )}
                    {/* Category Badge */}
                    <div className="absolute top-4 right-4">
                        <span className="px-3 py-1 bg-blue-600/80 backdrop-blur-sm rounded-full text-xs font-semibold">
                            {category}
                        </span>
                    </div>
                    {/* Hover Overlay */}
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isHovered ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                    />
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                    <div className="text-sm text-cyan-400 font-mono mb-2">{client}</div>
                    <h3 className="text-xl font-bold font-display mb-3 group-hover:text-blue-400 transition-colors">
                        {title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4 flex-1 line-clamp-3">
                        {description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2">
                        {technologies.slice(0, 4).map((tech) => (
                            <span
                                key={tech}
                                className="px-2 py-1 bg-gray-800/50 border border-gray-700 rounded text-xs text-gray-300"
                            >
                                {tech}
                            </span>
                        ))}
                        {technologies.length > 4 && (
                            <span className="px-2 py-1 text-xs text-gray-400">
                                +{technologies.length - 4} more
                            </span>
                        )}
                    </div>

                    {/* Temporarily disabled - will be used later */}
                    {/* <motion.div
                            className="mt-4 flex items-center text-blue-400 text-sm font-semibold"
                            animate={{ x: isHovered ? 5 : 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            Read Case Study
                            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </motion.div> */}
                </div>
            </div>

            {/* Glow Effect */}
            <motion.div
                className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-xl -z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.3 }}
            />
        </motion.div>
        // </Link>
    );
};

export default CaseStudyCard;
