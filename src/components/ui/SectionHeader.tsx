import React from 'react';
import { cn } from '@/lib/utils/cn';
import styles from './SectionHeader.module.css';

interface SectionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  eyebrow?: string;
  title?: string;
  description?: string;
  align?: 'left' | 'center';
  theme?: 'default' | 'inverse';
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'center',
  theme = 'default',
  className,
  ...props
}: SectionHeaderProps) {
  return (
    <div className={cn(styles.root, styles[align], styles[theme], className)} {...props}>
      {eyebrow ? <span className={styles.eyebrow}>{eyebrow}</span> : null}
      {title ? <h2 className={styles.title}>{title}</h2> : null}
      {description ? <p className={styles.description}>{description}</p> : null}
    </div>
  );
}
