'use client';

import { forwardRef, SelectHTMLAttributes, useId } from 'react';
import { ChevronDown, AlertCircle } from 'lucide-react';

interface SelectOption {
    value: string;
    label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    error?: string;
    helperText?: string;
    options: SelectOption[];
    placeholder?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
    (
        { label, error, helperText, options, className = '', id, placeholder = 'Select an option', ...props },
        ref,
    ) => {
        const generatedId = useId();
        const selectId = id ?? `select-${generatedId}`;
        const errorId = `${selectId}-error`;
        const helperId = `${selectId}-helper`;

        return (
            <div className="w-full">
                {label && (
                    <label htmlFor={selectId} className="mb-2 block text-sm font-medium text-body">
                        {label}
                        {props.required && (
                            <span className="ml-1 text-red-400" aria-hidden="true">
                                *
                            </span>
                        )}
                        {props.required && <span className="sr-only"> (required)</span>}
                    </label>
                )}

                <div className="relative">
                    <select
                        ref={ref}
                        id={selectId}
                        aria-invalid={error ? true : undefined}
                        aria-describedby={error ? errorId : helperText ? helperId : undefined}
                        className={`w-full min-h-[48px] cursor-pointer appearance-none rounded-xl border bg-[rgb(var(--surface))] px-4 py-3 pr-11 text-body transition-colors duration-200 focus:outline-none focus-visible:border-[var(--brand)] focus-visible:ring-2 focus-visible:ring-[var(--brand)]/35 ${
                            error
                                ? 'border-red-500/60 focus-visible:border-red-500 focus-visible:ring-red-500/30'
                                : 'border-[rgb(var(--border-strong))]'
                        } ${className}`}
                        {...props}
                    >
                        {/* Native option lists are painted by the OS, so they
                            need a solid background — a translucent token would
                            render as unreadable text on some platforms. */}
                        <option value="" disabled className="bg-[var(--surface-solid)] text-body">
                            {placeholder}
                        </option>
                        {options.map((option) => (
                            <option
                                key={option.value}
                                value={option.value}
                                className="bg-[var(--surface-solid)] text-body"
                            >
                                {option.label}
                            </option>
                        ))}
                    </select>

                    <ChevronDown
                        className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-subtle"
                        aria-hidden="true"
                    />
                </div>

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

Select.displayName = 'Select';

export default Select;
