'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Section from './Section';
import SectionHeading from './SectionHeading';
import Button from './Button';
import ProjectArtwork from './ProjectArtwork';
import { featuredProjects } from '@/lib/content';

const ease = [0.22, 1, 0.36, 1] as const;

const FeaturedProjects = () => (
    <Section id="work" aura>
        <SectionHeading
            eyebrow="Selected work"
            title="What we've shipped"
            description="A few recent builds. Client names are withheld under NDA — the problems, the approach and the timelines are exactly as delivered."
        />

        <div className="mt-14 space-y-6">
            {featuredProjects.map((project, index) => (
                <motion.article
                    key={project.slug}
                    initial={{ opacity: 0, y: 32 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.6, ease }}
                    className="group glass card-interactive overflow-hidden rounded-card"
                >
                    <div className="grid lg:grid-cols-5">
                        {/* Artwork — alternates sides so the eye zig-zags down
                            the page instead of running down one rail. */}
                        <div
                            className={`relative min-h-[200px] overflow-hidden text-body sm:min-h-[240px] lg:col-span-2 lg:min-h-full ${
                                index % 2 === 1 ? 'lg:order-2' : ''
                            }`}
                        >
                            <ProjectArtwork
                                variant={project.artwork}
                                className="absolute inset-0 h-full w-full transition-transform duration-700 ease-out-expo group-hover:scale-[1.04]"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)]/45 to-transparent lg:bg-gradient-to-r" />
                        </div>

                        {/* Copy */}
                        <div className="p-6 sm:p-8 lg:col-span-3 lg:p-10">
                            <div className="font-mono text-xs uppercase tracking-[0.16em] text-brand">
                                {project.descriptor}
                            </div>

                            <h3 className="mt-3 text-title font-bold font-display text-body">
                                {project.title}
                            </h3>

                            <div className="mt-5 space-y-4">
                                <div>
                                    <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-subtle">
                                        The problem
                                    </div>
                                    <p className="text-sm leading-relaxed text-muted">{project.problem}</p>
                                </div>
                                <div>
                                    <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-subtle">
                                        What we built
                                    </div>
                                    <p className="text-sm leading-relaxed text-muted">{project.outcome}</p>
                                </div>
                            </div>

                            {/* Outcome metrics */}
                            <dl className="mt-6 grid grid-cols-3 gap-4 border-t border-[rgb(var(--border))] pt-5">
                                {project.metrics.map((metric) => (
                                    <div key={metric.label}>
                                        <dd className="font-mono text-base font-medium text-body tabular sm:text-lg">
                                            {metric.value}
                                        </dd>
                                        <dt className="mt-0.5 text-[0.7rem] leading-tight text-subtle sm:text-xs">
                                            {metric.label}
                                        </dt>
                                    </div>
                                ))}
                            </dl>

                            <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technologies used">
                                {project.technologies.map((tech) => (
                                    <li
                                        key={tech}
                                        className="rounded-pill border border-[rgb(var(--border))] px-2.5 py-1 font-mono text-[0.7rem] text-subtle"
                                    >
                                        {tech}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </motion.article>
            ))}
        </div>

        <div className="mt-12 text-center">
            <Button href="/case-studies" variant="outline" trailingIcon={<ArrowRight className="h-4 w-4" />}>
                View all case studies
            </Button>
        </div>
    </Section>
);

export default FeaturedProjects;
