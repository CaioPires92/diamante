import React from 'react';
import { cn } from '@/lib/utils/cn';
import { IconBadge } from './IconBadge';
import styles from './FeatureCard.module.css';

interface FeatureCardProps extends React.HTMLAttributes<HTMLElement> {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  variant?: 'default' | 'compact' | 'highlight';
  accent?: boolean;
}

export function FeatureCard({
  title,
  description,
  icon,
  variant = 'default',
  accent = false,
  className,
  ...props
}: FeatureCardProps) {
  return (
    <article className={cn(styles.card, styles[variant], accent && styles.accent, className)} {...props}>
      {icon ? (
        <IconBadge className={styles.iconBadge}>
          {icon}
        </IconBadge>
      ) : accent ? (
        <span className={styles.topLine} aria-hidden="true" />
      ) : null}

      <h3 className={styles.title}>{title}</h3>
      {description ? <p className={styles.description}>{description}</p> : null}
    </article>
  );
}
