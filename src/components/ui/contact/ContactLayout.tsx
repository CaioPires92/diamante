'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Container } from '../Container';
import { ContactInfo } from './ContactInfo';
import { ContactForm } from './ContactForm';
import styles from './ContactLayout.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function ContactLayout() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP((context) => {
    const elements = context.selector?.('.contact-anim');
    
    if (elements) {
      gsap.fromTo(elements, {
        y: 40,
        opacity: 0
      }, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out'
      });
    }
  }, { scope: sectionRef });

  return (
    <section className={styles.section} ref={sectionRef}>
      <Container>
        <div className={styles.grid}>
          <div className={styles.infoColumn}>
            <ContactInfo />
          </div>
          <div className={styles.formColumn}>
            <ContactForm />
          </div>
        </div>
      </Container>
    </section>
  );
}
