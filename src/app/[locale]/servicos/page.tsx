import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';

import { Container } from '@/components/ui/Container';
import { CTAButton } from '@/components/ui/CTAButton';
import styles from './page.module.css';

const whatsappPhone = '551938176156';

const services = [
  {
    number: '01',
    title: 'Private Label',
    description:
      'Criação de produtos com identidade da sua marca, posicionamento visual e apresentação comercial pronta para vender.',
    image: '/imgs/private_label_mockup.png',
  },
  {
    number: '02',
    title: 'Terceirização Completa',
    description:
      'Condução do projeto da escolha da categoria até a entrega do produto final, com suporte técnico em cada etapa.',
    image: '/imgs/products_bg.png',
  },
  {
    number: '03',
    title: 'Desenvolvimento de Fórmulas',
    description:
      'Fórmula personalizada para o objetivo do produto, sensorial desejado, performance esperada e perfil da sua marca.',
    image: '/imgs/product3.png',
  },
  {
    number: '04',
    title: 'Registro e Regularização',
    description:
      'Apoio na organização técnica e regulatória para que o produto avance com mais clareza, segurança e previsibilidade.',
    image: '/images/differentials/anvisa.png',
    imageMode: 'icon',
  },
  {
    number: '05',
    title: 'Design de Embalagens',
    description:
      'Direção para rótulos, apresentação e acabamentos que valorizam o produto e deixam a linha mais profissional.',
    image: '/imgs/product2.png',
  },
  {
    number: '06',
    title: 'Envase e Rotulagem',
    description:
      'Estrutura para envasar, rotular e finalizar os produtos com padrão visual consistente e acabamento de mercado.',
    image: '/imgs/product1.png',
  },
];

const steps = [
  'Você envia seu projeto',
  'Recebe a análise da necessidade',
  'Desenvolvemos ou adaptamos a fórmula',
  'Apresentamos o orçamento',
  'Você aprova a amostra',
  'Iniciamos produção, envase e rotulagem',
  'Sua linha é entregue pronta para venda',
];

const differentials = [
  {
    icon: 'formula',
    title: 'Desenvolvimento de fórmulas exclusivas',
  },
  {
    icon: 'sparkles',
    title: 'Produtos de alta performance',
  },
  {
    icon: 'clock',
    title: 'Rapidez na entrega',
  },
  {
    icon: 'shield',
    title: 'Suporte regulatório',
  },
  {
    icon: 'layers',
    title: 'Flexibilidade de produção',
  },
];

export const metadata: Metadata = {
  title: 'Serviços de Terceirização',
  description:
    'Serviços de private label, terceirização completa, desenvolvimento de fórmulas, regularização, design de embalagens, envase e rotulagem.',
};

function whatsappUrl(message: string) {
  return `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(message)}`;
}

function WhatsAppIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.489-1.761-1.663-2.06-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

function DifferentialIcon({ name }: { name: string }) {
  const commonProps = {
    width: 34,
    height: 34,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.7,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
    focusable: false,
  };

  if (name === 'formula') {
    return (
      <svg {...commonProps}>
        <path d="M9 2h6" />
        <path d="M10 2v6.2L4.8 18.1A2.6 2.6 0 0 0 7.1 22h9.8a2.6 2.6 0 0 0 2.3-3.9L14 8.2V2" />
        <path d="M7.4 16h9.2" />
      </svg>
    );
  }

  if (name === 'sparkles') {
    return (
      <svg {...commonProps}>
        <path d="M12 2l1.55 4.45L18 8l-4.45 1.55L12 14l-1.55-4.45L6 8l4.45-1.55L12 2Z" />
        <path d="M19 14l.75 2.25L22 17l-2.25.75L19 20l-.75-2.25L16 17l2.25-.75L19 14Z" />
        <path d="M5 13l.55 1.45L7 15l-1.45.55L5 17l-.55-1.45L3 15l1.45-.55L5 13Z" />
      </svg>
    );
  }

  if (name === 'clock') {
    return (
      <svg {...commonProps}>
        <circle cx="12" cy="12" r="8.5" />
        <path d="M12 7.5V12l3 2" />
      </svg>
    );
  }

  if (name === 'shield') {
    return (
      <svg {...commonProps}>
        <path d="M12 3.2l7 2.6v5.3c0 4.2-2.8 7.8-7 9.7-4.2-1.9-7-5.5-7-9.7V5.8l7-2.6Z" />
        <path d="M9.3 12l1.7 1.7 3.8-4" />
      </svg>
    );
  }

  return (
    <svg {...commonProps}>
      <path d="M12 3l8 4-8 4-8-4 8-4Z" />
      <path d="M4 12l8 4 8-4" />
      <path d="M4 17l8 4 8-4" />
    </svg>
  );
}

