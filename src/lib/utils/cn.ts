import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility to merge class names and handle Tailwind conflicts.
 * Even though we use CSS Modules, this is useful for conditional classes
 * and global utility composition.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
