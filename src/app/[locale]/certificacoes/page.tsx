import type { Metadata } from 'next';
import Link from 'next/link';

import { Container } from '@/components/ui/Container';
import { CTAButton } from '@/components/ui/CTAButton';
import styles from './page.module.css';

const whatsappPhone = '551938176226';

const pillars = [
  {
    title: 'Conformidade com Anvisa',
    description:
      'Atuação orientada por requisitos regulatórios aplicáveis ao desenvolvimento, rotulagem, notificação e regularização dos produtos.',
  },
  {
    title: 'Controle de qualidade',
    description:
      'Acompanhamento técnico para manter padrão, consistência e segurança nos processos de fabricação e finalização.',
  },
  {
    title: 'Segurança nos processos',
    description:
      'Fluxo de trabalho organizado para reduzir riscos, dar previsibilidade ao projeto e proteger a qualidade da linha.',
  },
  {
    title: 'Suporte regulatório',
    description:
      'Apoio na leitura das necessidades técnicas do projeto, documentação, rótulos e direcionamentos para regularização quando aplicável.',
  },
];

const checks = [
  'Estrutura de produção própria',
  'Acompanhamento técnico do projeto',
  'Apoio em rótulos e embalagens',
  'Orientação para notificação e registro quando aplicável',
  'Processos voltados para qualidade e segurança',
  'Comunicação clara sobre limites e exigências regulatórias',
];

export const metadata: Metadata = {
  title: 'Certificações e Conformidade',
  description:
    'Conheça os pilares de qualidade, segurança, controle e conformidade regulatória da Diamante Profissional.',
};

function whatsappUrl(message: string) {
  return `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(message)}`;
}

export default async function CertificationsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <Container size="wide" className={styles.heroContainer}>
          <span className={styles.eyebrow}>Qualidade e conformidade</span>
          <h1 className={styles.title}>Produção com segurança, qualidade e responsabilidade técnica.</h1>
          <p className={styles.description}>
            A Diamante combina estrutura de fabricação, acompanhamento técnico e suporte regulatório para que projetos de marca própria avancem com mais clareza, previsibilidade e confiança.
          </p>

          <div className={styles.actions}>
            <CTAButton
              href={whatsappUrl('Olá! Quero entender a parte regulatória para fabricar minha linha com a Diamante Profissional.')}
              target="_blank"
              rel="noopener noreferrer"
            >
              Falar com um Especialista
            </CTAButton>

            <Link href={`/${locale}/servicos#processo`} className={styles.textLink}>
              Conhecer o processo
            </Link>
          </div>
        </Container>
      </section>

      <section className={styles.pillars}>
        <Container size="wide">
          <div className={styles.sectionHeader}>
            <span className={styles.eyebrow}>Pilares de confiança</span>
            <h2 className={styles.sectionTitle}>O que sustenta cada projeto desenvolvido.</h2>
          </div>

          <div className={styles.pillarGrid}>
            {pillars.map((pillar) => (
              <article key={pillar.title} className={styles.pillarCard}>
                <h3>{pillar.title}</h3>
                <p>{pillar.description}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className={styles.checksSection}>
        <Container size="wide" className={styles.checksContainer}>
          <div>
            <span className={styles.eyebrow}>Sem promessas artificiais</span>
            <h2 className={styles.sectionTitle}>Conformidade precisa ser tratada com critério.</h2>
            <p className={styles.checksDescription}>
              Por isso, a Diamante evita prometer selos ou registros sem análise do projeto. O caminho correto é entender a categoria, a fórmula, a embalagem e as exigências aplicáveis antes de avançar.
            </p>
          </div>

          <ul className={styles.checkList}>
            {checks.map((check) => (
              <li key={check}>{check}</li>
            ))}
          </ul>
        </Container>
      </section>
    </main>
  );
}
