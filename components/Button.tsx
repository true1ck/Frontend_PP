'use client';

import { motion } from 'framer-motion';
import { ReactNode, ButtonHTMLAttributes } from 'react';

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onAnimationStart' | 'onAnimationEnd' | 'onDrag' | 'onDragStart' | 'onDragEnd'> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
  onClick?: () => void;
  href?: string;
  loading?: boolean;
  disabled?: boolean;
  icon?: ReactNode;
}

const Button = ({
  children,
  variant = 'primary',
  className = '',
  onClick,
  href,
  loading = false,
  disabled = false,
  icon,
  type = 'button',
  ...props
}: ButtonProps) => {
  const baseStyles = 'px-4 sm:px-6 py-2.5 sm:py-3 rounded-full font-semibold transition-all duration-300 inline-flex items-center justify-center gap-2 min-h-[44px] touch-manipulation';

  const variants = {
    primary: 'bg-gradient-to-r from-blue-600 to-purple-600 text-white neon-glow hover:shadow-2xl',
    secondary: 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:shadow-xl',
    outline: 'border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white',
  };

  const isDisabled = disabled || loading;

  const buttonContent = (
    <motion.button
      whileHover={!isDisabled ? { scale: 1.05 } : {}}
      whileTap={!isDisabled ? { scale: 0.95 } : {}}
      className={`${baseStyles} ${variants[variant]} ${className} ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      onClick={onClick}
      disabled={isDisabled}
      type={type}
      {...props}
    >
      {loading && (
        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {!loading && icon}
      {children}
    </motion.button>
  );

  if (href && !isDisabled) {
    return (
      <a href={href}>
        {buttonContent}
      </a>
    );
  }

  return buttonContent;
};

export default Button;
