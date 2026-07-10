'use client';

import Image from 'next/image';
import { useEffect, useId, useState } from 'react';

import styles from './PremiumCatalogPage.module.css';

type CatalogProductImageProps = {
  src: string;
  alt: string;
};

export function CatalogProductImage({ src, alt }: CatalogProductImageProps) {
  const [isOpen, setIsOpen] = useState(false);
  const titleId = useId();

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        className={styles.productImageButton}
        onClick={() => setIsOpen(true)}
        aria-label={`Ampliar imagem: ${alt}`}
      >
        <Image
          src={src}
          alt={alt}
          width={520}
          height={520}
          sizes="(max-width: 768px) 100vw, (max-width: 1080px) 50vw, 33vw"
          className={styles.productImage}
        />
      </button>

      {isOpen ? (
        <div
          className={styles.imageLightbox}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setIsOpen(false);
            }
          }}
        >
          <div className={styles.imageLightboxPanel}>
            <button
              type="button"
              className={styles.imageLightboxClose}
              onClick={() => setIsOpen(false)}
              aria-label="Fechar imagem ampliada"
            >
              ×
            </button>

            <h2 id={titleId} className={styles.imageLightboxTitle}>
              {alt}
            </h2>

            <div className={styles.imageLightboxCanvas}>
              <Image
                src={src}
                alt={alt}
                fill
                sizes="(max-width: 768px) 92vw, 760px"
                className={styles.imageLightboxImage}
                priority
              />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
