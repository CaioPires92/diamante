import React from 'react';
import { cn } from '@/lib/utils/cn';
import { Container } from './Container';
import styles from './Section.module.css';

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  variant?: 'light' | 'soft' | 'dark';
  containerSize?: 'default' | 'wide' | 'narrow';
  innerClassName?: string;
}

export const Section = React.forwardRef<HTMLElement, SectionProps>(function Section(
  {
    variant = 'light',
    containerSize = 'default',
    className,
    innerClassName,
    children,
    ...props
  },
  ref
) {
  return (
    <section ref={ref} className={cn(styles.section, styles[variant], className)} {...props}>
      <Container size={containerSize} className={cn(styles.inner, innerClassName)}>
        {children}
      </Container>
    </section>
  );
});
