'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { buildWhatsAppUrl, requestWhatsAppChoice } from '@/lib/whatsapp';
import styles from './ContactForm.module.css';

export function ContactForm() {
  const t = useTranslations('ContactPage.Form');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const name = String(formData.get('name') || '');
    const email = String(formData.get('email') || '');
    const phone = String(formData.get('phone') || '');
    const subject = String(formData.get('subject') || '');
    const productType = String(formData.get('productType') || '');
    const quantity = String(formData.get('quantity') || '');
    const hasFormula = String(formData.get('hasFormula') || '');
    const hasPackaging = String(formData.get('hasPackaging') || '');
    const message = String(formData.get('message') || '');
    const whatsappMessage = [
      'Olá, Diamante Profissional! Quero falar com a equipe comercial.',
      '',
      `Nome: ${name}`,
      `E-mail: ${email}`,
      `Telefone/WhatsApp: ${phone || 'Não informado'}`,
      `Assunto: ${subject}`,
      `Tipo de produto: ${productType || 'Não informado'}`,
      `Quantidade estimada: ${quantity || 'Não informado'}`,
      `Já possui fórmula?: ${hasFormula || 'Não informado'}`,
      `Já possui embalagem?: ${hasPackaging || 'Não informado'}`,
      '',
      'Mensagem:',
      message,
    ].join('\n');
    const whatsappUrl = buildWhatsAppUrl(whatsappMessage);

    requestWhatsAppChoice(whatsappUrl);
    setIsSubmitting(false);
    setIsSuccess(true);
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
          <input type="text" id="name" name="name" className={styles.input} required />
        </div>

        <div className={styles.row}>
          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>{t('fields.email')}</label>
            <input type="email" id="email" name="email" className={styles.input} required />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="phone" className={styles.label}>{t('fields.phone')}</label>
            <input type="tel" id="phone" name="phone" className={styles.input} />
          </div>
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="subject" className={styles.label}>{t('fields.subject')}</label>
          <select id="subject" name="subject" className={styles.select} required defaultValue="">
            <option value="" disabled>Selecione um assunto</option>
            <option value="general">{t('subjects.general')}</option>
            <option value="distributor">{t('subjects.distributor')}</option>
            <option value="privateLabel">{t('subjects.privateLabel')}</option>
          </select>
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="productType" className={styles.label}>{t('fields.productType')}</label>
          <input type="text" id="productType" name="productType" className={styles.input} required />
        </div>

        <div className={styles.row}>
          <div className={styles.inputGroup}>
            <label htmlFor="quantity" className={styles.label}>{t('fields.quantity')}</label>
            <input type="text" id="quantity" name="quantity" className={styles.input} />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="hasFormula" className={styles.label}>{t('fields.hasFormula')}</label>
            <select id="hasFormula" name="hasFormula" className={styles.select} defaultValue="">
              <option value="" disabled>{t('options.select')}</option>
              <option value={t('options.yes')}>{t('options.yes')}</option>
              <option value={t('options.no')}>{t('options.no')}</option>
              <option value={t('options.notSure')}>{t('options.notSure')}</option>
            </select>
          </div>
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="hasPackaging" className={styles.label}>{t('fields.hasPackaging')}</label>
          <select id="hasPackaging" name="hasPackaging" className={styles.select} defaultValue="">
            <option value="" disabled>{t('options.select')}</option>
            <option value={t('options.yes')}>{t('options.yes')}</option>
            <option value={t('options.no')}>{t('options.no')}</option>
            <option value={t('options.notSure')}>{t('options.notSure')}</option>
          </select>
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="message" className={styles.label}>{t('fields.message')}</label>
          <textarea id="message" name="message" rows={4} className={styles.textarea} required></textarea>
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
