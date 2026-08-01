'use client';

import { forwardRef, TextareaHTMLAttributes, useEffect, useRef, useId } from 'react';
import { AlertCircle } from 'lucide-react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
    helperText?: string;
    autoResize?: boolean;
    showCharCount?: boolean;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
    (
        {
            label,
            error,
            helperText,
            className = '',
            autoResize = false,
            showCharCount = false,
            maxLength,
            value,
            id,
            ...props
        },
        ref,
    ) => {
        const internalRef = useRef<HTMLTextAreaElement | null>(null);
        const generatedId = useId();
        const fieldId = id ?? `textarea-${generatedId}`;
        const errorId = `${fieldId}-error`;
        const helperId = `${fieldId}-helper`;
        const countId = `${fieldId}-count`;

        useEffect(() => {
            if (autoResize && internalRef.current) {
                internalRef.current.style.height = 'auto';
                internalRef.current.style.height = `${internalRef.current.scrollHeight}px`;
            }
        }, [value, autoResize]);

        const charCount = typeof value === 'string' ? value.length : 0;
        const nearLimit = maxLength ? charCount > maxLength * 0.9 : false;

        return (
            <div className="w-full">
                {label && (
                    <label htmlFor={fieldId} className="mb-2 block text-sm font-medium text-body">
                        {label}
                        {props.required && (
                            <span className="ml-1 text-red-400" aria-hidden="true">
                                *
                            </span>
                        )}
                        {props.required && <span className="sr-only"> (required)</span>}
                    </label>
                )}

                <textarea
                    ref={(node) => {
                        internalRef.current = node;
                        if (typeof ref === 'function') ref(node);
                        else if (ref) ref.current = node;
                    }}
                    id={fieldId}
                    value={value}
                    maxLength={maxLength}
                    aria-invalid={error ? true : undefined}
                    aria-describedby={
                        [error ? errorId : helperText ? helperId : null, showCharCount ? countId : null]
                            .filter(Boolean)
                            .join(' ') || undefined
                    }
                    className={`w-full resize-y rounded-xl border bg-[rgb(var(--surface))] px-4 py-3 text-body placeholder:text-subtle transition-colors duration-200 focus:outline-none focus-visible:border-[var(--brand)] focus-visible:ring-2 focus-visible:ring-[var(--brand)]/35 ${
                        error
                            ? 'border-red-500/60 focus-visible:border-red-500 focus-visible:ring-red-500/30'
                            : 'border-[rgb(var(--border-strong))]'
                    } ${className}`}
                    {...props}
                />

                <div className="mt-2 flex items-start justify-between gap-4">
                    <div className="flex-1">
                        {error && (
                            <p id={errorId} role="alert" className="flex items-start gap-1.5 text-sm text-red-400">
                                <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                                {error}
                            </p>
                        )}
                        {helperText && !error && (
                            <p id={helperId} className="text-sm text-subtle">
                                {helperText}
                            </p>
                        )}
                    </div>

                    {showCharCount && maxLength && (
                        <p
                            id={countId}
                            aria-live="polite"
                            className={`shrink-0 font-mono text-xs tabular ${nearLimit ? 'text-amber-500' : 'text-subtle'}`}
                        >
                            {charCount}/{maxLength}
                        </p>
                    )}
                </div>
            </div>
        );
    },
);

Textarea.displayName = 'Textarea';

export default Textarea;
