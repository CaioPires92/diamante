import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils/cn';
import styles from './CTAButton.module.css';

interface CTAButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  variant?: 'primary' | 'secondary' | 'outline-light';
}

export function CTAButton({
  href,
  variant = 'primary',
  className,
  children,
  ...props
}: CTAButtonProps) {
  return (
    <Link href={href} className={cn(styles.button, styles[variant], className)} {...props}>
      {children}
    </Link>
  );
}
