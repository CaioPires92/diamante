import React from 'react';
import { cn } from '@/lib/utils/cn';
import { IconBadge } from './IconBadge';
import styles from './StatCard.module.css';

interface StatCardProps extends React.HTMLAttributes<HTMLElement> {
  icon: React.ReactNode;
  value: string;
  suffix?: string;
  label: string;
  description?: string;
  withDivider?: boolean;
  valueClassName?: string;
}

export function StatCard({
  icon,
  value,
  suffix,
  label,
  description,
  withDivider = false,
  valueClassName,
  className,
  ...props
}: StatCardProps) {
  return (
    <article className={cn(styles.card, withDivider && styles.withDivider, className)} {...props}>
      <IconBadge shape="circle" className={styles.iconWrap}>
        {icon}
      </IconBadge>

      <div className={styles.numberWrapper}>
        <span className={cn(styles.value, valueClassName)}>{value}</span>
        {suffix ? <span className={styles.suffix}>{suffix}</span> : null}
      </div>

      <span className={styles.line} aria-hidden="true" />
      <span className={styles.label}>{label}</span>
      {description ? <p className={styles.description}>{description}</p> : null}
    </article>
  );
}
