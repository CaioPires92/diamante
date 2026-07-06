import React from 'react';
import { cn } from '@/lib/utils/cn';
import styles from './IconBadge.module.css';

interface IconBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  shape?: 'circle' | 'rounded';
}

export function IconBadge({
  shape = 'rounded',
  className,
  children,
  ...props
}: IconBadgeProps) {
  return (
    <div className={cn(styles.badge, styles[shape], className)} {...props}>
      {children}
    </div>
  );
}
