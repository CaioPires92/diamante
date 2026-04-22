import React from 'react';
import { cn } from '@/lib/utils/cn';
import styles from './Button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'whatsapp';
  fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', fullWidth, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          styles.button,
          styles[variant],
          fullWidth && styles.fullWidth,
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';
