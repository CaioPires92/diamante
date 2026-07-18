import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Trabalhe conosco | Diamante Profissional',
  description: 'Envie seu currículo e faça parte do banco de talentos da Diamante Profissional.',
};

const careersEmail = 'contato@diamanteprofissional.com.br';
const careersMailto = `mailto:${careersEmail}?subject=${encodeURIComponent('Currículo - Trabalhe conosco')}`;
const careersWhatsApp = `https://wa.me/551938176156?text=${encodeURIComponent(
  'Olá! Gostaria de enviar meu currículo e participar do banco de talentos da Diamante Profissional.',
)}`;

export default async function CareersPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <Image
          src="/imgs/about-hero-generated-v1.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className={styles.backgroundImage}
        />
        <div className={styles.overlay} aria-hidden="true" />
        <div className={styles.container}>
          <div className={styles.heroContent}>
            <span className={styles.eyebrow}>BANCO DE TALENTOS</span>
            <h1>Trabalhe conosco</h1>
            <p>
              Venha construir sua história com uma empresa que há mais de 15 anos transforma ideias
              em produtos e sonhos em novas possibilidades.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.content}>
        <div className={styles.container}>
          <div className={styles.card}>
            <div>
              <span className={styles.cardLabel}>FAÇA PARTE DO NOSSO TIME</span>
              <h2>Cresça junto com a Diamante Profissional</h2>
              <p>
                Com fábrica própria em Amparo, a Diamante Profissional atua no desenvolvimento e na
                produção de cosméticos, reunindo experiência, inovação e compromisso com a qualidade.
              </p>
              <p>
                Estamos sempre em busca de pessoas que valorizem o trabalho em equipe, tenham vontade
                de aprender e estejam preparadas para superar desafios e construir uma carreira conosco.
              </p>
              <p>
                Envie seu currículo por e-mail, informando sua área de interesse no assunto. Seu perfil
                fará parte do nosso banco de talentos e poderá ser considerado em futuras oportunidades.
              </p>
            </div>

            <div className={styles.actions}>
              <a className={styles.primaryAction} href={careersMailto}>
                Enviar currículo
              </a>
              <a
                className={styles.whatsAppAction}
                href={careersWhatsApp}
                target="_blank"
                rel="noopener noreferrer"
              >
                Falar pelo WhatsApp
              </a>
              <Link className={styles.secondaryAction} href={`/${locale}/about`}>
                Conheça a Diamante
              </Link>
            </div>

            <p className={styles.email}>Envie seu currículo para: <strong>{careersEmail}</strong></p>
          </div>
        </div>
      </section>
    </main>
  );
}
