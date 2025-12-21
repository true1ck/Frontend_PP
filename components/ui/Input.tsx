'use client';

import { forwardRef, InputHTMLAttributes } from 'react';
import { motion } from 'framer-motion';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    helperText?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, helperText, className = '', ...props }, ref) => {
        return (
            <div className="w-full">
                {label && (
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                        {label}
                        {props.required && <span className="text-red-400 ml-1">*</span>}
                    </label>
                )}
                <motion.input
                    ref={ref}
                    whileFocus={{ scale: 1.01 }}
                    className={`
            w-full px-4 py-3 rounded-lg
            glass border border-gray-700
            bg-gray-900/50 text-white
            placeholder:text-gray-500
            focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500
            transition-all duration-200
            ${error ? 'border-red-500 focus:ring-red-500/50' : ''}
            ${className}
          `}
                    {...props}
                />
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

Input.displayName = 'Input';

export default Input;
