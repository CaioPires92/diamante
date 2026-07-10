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
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);

    const payload = {
      name: String(formData.get('name') || ''),
      whatsapp: String(formData.get('whatsapp') || ''),
      email: String(formData.get('email') || ''),
      brand: String(formData.get('brand') || ''),
      productType: String(formData.get('productType') || ''),
      quantity: String(formData.get('quantity') || ''),
      hasFormula: String(formData.get('hasFormula') || ''),
      hasPackaging: String(formData.get('hasPackaging') || ''),
      message: String(formData.get('message') || ''),
    };

    const whatsappMessage = [
      'Ola! Quero criar minha marca de cosmeticos.',
      '',
      `Nome: ${payload.name}`,
      `WhatsApp: ${payload.whatsapp}`,
      `E-mail: ${payload.email}`,
      `Marca/Projeto: ${payload.brand || 'Nao informado'}`,
      `Tipo de produto: ${payload.productType || 'Nao informado'}`,
      `Quantidade estimada: ${payload.quantity || 'Nao informado'}`,
      `Ja possui formula?: ${payload.hasFormula || 'Nao informado'}`,
      `Ja possui embalagem?: ${payload.hasPackaging || 'Nao informado'}`,
      '',
      'Ideia:',
      payload.message,
    ].join('\n');

    const whatsappUrl = `https://wa.me/551938176156?text=${encodeURIComponent(whatsappMessage)}`;

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    event.currentTarget.reset();
    setIsSubmitting(false);
    onClose();
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
            <label htmlFor="lead-product-type" className={styles.label}>{t('fields.productType')}</label>
            <input id="lead-product-type" name="productType" className={styles.input} type="text" required />
          </div>

          <div className={styles.row}>
            <div className={styles.inputGroup}>
              <label htmlFor="lead-quantity" className={styles.label}>{t('fields.quantity')}</label>
              <input id="lead-quantity" name="quantity" className={styles.input} type="text" />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="lead-has-formula" className={styles.label}>{t('fields.hasFormula')}</label>
              <select id="lead-has-formula" name="hasFormula" className={styles.select} defaultValue="">
                <option value="" disabled>{t('options.select')}</option>
                <option value={t('options.yes')}>{t('options.yes')}</option>
                <option value={t('options.no')}>{t('options.no')}</option>
                <option value={t('options.notSure')}>{t('options.notSure')}</option>
              </select>
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="lead-has-packaging" className={styles.label}>{t('fields.hasPackaging')}</label>
            <select id="lead-has-packaging" name="hasPackaging" className={styles.select} defaultValue="">
              <option value="" disabled>{t('options.select')}</option>
              <option value={t('options.yes')}>{t('options.yes')}</option>
              <option value={t('options.no')}>{t('options.no')}</option>
              <option value={t('options.notSure')}>{t('options.notSure')}</option>
            </select>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="lead-message" className={styles.label}>{t('fields.message')}</label>
            <textarea id="lead-message" name="message" className={styles.textarea} rows={4} required />
          </div>

          <Button type="submit" variant="primary" fullWidth disabled={isSubmitting}>
            {isSubmitting ? t('sending') : t('submit')}
          </Button>
        </form>
      </div>
    </div>
  );
}
