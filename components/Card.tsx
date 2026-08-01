'use client';

import { ReactNode } from 'react';

interface CardProps {
    children: ReactNode;
    className?: string;
    hover?: boolean;
    /** Removes inner padding when the card owns edge-to-edge media. */
    flush?: boolean;
    as?: 'div' | 'article' | 'li';
}

/**
 * Hover is handled in CSS (`.card-interactive`) rather than by animating a
 * Framer `scale`. The old version used `rotateY: 2` with no perspective set,
 * which read as a flat horizontal squash, and scaling a glass surface
 * resampled its backdrop-filter every frame — visibly expensive on mobile.
 */
const Card = ({ children, className = '', hover = true, flush = false, as: Tag = 'div' }: CardProps) => (
    <Tag
        className={[
            'glass rounded-card',
            flush ? 'overflow-hidden' : 'p-6 sm:p-7',
            hover ? 'card-interactive' : '',
            className,
        ].join(' ')}
    >
        {children}
    </Tag>
);

export default Card;