export default function ServicesPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroBackground} aria-hidden="true">
          <Image
            src="/imgs/hero_final_v5.png"
            alt=""
            fill
            sizes="100vw"
            className={styles.heroBackgroundImage}
            priority
          />
        </div>

        <Container size="wide" className={styles.heroContainer}>
          <div className={styles.heroLayout}>
            <div className={styles.heroContent}>
              <span className={styles.eyebrow}>Terceirização de cosméticos</span>
              <h1 className={styles.heroTitle}>
                Serviços para
                <br />
                sua marca
              </h1>
              <p className={styles.heroDescription}>
                Da fórmula ao produto final, a Diamante estrutura o caminho para marcas que desejam fabricar cosméticos com padrão profissional, apresentação premium e suporte completo.
              </p>

              <div className={styles.heroActions}>
                <CTAButton
                  href={whatsappUrl('Olá! Quero solicitar um orçamento para terceirizar minha linha de cosméticos.')}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Solicitar Orçamento
                </CTAButton>

                <Link
                  href={whatsappUrl('Olá! Quero falar com um especialista sobre private label e terceirização de cosméticos.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.heroLink}
                >
                  Falar com um Especialista
                  <WhatsAppIcon />
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className={styles.services}>
        <Container size="wide" className={styles.servicesContainer}>
          <div className={styles.sectionHeader}>
            <span className={styles.eyebrow}>Briefing de serviços</span>
            <h2 className={styles.sectionTitle}>Tudo que sua marca precisa para terceirizar com clareza.</h2>
            <p className={styles.sectionDescription}>
              Os serviços abaixo organizam o projeto de marca própria: estratégia, desenvolvimento técnico, fabricação, regularização, embalagem e finalização.
            </p>
          </div>

          <div className={styles.servicesGrid}>
            {services.map((service) => (
              <article key={service.title} className={styles.serviceCard}>
                <div className={styles.serviceImage}>
                  <Image
                    src={service.image}
                    alt=""
                    fill
                    sizes="(max-width: 760px) 100vw, (max-width: 1180px) 50vw, 33vw"
                    className={`${styles.serviceImageAsset} ${service.imageMode === 'icon' ? styles.serviceImageIcon : styles.serviceImagePhoto}`}
                  />
                </div>
                <div className={styles.serviceBody}>
                  <span className={styles.serviceNumber}>{service.number}</span>
                  <h3 className={styles.serviceTitle}>{service.title}</h3>
                  <p className={styles.serviceDescription}>{service.description}</p>
                  <Link
                    href={whatsappUrl(`Olá! Quero saber mais sobre ${service.title} com a Diamante Profissional.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.serviceLink}
                  >
                    Solicitar Orçamento
                    <WhatsAppIcon />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className={styles.differentials}>
        <Container size="wide" className={styles.differentialsContainer}>
          {differentials.map((item) => (
            <div key={item.title} className={styles.differentialItem}>
              <span className={styles.differentialIcon}>
                <DifferentialIcon name={item.icon} />
              </span>
              <h3 className={styles.differentialTitle}>{item.title}</h3>
            </div>
          ))}
        </Container>
      </section>

      <section className={styles.process} id="processo">
        <Container size="wide" className={styles.processContainer}>
          <div className={styles.processIntro}>
            <span className={styles.eyebrow}>Como funciona</span>
            <h2 className={styles.processTitle}>Um processo direto para sair da ideia e chegar ao produto.</h2>
          </div>

          <ol className={styles.processList}>
            {steps.map((step, index) => (
              <li key={step} className={styles.processItem}>
                <span className={styles.processNumber}>{String(index + 1).padStart(2, '0')}</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className={styles.finalCta}>
        <div className={styles.finalCtaBackground} aria-hidden="true">
          <Image
            src="/imgs/final_cta_parallax_bg.png"
            alt=""
            fill
            sizes="100vw"
            className={styles.finalCtaImage}
          />
        </div>
        <Container size="wide" className={styles.finalCtaContainer}>
          <div className={styles.finalCtaContent}>
            <h2 className={styles.finalCtaTitle}>Pronto para fabricar sua linha?</h2>
            <p className={styles.finalCtaDescription}>
              Conte para a equipe qual categoria deseja desenvolver e receba orientação para escolher o melhor caminho de terceirização.
            </p>
            <CTAButton
              href={whatsappUrl('Olá! Quero fabricar minha linha de cosméticos com a Diamante Profissional.')}
              target="_blank"
              rel="noopener noreferrer"
            >
              Iniciar Projeto
            </CTAButton>
          </div>
        </Container>
      </section>
    </main>
  );
}
