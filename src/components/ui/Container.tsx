import React from 'react';
import { cn } from '@/lib/utils/cn';

interface ContainerProps extends React.HTMLAttributes<HTMLElement> {
  as?: keyof React.JSX.IntrinsicElements;
  size?: 'default' | 'wide' | 'narrow';
}

export const Container = ({
  as: Component = 'div',
  size = 'default',
  className,
  children,
  ...props
}: ContainerProps) => {
  return React.createElement(
    Component,
    {
      className: cn(
        'container', // Global class defined in globals.css
        size === 'wide' && 'max-w-[1440px]',
        size === 'narrow' && 'max-w-[960px]',
        className
      ),
      ...props,
    },
    children
  );
};
