import React from 'react';
import { cn } from '@/lib/utils/cn';
import styles from './ProcessStep.module.css';

interface ProcessStepProps extends React.HTMLAttributes<HTMLDivElement> {
  number: string;
  title: string;
  description: string;
  withConnector?: boolean;
}

export function ProcessStep({
  number,
  title,
  description,
  withConnector = false,
  className,
  ...props
}: ProcessStepProps) {
  return (
    <div className={cn(styles.step, withConnector && styles.withConnector, className)} {...props}>
      <div className={styles.numberWrap}>
        <span className={styles.number}>{number}</span>
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
}
