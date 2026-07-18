import type { Metadata } from 'next';
import Link from 'next/link';

import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Trabalhe conosco | Diamante Profissional',
  description: 'Envie seu currículo e faça parte do banco de talentos da Diamante Profissional.',
};

const careersEmail = 'contato@diamanteprofissional.com.br';
const careersMailto = `mailto:${careersEmail}?subject=${encodeURIComponent('Currículo - Trabalhe conosco')}`;

export default async function CareersPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroGlow} aria-hidden="true" />
        <div className={styles.container}>
          <span className={styles.eyebrow}>BANCO DE TALENTOS</span>
          <h1>Trabalhe conosco</h1>
          <p>
            Pessoas comprometidas fazem parte de cada etapa da nossa história. Envie seu currículo
            e apresente sua experiência para a equipe da Diamante Profissional.
          </p>
        </div>
      </section>

      <section className={styles.content}>
        <div className={styles.container}>
          <div className={styles.card}>
            <div>
              <span className={styles.cardLabel}>FAÇA PARTE DO NOSSO TIME</span>
              <h2>Cadastre-se em nosso banco de talentos</h2>
              <p>
                Envie seu currículo por e-mail com a área de interesse no assunto. Quando surgir uma
                oportunidade compatível com seu perfil, nossa equipe poderá entrar em contato.
              </p>
            </div>

            <div className={styles.actions}>
              <a className={styles.primaryAction} href={careersMailto}>
                Enviar currículo
              </a>
              <Link className={styles.secondaryAction} href={`/${locale}/about`}>
                Conheça a Diamante
              </Link>
            </div>

            <p className={styles.email}>E-mail: {careersEmail}</p>
          </div>
        </div>
      </section>
    </main>
  );
}
