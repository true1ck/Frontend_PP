'use client';

import ProjectArtwork, { type ArtworkVariant } from './ProjectArtwork';

interface CaseStudyCardProps {
    title: string;
    descriptor: string;
    description: string;
    technologies: string[];
    category: string;
    artwork: ArtworkVariant;
}

const CaseStudyCard = ({
    title,
    descriptor,
    description,
    technologies,
    category,
    artwork,
}: CaseStudyCardProps) => (
    <article className="group glass card-interactive flex h-full flex-col overflow-hidden rounded-card">
        <div className="relative h-44 overflow-hidden text-body">
            <ProjectArtwork
                variant={artwork}
                className="absolute inset-0 h-full w-full transition-transform duration-700 ease-out-expo group-hover:scale-[1.06]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)]/55 to-transparent" />
            <span className="absolute right-3 top-3 rounded-pill border border-[rgb(var(--border-strong))] bg-[var(--bg)]/70 px-2.5 py-1 font-mono text-[0.65rem] uppercase tracking-wider text-brand backdrop-blur-md">
                {category}
            </span>
        </div>

        <div className="flex flex-1 flex-col p-6">
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-brand">
                {descriptor}
            </p>
            <h3 className="mt-2 text-lg font-bold font-display text-body transition-colors group-hover:text-brand">
                {title}
            </h3>
            <p className="mt-2.5 flex-1 text-sm leading-relaxed text-muted">{description}</p>

            <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Technologies used">
                {technologies.slice(0, 4).map((tech) => (
                    <li
                        key={tech}
                        className="rounded-pill border border-[rgb(var(--border))] px-2.5 py-1 font-mono text-[0.65rem] text-subtle"
                    >
                        {tech}
                    </li>
                ))}
            </ul>
        </div>
    </article>
);

export default CaseStudyCard;
