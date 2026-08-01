'use client';

import Link from 'next/link';
import { ReactNode, ButtonHTMLAttributes } from 'react';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps
    extends Omit<
        ButtonHTMLAttributes<HTMLButtonElement>,
        'onAnimationStart' | 'onAnimationEnd' | 'onDrag' | 'onDragStart' | 'onDragEnd'
    > {
    children: ReactNode;
    variant?: Variant;
    size?: Size;
    className?: string;
    onClick?: () => void;
    href?: string;
    loading?: boolean;
    disabled?: boolean;
    icon?: ReactNode;
    /** Icon rendered after the label — use for directional affordances. */
    trailingIcon?: ReactNode;
    fullWidth?: boolean;
}

const sizes: Record<Size, string> = {
    sm: 'px-4 py-2 text-sm min-h-[40px] gap-1.5',
    md: 'px-5 sm:px-6 py-3 text-sm sm:text-base min-h-[48px] gap-2',
    lg: 'px-7 sm:px-8 py-3.5 text-base sm:text-lg min-h-[54px] gap-2.5',
};

const variants: Record<Variant, string> = {
    // One primary action per view — this is the only variant with a glow.
    primary:
        'text-white bg-[linear-gradient(100deg,#2563eb,#0891b2_55%,#7c3aed)] bg-[length:200%_100%] bg-left hover:bg-right shadow-[0_8px_28px_-8px_rgb(37_99_235/0.65)] hover:shadow-[0_14px_40px_-10px_rgb(37_99_235/0.75)]',
    secondary:
        'text-white bg-[linear-gradient(100deg,#0891b2,#2563eb)] shadow-[0_8px_24px_-10px_rgb(8_145_178/0.6)] hover:shadow-[0_12px_32px_-10px_rgb(8_145_178/0.7)]',
    outline:
        'border border-[rgb(var(--border-strong))] text-body hover:border-[var(--brand)] hover:text-brand backdrop-blur-sm bg-[rgb(var(--surface))]',
    ghost:
        'text-muted hover:text-brand hover:bg-[rgb(var(--surface))]',
};

const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    onClick,
    href,
    loading = false,
    disabled = false,
    icon,
    trailingIcon,
    fullWidth = false,
    type = 'button',
    ...props
}: ButtonProps) => {
    const isDisabled = disabled || loading;

    const base = [
        'group relative inline-flex items-center justify-center rounded-full font-semibold',
        'transition-[background-position,box-shadow,border-color,color,transform] duration-300 ease-out-expo',
        // Press feedback without layout shift (transform only)
        'active:scale-[0.97] touch-manipulation select-none',
        sizes[size],
        variants[variant],
        fullWidth ? 'w-full' : '',
        isDisabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : 'cursor-pointer',
        className,
    ].join(' ');

    const inner = (
        <>
            {loading && (
                <svg
                    className="animate-spin h-4 w-4 shrink-0"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                >
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                </svg>
            )}
            {!loading && icon && <span className="shrink-0" aria-hidden="true">{icon}</span>}
            <span>{children}</span>
            {trailingIcon && (
                <span
                    className="shrink-0 transition-transform duration-300 ease-out-expo group-hover:translate-x-1"
                    aria-hidden="true"
                >
                    {trailingIcon}
                </span>
            )}
        </>
    );

    // A link is a link and a button is a button. The previous version nested
    // <button> inside <a>, which is invalid HTML and gives screen readers two
    // conflicting roles for one control.
    if (href && !isDisabled) {
        const isExternal = /^(https?:|mailto:|tel:)/.test(href);

        if (isExternal) {
            return (
                <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={base}
                    onClick={onClick}
                >
                    {inner}
                </a>
            );
        }

        // next/link keeps client-side navigation — plain <a> forced a full
        // document reload on every CTA, which also remounted the WebGL hero.
        return (
            <Link href={href} className={base} onClick={onClick}>
                {inner}
            </Link>
        );
    }

    return (
        <button className={base} onClick={onClick} disabled={isDisabled} type={type} {...props}>
            {inner}
        </button>
    );
};

export default Button;
