import React from 'react';
import { ContactHero } from '@/components/ui/contact/ContactHero';
import { ContactLayout } from '@/components/ui/contact/ContactLayout';

export default function ContactPage() {
  return (
    <main style={{ backgroundColor: '#F8F4EF' }}>
      <ContactHero />
      <ContactLayout />
    </main>
  );
}

