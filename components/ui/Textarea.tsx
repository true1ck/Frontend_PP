'use client';

import { forwardRef, TextareaHTMLAttributes, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
    helperText?: string;
    autoResize?: boolean;
    showCharCount?: boolean;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({
        label,
        error,
        helperText,
        className = '',
        autoResize = false,
        showCharCount = false,
        maxLength,
        value,
        ...props
    }, ref) => {
        const internalRef = useRef<HTMLTextAreaElement | null>(null);

        useEffect(() => {
            if (autoResize && internalRef.current) {
                internalRef.current.style.height = 'auto';
                internalRef.current.style.height = `${internalRef.current.scrollHeight}px`;
            }
        }, [value, autoResize]);

        const charCount = typeof value === 'string' ? value.length : 0;
        const { theme } = useTheme();

        return (
            <div className="w-full">
                {label && (
                    <label className={`block text-sm font-medium mb-2 ${theme === 'light' ? 'text-gray-900' : 'text-gray-300'}`}>
                        {label}
                        {props.required && <span className="text-red-400 ml-1">*</span>}
                    </label>
                )}
                <motion.textarea
                    ref={(node) => {
                        internalRef.current = node;
                        if (typeof ref === 'function') {
                            ref(node);
                        } else if (ref) {
                            ref.current = node;
                        }
                    }}
                    whileFocus={{ scale: 1.01 }}
                    value={value}
                    maxLength={maxLength}
                    className={`
            w-full px-4 py-3 rounded-lg
            glass border border-gray-700
            bg-gray-900/50 ${theme === 'light' ? 'text-gray-900' : 'text-white'}
            placeholder:text-gray-500
            focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500
            transition-all duration-200
            resize-none
            ${error ? 'border-red-500 focus:ring-red-500/50' : ''}
            ${className}
          `}
                    {...(props as any)}
                />
                <div className="flex justify-between items-start mt-2">
                    <div className="flex-1">
                        {error && (
                            <motion.p
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-sm text-red-400"
                            >
                                {error}
                            </motion.p>
                        )}
                        {helperText && !error && (
                            <p className="text-sm text-gray-400">{helperText}</p>
                        )}
                    </div>
                    {showCharCount && maxLength && (
                        <p className="text-sm text-gray-400 ml-4">
                            {charCount}/{maxLength}
                        </p>
                    )}
                </div>
            </div>
        );
    }
);

Textarea.displayName = 'Textarea';

export default Textarea;
