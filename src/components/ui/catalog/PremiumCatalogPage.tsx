import Image from 'next/image';
import Link from 'next/link';

import { Container } from '../Container';
import { CTAButton } from '../CTAButton';
import { CatalogProductImage } from './CatalogProductImage';
import styles from './PremiumCatalogPage.module.css';

const whatsappPhone = '551938176156';

type CatalogProduct = {
  name: string;
  description: string;
  image: string;
};

type CatalogCategory = {
  id: string;
  number: string;
  title: string;
  description: string;
  products: CatalogProduct[];
};

const categories: CatalogCategory[] = [
  {
    id: 'category-01',
    number: '01',
    title: 'Shampoos e Condicionadores',
    description:
      'Categoria essencial para marcas que desejam lançar linhas capilares de uso recorrente, com apelo comercial e rotina completa de cuidado.',
    products: [
      {
        name: 'Shampoo Hidratante Daily Care',
        description: 'Limpeza suave com toque leve e rotina pensada para manutenção diária dos fios.',
        image: '/images/products/caviar/shampoo-caviar.png',
      },
      {
        name: 'Condicionador Nutri Repair',
        description: 'Condicionamento equilibrado com sensação de maciez, alinhamento e brilho.',
        image: '/images/products/caviar/condicionador-caviar.png',
      },
      {
        name: 'Shampoo Detox Purificante',
        description: 'Proposta de limpeza profunda para linhas com apelo profissional e sensação refrescante.',
        image: '/images/products/profissional/shampoo-anti-res-duo.png',
      },
    ],
  },
  {
    id: 'category-02',
    number: '02',
    title: 'Cremes e Máscaras',
    description:
      'Tratamentos com alto valor percebido para hidratação, nutrição, reconstrução e cronogramas capilares de marca própria.',
    products: [
      {
        name: 'Máscara Reconstrutora Intense',
        description: 'Textura encorpada para linhas focadas em reconstrução, disciplina e cuidado contínuo.',
        image: '/images/products/caviar/m-scara-caviar.png',
      },
      {
        name: 'Máscara Nutritiva Óleos Preciosos',
        description: 'Máscara com proposta nutritiva para rituais de tratamento mais sofisticados.',
        image: '/images/products/home-care/m-scara-reparo-absoluto.png',
      },
      {
        name: 'Leave-in Caviar Therapy',
        description: 'Leave-in com visual premium para proteção, alinhamento e acabamento refinado.',
        image: '/images/products/caviar/leave-in-caviar.png',
      },
    ],
  },
  {
    id: 'category-03',
    number: '03',
    title: 'Séruns e Finalizadores',
    description:
      'Produtos de acabamento e proteção que ampliam o mix da marca com itens de maior sofisticação e boa percepção de performance.',
    products: [
      {
        name: 'Sérum Anti Frizz Premium',
        description: 'Acabamento mais polido para linhas que valorizam brilho, toque sedoso e leveza.',
        image: '/images/products/home-care/s-rum-gloss-ojon.png',
      },
      {
        name: 'Liso Perfeito Spray',
        description: 'Spray finalizador com proposta de disciplina e rotina prática para uso diário.',
        image: '/images/products/liso/liso-perfeito-15-em-1.png',
      },
      {
        name: 'Óleo Finalizador Luminosity',
        description: 'Óleo com presença visual elegante para reforçar brilho e ritual de finalização.',
        image: '/images/products/home-care/leo-de-coco.png',
      },
    ],
  },
  {
    id: 'category-04',
    number: '04',
    title: 'Perfumes e Fragrâncias',
    description:
      'Possibilidades para criar produtos perfumados e extensões sensoriais de marca, com apresentação comercial alinhada ao posicionamento desejado.',
    products: [
      {
        name: 'Perfume Capilar',
        description: 'Categoria para reforçar assinatura olfativa, finalização e experiência sensorial da linha.',
        image: '/images/products/caviar/leave-in-spray-caviar.png',
      },
      {
        name: 'Body Splash',
        description: 'Produto de uso diário com potencial para kits, presentes e linhas de cuidado pessoal.',
        image: '/images/products/home-care/leo-de-coco.png',
      },
      {
        name: 'Fragrância Personalizada',
        description: 'Solução para desenvolver identidade olfativa própria em extensões de marca.',
        image: '/images/products/home-care/s-rum-gloss-ojon.png',
      },
    ],
  },
];

function whatsappUrl(message: string) {
  return `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(message)}`;
}

