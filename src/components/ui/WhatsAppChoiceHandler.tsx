'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { WHATSAPP_CHOICE_EVENT } from '@/lib/whatsapp';
import styles from './WhatsAppChoiceHandler.module.css';

function isWhatsAppUrl(value: string) {
  return value.includes('wa.me/') || value.includes('api.whatsapp.com/send');
}

function shouldShowChoice() {
  if (typeof window === 'undefined') return false;

  return window.matchMedia('(max-width: 768px), (pointer: coarse)').matches;
}

function getUrlParts(value: string) {
  const url = new URL(value);
  const phone = url.hostname === 'wa.me'
    ? url.pathname.replace(/\D/g, '')
    : url.searchParams.get('phone')?.replace(/\D/g, '') || '';
  const text = url.searchParams.get('text') || '';

  return { phone, text };
}

function buildBusinessUrl(value: string) {
  const { phone, text } = getUrlParts(value);
  const params = new URLSearchParams();

  if (phone) params.set('phone', phone);
  if (text) params.set('text', text);

  const query = params.toString();

  if (typeof navigator !== 'undefined' && /android/i.test(navigator.userAgent)) {
    return `intent://send?${query}#Intent;scheme=whatsapp;package=com.whatsapp.w4b;end`;
  }

  return `whatsapp-business://send?${query}`;
}

export function WhatsAppChoiceHandler() {
  const [pendingUrl, setPendingUrl] = useState<string | null>(null);

  useEffect(() => {
    const handleLinkClick = (event: MouseEvent) => {
      if (!shouldShowChoice()) return;

      const target = event.target as HTMLElement | null;
      const link = target?.closest<HTMLAnchorElement>('a[href]');
      const href = link?.href;

      if (!href || link?.dataset.whatsappDirect === 'true' || !isWhatsAppUrl(href)) return;

      event.preventDefault();
      event.stopPropagation();
      setPendingUrl(href);
    };

    const handleChoiceEvent = (event: Event) => {
      const customEvent = event as CustomEvent<{ url?: string }>;
      const url = customEvent.detail?.url;

      if (!url || !isWhatsAppUrl(url) || !shouldShowChoice()) return;

      event.preventDefault();
      setPendingUrl(url);
    };

    document.addEventListener('click', handleLinkClick, true);
    window.addEventListener(WHATSAPP_CHOICE_EVENT, handleChoiceEvent);

    return () => {
      document.removeEventListener('click', handleLinkClick, true);
      window.removeEventListener(WHATSAPP_CHOICE_EVENT, handleChoiceEvent);
    };
  }, []);

  const businessUrl = useMemo(() => {
    if (!pendingUrl) return '';

    return buildBusinessUrl(pendingUrl);
  }, [pendingUrl]);

  if (!pendingUrl) return null;

  return (
    <div className={styles.overlay} onClick={() => setPendingUrl(null)} role="presentation">
      <div
        className={styles.sheet}
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="whatsapp-choice-title"
      >
        <button
          type="button"
          className={styles.closeButton}
          onClick={() => setPendingUrl(null)}
          aria-label="Fechar"
        >
          ×
        </button>

        <div className={styles.header}>
          <span className={styles.eyebrow}>Atendimento</span>
          <h2 className={styles.title} id="whatsapp-choice-title">Abrir conversa no WhatsApp</h2>
          <p className={styles.description}>Escolha qual aplicativo deseja usar para iniciar a conversa.</p>
        </div>

        <div className={styles.actions}>
          <a
            href={pendingUrl}
            data-whatsapp-direct="true"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.primaryAction}
            onClick={() => setPendingUrl(null)}
          >
            WhatsApp
          </a>
          <a
            href={businessUrl}
            className={styles.secondaryAction}
            onClick={() => setPendingUrl(null)}
          >
            WhatsApp Business
          </a>
        </div>
      </div>
    </div>
  );
}
