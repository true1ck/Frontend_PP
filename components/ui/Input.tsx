'use client';

import { forwardRef, InputHTMLAttributes, useId } from 'react';
import { AlertCircle } from 'lucide-react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    helperText?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, helperText, className = '', id, ...props }, ref) => {
        // Generated id ties <label for> to the control. Previously the label
        // was a bare <label> with no association, so clicking it did nothing
        // and screen readers announced the field as unlabelled.
        const generatedId = useId();
        const inputId = id ?? `input-${generatedId}`;
        const errorId = `${inputId}-error`;
        const helperId = `${inputId}-helper`;

        return (
            <div className="w-full">
                {label && (
                    <label htmlFor={inputId} className="mb-2 block text-sm font-medium text-body">
                        {label}
                        {props.required && (
                            <span className="ml-1 text-red-400" aria-hidden="true">
                                *
                            </span>
                        )}
                        {props.required && <span className="sr-only"> (required)</span>}
                    </label>
                )}

                <input
                    ref={ref}
                    id={inputId}
                    aria-invalid={error ? true : undefined}
                    aria-describedby={error ? errorId : helperText ? helperId : undefined}
                    className={`w-full min-h-[48px] rounded-xl border bg-[rgb(var(--surface))] px-4 py-3 text-body placeholder:text-subtle transition-colors duration-200 focus:outline-none focus-visible:border-[var(--brand)] focus-visible:ring-2 focus-visible:ring-[var(--brand)]/35 ${
                        error
                            ? 'border-red-500/60 focus-visible:border-red-500 focus-visible:ring-red-500/30'
                            : 'border-[rgb(var(--border-strong))]'
                    } ${className}`}
                    {...props}
                />

                {error && (
                    <p id={errorId} role="alert" className="mt-2 flex items-start gap-1.5 text-sm text-red-400">
                        <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                        {error}
                    </p>
                )}
                {helperText && !error && (
                    <p id={helperId} className="mt-2 text-sm text-subtle">
                        {helperText}
                    </p>
                )}
            </div>
        );
    },
);

Input.displayName = 'Input';

export default Input;