function categoryMessage(action: 'manufacture' | 'quote' | 'brand', category: string) {
  const messages = {
    manufacture: `Olá! Quero fabricar produtos da categoria ${category} com a Diamante Profissional.`,
    quote: `Olá! Quero solicitar um orçamento para fabricar produtos da categoria ${category}.`,
    brand: `Olá! Quero personalizar minha marca para produtos da categoria ${category}.`,
  };

  return messages[action];
}

function productMessage(product: string, category: string) {
  return `Olá! Tenho interesse em fabricar um produto como ${product}, na categoria ${category}.`;
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

export function PremiumCatalogPage() {
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
              <span className={styles.eyebrow}>Terceirização de Cosméticos</span>
              <h1 className={styles.heroTitle}>
                Categorias para
                <br />
                sua marca
              </h1>
              <p className={styles.heroDescription}>
                Explore possibilidades de fabricação para desenvolver produtos com a identidade da sua marca, da fórmula à apresentação final.
              </p>

              <div className={styles.heroActions}>
                <CTAButton
                  href={whatsappUrl('Olá! Quero criar minha marca de cosméticos com a Diamante Profissional.')}
                  variant="primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Quero Criar Minha Marca
                </CTAButton>

                <Link
                  href={whatsappUrl('Olá! Quero falar com um especialista sobre o catálogo de produtos da Diamante Profissional.')}
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

      <section className={styles.intro}>
        <Container size="wide" className={styles.introContainer}>
          <span className={styles.eyebrow}>Categorias Fabricadas</span>
          <h2 className={styles.introTitle}>Escolha a categoria que deseja fabricar.</h2>
          <p className={styles.introDescription}>
            Cada bloco mostra exemplos de produtos que podem orientar seu projeto de terceirização, orçamento ou personalização de marca.
          </p>
        </Container>
      </section>

      <section className={styles.categories}>
        <Container size="wide" className={styles.categoriesContainer}>
          <div className={styles.categoriesStack}>
            {categories.map((category) => (
              <section key={category.id} id={category.id} className={styles.categorySection}>
                <div className={styles.categoryMeta}>
                  <span className={styles.categoryNumber}>{category.number}</span>
                  <h3 className={styles.categoryTitle}>{category.title}</h3>
                  <p className={styles.categoryDescription}>{category.description}</p>

                  <div className={styles.categoryActions}>
                    <CTAButton
                      href={whatsappUrl(categoryMessage('manufacture', category.title))}
                      variant="primary"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Iniciar Projeto
                    </CTAButton>

                    <Link
                      href={whatsappUrl(categoryMessage('quote', category.title))}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.categoryLink}
                    >
                      Solicitar Orçamento
                      <WhatsAppIcon />
                    </Link>

                    <Link
                      href={whatsappUrl(categoryMessage('brand', category.title))}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.categoryLink}
                    >
                      Quero Criar Minha Marca
                      <WhatsAppIcon />
                    </Link>
                  </div>
                </div>

                <div className={styles.productGrid}>
                  {category.products.map((product) => (
                    <article key={product.name} className={styles.productCard}>
                      <div className={styles.productImageWrap}>
                        <CatalogProductImage
                          src={product.image}
                          alt={product.name}
                        />
                      </div>

                      <div className={styles.productBody}>
                        <h4 className={styles.productName}>{product.name}</h4>
                        <p className={styles.productDescription}>{product.description}</p>
                        <Link
                          href={whatsappUrl(productMessage(product.name, category.title))}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.productLink}
                        >
                          Solicitar Amostra
                          <WhatsAppIcon />
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </Container>
      </section>

      <section className={styles.finalCta}>
        <div className={styles.finalCtaBackground} aria-hidden="true">
          <Image
            src="/imgs/final_cta_parallax_bg.png"
            alt=""
            fill
            className={styles.finalCtaImage}
          />
        </div>

        <Container size="wide" className={styles.finalCtaContainer}>
          <div className={styles.finalCtaContent}>
            <h2 className={styles.finalCtaTitle}>Realize Seu Sonho de Ter Sua Própria Marca</h2>
            <p className={styles.finalCtaDescription}>
              Cuidamos da fórmula, da apresentação da embalagem e da produção para transformar sua ideia em uma linha pronta para venda com estrutura profissional.
            </p>
            <CTAButton
              href={whatsappUrl('Olá! Quero receber o catálogo de produtos fabricados pela Diamante Profissional.')}
              variant="primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Receber Catálogo
            </CTAButton>
          </div>
        </Container>
      </section>
    </main>
  );
}
