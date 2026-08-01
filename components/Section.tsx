'use client';

import { ReactNode } from 'react';

interface SectionProps {
    children: ReactNode;
    className?: string;
    id?: string;
    /** Vertical rhythm tier. `hero` adds clearance for the fixed navbar. */
    size?: 'sm' | 'md' | 'hero' | 'none';
    /** Soft radial brand wash behind the content. */
    aura?: boolean;
    as?: 'section' | 'div';
    /** Narrower measure for reading-heavy sections. */
    width?: 'default' | 'narrow' | 'wide';
}

const sizes = {
    none: '',
    sm: 'py-[clamp(2.5rem,5vw,4.5rem)]',
    md: 'py-[clamp(3.5rem,7vw,7rem)]',
    hero: 'pt-[clamp(7rem,14vw,11rem)] pb-[clamp(3rem,6vw,6rem)]',
};

const widths = {
    narrow: 'max-w-3xl',
    default: 'max-w-7xl',
    wide: 'max-w-[88rem]',
};

const Section = ({
    children,
    className = '',
    id,
    size = 'md',
    aura = false,
    as: Tag = 'section',
    width = 'default',
}: SectionProps) => (
    <Tag
        id={id}
        className={`relative px-4 sm:px-6 lg:px-8 ${sizes[size]} ${aura ? 'aura' : ''} ${className}`}
    >
        <div className={`relative z-[1] container mx-auto ${widths[width]}`}>{children}</div>
    </Tag>
);

export default Section;
