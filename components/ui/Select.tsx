'use client';

import { forwardRef, SelectHTMLAttributes } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';

interface SelectOption {
    value: string;
    label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    error?: string;
    helperText?: string;
    options: SelectOption[];
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
    ({ label, error, helperText, options, className = '', ...props }, ref) => {
        const { theme } = useTheme();

        return (
            <div className="w-full">
                {label && (
                    <label className={`block text-sm font-medium mb-2 ${theme === 'light' ? 'text-gray-900' : 'text-gray-300'}`}>
                        {label}
                        {props.required && <span className="text-red-400 ml-1">*</span>}
                    </label>
                )}
                <div className="relative">
                                        <motion.select
                                                ref={ref}
                                                whileFocus={{ scale: 1.01 }}
                                                className={`
                            w-full px-4 py-3 rounded-lg
                            glass border border-gray-700
                            bg-gray-900/50 ${theme === 'light' ? 'text-gray-900' : 'text-white'}
                            focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500
                            transition-all duration-200
                            appearance-none cursor-pointer
                            ${error ? 'border-red-500 focus:ring-red-500/50' : ''}
                            ${className}
                        `}
                                                {...(props as any)}
                                        >
                        <option value="" disabled className="bg-gray-900">
                            Select an option
                        </option>
                        {options.map((option) => (
                            <option
                                key={option.value}
                                value={option.value}
                                className="bg-gray-900 text-white"
                            >
                                {option.label}
                            </option>
                        ))}
                    </motion.select>
                    {/* Custom dropdown arrow */}
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                        <svg
                            className="w-5 h-5 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                            />
                        </svg>
                    </div>
                </div>
                {error && (
                    <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-2 text-sm text-red-400"
                    >
                        {error}
                    </motion.p>
                )}
                {helperText && !error && (
                    <p className="mt-2 text-sm text-gray-400">{helperText}</p>
                )}
            </div>
        );
    }
);

Select.displayName = 'Select';

export default Select;
