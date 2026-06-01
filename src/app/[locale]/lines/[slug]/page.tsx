import React from 'react';
import { Container } from '@/components/ui/Container';

import fs from 'fs';
import path from 'path';

import { client } from '@/sanity/lib/client';
import { groq } from 'next-sanity';
import styles from './page.module.css';

// Função para ler os produtos locais (Fallback)
function getLocalProducts(slug: string) {
  try {
    const filePath = path.join(process.cwd(), 'src', 'data', 'products.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileContents);
    return data[slug] || [];
  } catch (e) {
    return [];
  }
}

// Função para buscar produtos do Sanity
async function getSanityProducts(slug: string) {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    return null; // Retorna null para sinalizar que o Sanity não está configurado
  }
  
  try {
    const query = groq`*[_type == "product" && line->slug.current == $slug]{
      _id,
      title,
      price,
      description,
      "image": image.asset->url
    }`;
    const products = await client.fetch(query, { slug }, { cache: 'no-store' });
    return products.map((p: any) => ({
      id: p._id,
      title: p.title,
      price: p.price,
      description: p.description,
      image: p.image
    }));
  } catch (e) {
    console.error("Erro ao buscar no Sanity:", e);
    return null;
  }
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function LinePage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  // No Next.js 15+, os params são uma Promise e precisam de 'await'
  const resolvedParams = await params;
  const decodedSlug = decodeURIComponent(resolvedParams.slug);
  
  // Mapa para restaurar os nomes corretos com acentuação a partir do slug limpo da URL
  const lineNamesMap: Record<string, string> = {
    'lapidacao': 'Lapidação',
    'coloracao': 'Coloração Creme',
    'matizadores': 'Matizadores',
    'home-care': 'Home Care',
    'profissional': 'Linha Profissional',
    'cachos': 'Cachos & Afro',
    'liso': 'Liso Perfeito',
    'babosa': 'Babosa',
    'caviar': 'Caviar & Aminoácidos',
    'barber-for-men': 'Barber For Men',
    'sequestrante': 'Sequestrante'
  };

  const lineDescriptions: Record<string, string> = {
    'lapidacao': 'O tratamento capilar mais completo do mercado. Um sistema de cronograma capilar definitivo em 4 passos que limpa, sela, reconstrói e hidrata — devolvendo aos fios a saúde, o brilho e a resistência perdidos com tecnologia nanoprocessada.',
    'coloracao': 'Colorações creme permanentes de alta performance desenvolvidas com ativos de proteção à fibra capilar. Cobertura perfeita dos fios brancos, cores intensas e duradouras com brilho extraordinário.',
    'matizadores': 'Tons perfeitos e duradouros para cabelos loiros, descoloridos, brancos e grisalhos. Elimina completamente os tons amarelados indesejados, promovendo hidratação profunda e brilho platinado profissional.',
    'home-care': 'Cuidados diários de alto desempenho para manter os resultados do salão em casa. Fórmulas ricas em nutrientes nobres, óleos essenciais e queratina para reconstrução, hidratação e força contínua dos fios.',
    'profissional': 'Produtos de alta capacidade e máxima performance desenvolvidos especificamente para as bancadas e lavatórios dos melhores profissionais de beleza. Resultados imediatos com alto rendimento.',
    'cachos': 'Especialmente desenvolvida para cabelos cacheados, crespos e afro. Limpa delicadamente os fios do frizz, os protegendo e restaurando a fibra capilar, disciplinando o brilho e promovendo definição de longa duração.',
    'liso': 'Alinhamento impecável, disciplina e brilho espelhado absoluto para fios lisos naturais ou quimicamente tratados. Controle intensivo do frizz com hidratação selante e maciez incomparável.',
    'babosa': 'Tratamento fortificante e regenerador enriquecido com o puro extrato de babosa (aloe vera). Estimula o crescimento saudável, fortalece a fibra capilar e combate a quebra dos cabelos fragilizados.',
    'caviar': 'A linha CAVIAR da Diamante Profissional foi desenvolvida para promover máxima hidratação e regeneração capilar, deixando os cabelos mais sedosos e com brilho intenso. A sua composição conta com Óleo de Ojon e Pantenol que são ingredientes importantes na nutrição, hidratação e proteção dos fios. Preservando o cabelo dos danos causados no dia-a-dia.'
  };

  const cleanSlug = decodedSlug.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(' ', '-');
  const rawName = decodedSlug.replace('-', ' ');
  const lineName = lineNamesMap[cleanSlug] || rawName;
  
  // Carrega os dados locais (database Excel completa)
  const localProducts = getLocalProducts(cleanSlug);
  
  // Tenta buscar do Sanity primeiro. Se não configurado ou vazio, cai para o JSON local.
  let products = await getSanityProducts(cleanSlug);
  
  if (products && products.length > 0) {
    // Filtra produtos que não possuem imagem válida vinda do Sanity (evitando duplicados ou rascunhos sem foto)
    products = products.filter((p: any) => p.image && p.image.trim() !== '');

    // Enriquece os produtos carregados do Sanity com os campos descritivos e comerciais locais caso estejam ausentes
    products = products.map((sanityProduct: any) => {
      // 1. Tenta correspondência exata de título (ignorando caixa e espaços)
      let matchingLocal = localProducts.find((local: any) => 
        local.title.toLowerCase().replace(/\s+/g, '') === sanityProduct.title.toLowerCase().replace(/\s+/g, '')
      );
      
      // 2. Se falhar, tenta correspondência inteligente por preço + palavra-chave do título
      if (!matchingLocal && sanityProduct.price) {
        matchingLocal = localProducts.find((local: any) => {
          const samePrice = local.price && local.price.replace(/\s+/g, '') === sanityProduct.price.replace(/\s+/g, '');
          if (!samePrice) return false;
          
          const sTitle = sanityProduct.title.toLowerCase();
          const lTitle = local.title.toLowerCase();
          const keywords = ['shampoo', 'condicionador', 'mascara', 'máscara', 'leave', 'regulador', 'oleo', 'óleo', 'serum', 'sérum', 'po', 'pó', 'coloracao', 'coloração'];
          
          return keywords.some(kw => sTitle.includes(kw) && lTitle.includes(kw));
        });
        
        // 3. Como última alternativa, tenta correspondência apenas por preço na mesma linha
        if (!matchingLocal) {
          matchingLocal = localProducts.find((local: any) => 
            local.price && local.price.replace(/\s+/g, '') === sanityProduct.price.replace(/\s+/g, '')
          );
        }
      }
      
      if (matchingLocal) {
        return {
          ...sanityProduct,
          code: (sanityProduct.code && sanityProduct.code.trim()) ? sanityProduct.code : matchingLocal.code,
          size: (sanityProduct.size && sanityProduct.size.trim()) ? sanityProduct.size : matchingLocal.size,
          price: (sanityProduct.price && sanityProduct.price.trim()) ? sanityProduct.price : matchingLocal.price,
          description: (sanityProduct.description && sanityProduct.description.trim()) ? sanityProduct.description : matchingLocal.description,
          howToUse: (sanityProduct.howToUse && sanityProduct.howToUse.trim()) ? sanityProduct.howToUse : matchingLocal.howToUse,
          lineDescription: matchingLocal.lineDescription
        };
      }
      return sanityProduct;
    });
  } else {
    products = localProducts;
  }

  // Tenta extrair a descrição da linha a partir de algum produto enriquecido ou local
  const lineDescFromProduct = products.find((p: any) => p.lineDescription && p.lineDescription.trim() !== '')?.lineDescription;
  const lineDesc = lineDescFromProduct || lineDescriptions[cleanSlug] || `Descubra os produtos incríveis da nossa linha ${lineName}.`;

  return (
    <main style={{ paddingTop: '150px', paddingBottom: '100px', minHeight: '100vh', backgroundColor: 'transparent', position: 'relative' }}>
      {/* Background elegant gold details */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '400px', background: 'radial-gradient(circle at 50% 0%, rgba(201, 157, 74, 0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
      
      <Container>
        {/* Catalog Header style */}
        <div style={{ textAlign: 'center', marginBottom: '5rem', position: 'relative', zIndex: 1 }}>
          <span style={{ color: '#c99d4a', textTransform: 'uppercase', letterSpacing: '0.25em', fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: '0.75rem' }}>
            Diamante Professional
          </span>
          <h1 style={{ 
            fontFamily: 'var(--font-playfair)', 
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', 
            color: '#c99d4a', 
            margin: '0',
            fontWeight: 500,
            textTransform: 'uppercase',
            letterSpacing: '0.02em'
          }}>
            {lineName}
          </h1>
          
          {/* Glowing luxury gold divider line */}
          <div className={styles.glowDivider}>
            <div className={styles.dividerLineLeft} />
            <div className={styles.dividerStarWrapper}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="6" fill="#c99d4a" opacity="0.3" style={{ filter: 'blur(3px)' }} />
                <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="url(#goldGlow)" />
                <path d="M12 6L13.2 10.8L18 12L13.2 13.2L12 18L10.8 13.2L6 12L10.8 10.8L12 6Z" fill="#FFFFFF" />
                <defs>
                  <linearGradient id="goldGlow" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#FCF6BA" />
                    <stop offset="50%" stopColor="#BF953F" />
                    <stop offset="100%" stopColor="#B38728" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className={styles.dividerLineRight} />
            <div className={styles.dividerDot} />
          </div>

          <p style={{ 
            color: '#5A524A', 
            fontSize: '1.15rem', 
            lineHeight: '1.7', 
            maxWidth: '750px', 
            margin: '0 auto',
            fontFamily: 'var(--font-inter)'
          }}>
            {lineDesc}
          </p>
        </div>

        {/* Premium Catalog Products Grid */}
        {products.length > 0 ? (
          <div className={styles.productGrid}>
            {products.map((product: any) => (
              <div key={product.id} className={styles.productCard}>
                
                {/* Left Side: Product Image with Subtle Shadow */}
                <div className={styles.imageWrapper}>
                  <div style={{
                    width: '100%',
                    height: '260px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 2
                  }}>
                    <img 
                      src={product.image} 
                      alt={product.title} 
                      className={styles.productImage}
                    />
                  </div>
                </div>

                {/* Right Side: Product Details */}
                <div className={styles.detailsWrapper}>
                  <h3 style={{ 
                    fontFamily: 'var(--font-playfair)', 
                    fontSize: '1.45rem', 
                    color: '#2D2A26', 
                    margin: '0 0 0.25rem 0',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.01em',
                    lineHeight: '1.2'
                  }}>
                    {product.title}
                  </h3>
                  
                  {product.code && (
                    <span style={{ 
                      fontFamily: 'var(--font-inter)', 
                      fontSize: '0.75rem', 
                      color: '#8F857D', 
                      letterSpacing: '0.15em', 
                      fontWeight: 700,
                      display: 'block',
                      marginBottom: '0.75rem',
                      textTransform: 'uppercase'
                    }}>
                      CÓDIGO: {product.code}
                    </span>
                  )}
                  
                  {/* Glowing luxury gold divider line */}
                  <div className={styles.cardGlowDivider}>
                    <div className={styles.dividerLineLeft} />
                    <div className={styles.dividerStarWrapper} style={{ margin: '0 6px' }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="6" fill="#c99d4a" opacity="0.3" style={{ filter: 'blur(3px)' }} />
                        <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="url(#goldGlow)" />
                        <path d="M12 6L13.2 10.8L18 12L13.2 13.2L12 18L10.8 13.2L6 12L10.8 10.8L12 6Z" fill="#FFFFFF" />
                      </svg>
                    </div>
                    <div className={styles.dividerLineRight} />
                    <div className={styles.dividerDot} />
                  </div>

                  {product.description && (
                    <p style={{ 
                      color: '#5A524A', 
                      fontSize: '0.875rem', 
                      lineHeight: '1.5',
                      margin: '0 0 0.75rem 0',
                      fontFamily: 'var(--font-inter)'
                    }}>
                      {product.description}
                    </p>
                  )}

                  {product.howToUse && (
                    <p style={{ 
                      color: '#6B625A', 
                      fontSize: '0.8rem', 
                      lineHeight: '1.4', 
                      margin: '0 0 1.25rem 0',
                      fontFamily: 'var(--font-inter)',
                      background: 'rgba(201, 157, 74, 0.04)',
                      padding: '0.5rem 0.75rem',
                      borderRadius: '6px',
                      borderLeft: '2px solid #c99d4a'
                    }}>
                      <strong style={{ color: '#c99d4a', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.05em', display: 'block', marginBottom: '0.15rem' }}>Modo de usar</strong>
                      {product.howToUse}
                    </p>
                  )}

                  {/* Price & Size details in B2B catalog standard */}
                  <div className={styles.priceContainer}>
                    <span style={{ 
                      color: '#c99d4a', 
                      fontSize: '1.65rem', 
                      fontWeight: 700,
                      fontFamily: 'var(--font-inter)'
                    }}>
                      {product.price || 'Consultar'}
                    </span>
                    {product.size && (
                      <span style={{ 
                        color: '#8F857D', 
                        fontSize: '0.85rem',
                        fontWeight: 500,
                        fontFamily: 'var(--font-inter)'
                      }}>
                        {product.size}
                      </span>
                    )}
                  </div>
                </div>

              </div>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', marginTop: '4rem', padding: '4rem', background: '#fff', borderRadius: '16px', border: '1px dashed rgba(201, 157, 74, 0.3)', position: 'relative', zIndex: 1 }}>
            <h3 style={{ fontFamily: 'var(--font-playfair)', fontSize: '1.5rem', color: '#2D2A26', marginBottom: '1rem' }}>
              Novos produtos em breve!
            </h3>
            <p style={{ color: '#6B625A' }}>
              Esta categoria ainda não possui produtos cadastrados ou está passando por uma reformulação. Volte em breve.
            </p>
          </div>
        )}
      </Container>
    </main>
  );
}
