'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import styles from './ContactForm.module.css';

export function ContactForm() {
  const t = useTranslations('ContactPage.Form');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Mock submission delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  if (isSuccess) {
    return (
      <div className={`${styles.formContainer} ${styles.successContainer} contact-anim`}>
        <div className={styles.successIcon}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <h3 className={styles.successTitle}>{t('successTitle')}</h3>
        <p className={styles.successMessage}>{t('successMessage')}</p>
        <button 
          className={styles.resetButton}
          onClick={() => setIsSuccess(false)}
        >
          Enviar nova mensagem
        </button>
      </div>
    );
  }

  return (
    <div className={`${styles.formContainer} contact-anim`}>
      <h2 className={styles.title}>{t('title')}</h2>
      
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label htmlFor="name" className={styles.label}>{t('fields.name')}</label>
          <input type="text" id="name" className={styles.input} required />
        </div>

        <div className={styles.row}>
          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>{t('fields.email')}</label>
            <input type="email" id="email" className={styles.input} required />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="phone" className={styles.label}>{t('fields.phone')}</label>
            <input type="tel" id="phone" className={styles.input} />
          </div>
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="subject" className={styles.label}>{t('fields.subject')}</label>
          <select id="subject" className={styles.select} required defaultValue="">
            <option value="" disabled>Selecione um assunto</option>
            <option value="general">{t('subjects.general')}</option>
            <option value="distributor">{t('subjects.distributor')}</option>
            <option value="privateLabel">{t('subjects.privateLabel')}</option>
          </select>
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="message" className={styles.label}>{t('fields.message')}</label>
          <textarea id="message" rows={4} className={styles.textarea} required></textarea>
        </div>

        <button 
          type="submit" 
          className={styles.submitButton}
          disabled={isSubmitting}
        >
          {isSubmitting ? t('sending') : t('submit')}
        </button>
      </form>
    </div>
  );
}
