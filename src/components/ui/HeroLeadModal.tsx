'use client';

import React, { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from './Button';
import styles from './HeroLeadModal.module.css';

interface HeroLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function HeroLeadModal({ isOpen, onClose }: HeroLeadModalProps) {
  const t = useTranslations('HomeLeadModal');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) {
      setIsSubmitting(false);
      setIsSuccess(false);
      setErrorMessage('');
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    const formData = new FormData(event.currentTarget);

    const payload = {
      name: String(formData.get('name') || ''),
      whatsapp: String(formData.get('whatsapp') || ''),
      email: String(formData.get('email') || ''),
      brand: String(formData.get('brand') || ''),
      message: String(formData.get('message') || ''),
    };

    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(result.error || t('genericError'));
      }

      setIsSuccess(true);
      event.currentTarget.reset();
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : t('genericError'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.overlay} onClick={onClose} role="presentation">
      <div
        className={styles.modal}
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="hero-lead-modal-title"
      >
        <button
          type="button"
          className={styles.closeButton}
          onClick={onClose}
          aria-label={t('close')}
        >
          ×
        </button>

        {isSuccess ? (
          <div className={styles.successState}>
            <div className={styles.successIcon}>
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h2 className={styles.title} id="hero-lead-modal-title">{t('successTitle')}</h2>
            <p className={styles.description}>{t('successDescription')}</p>
            <Button variant="primary" onClick={onClose}>
              {t('closeCta')}
            </Button>
          </div>
        ) : (
          <>
            <div className={styles.header}>
              <span className={styles.eyebrow}>{t('tagline')}</span>
              <h2 className={styles.title} id="hero-lead-modal-title">{t('title')}</h2>
              <p className={styles.description}>{t('description')}</p>
            </div>

            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.inputGroup}>
                <label htmlFor="lead-name" className={styles.label}>{t('fields.name')}</label>
                <input id="lead-name" name="name" className={styles.input} type="text" required />
              </div>

              <div className={styles.row}>
                <div className={styles.inputGroup}>
                  <label htmlFor="lead-whatsapp" className={styles.label}>{t('fields.whatsapp')}</label>
                  <input id="lead-whatsapp" name="whatsapp" className={styles.input} type="tel" required />
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="lead-email" className={styles.label}>{t('fields.email')}</label>
                  <input id="lead-email" name="email" className={styles.input} type="email" required />
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="lead-brand" className={styles.label}>{t('fields.brand')}</label>
                <input id="lead-brand" name="brand" className={styles.input} type="text" />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="lead-message" className={styles.label}>{t('fields.message')}</label>
                <textarea id="lead-message" name="message" className={styles.textarea} rows={4} required />
              </div>

              {errorMessage ? <p className={styles.errorMessage}>{errorMessage}</p> : null}

              <Button type="submit" variant="primary" fullWidth disabled={isSubmitting}>
                {isSubmitting ? t('sending') : t('submit')}
              </Button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
