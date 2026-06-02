import React from 'react';
import { Container } from '@/components/ui/Container';

import fs from 'fs';
import path from 'path';

import { client } from '@/sanity/lib/client';
import { groq } from 'next-sanity';
import styles from './page.module.css';

type Product = {
  id: string;
  title: string;
  code?: string;
  size?: string;
  price?: string;
  image?: string;
  description?: string;
  howToUse?: string;
  lineDescription?: string;
};

const sublineProductFilters: Record<string, { source: string; include: string[]; exclude?: string[] }> = {
  'acai': { source: 'matizadores', include: ['acai'] },
  'anti-residuo': { source: 'profissional', include: ['anti residuo'] },
  'black': { source: 'matizadores', include: ['black'] },
  'bomba': { source: 'home-care', include: ['bomba'] },
  'champagne': { source: 'matizadores', include: ['champagne'] },
  'desmaia-cabelo': { source: 'liso', include: ['desmaia'] },
  'jaborandi-alecrim': { source: 'home-care', include: ['jaborandi'] },
  'linha-n': { source: 'home-care', include: ['shampoo n', 'condicionador n'] },
  'linha-p': { source: 'home-care', include: ['shampoo p', 'condicionador p'] },
  'liso-perfeito': { source: 'liso', include: ['liso perfeito'] },
  'mega-carga-de-keratina': { source: 'home-care', include: ['recarga keratina', 'keratina hidrolisada'] },
  'mega-carga-keratina': { source: 'home-care', include: ['recarga keratina', 'keratina hidrolisada'] },
  'perola': { source: 'matizadores', include: ['perola'] },
  'po-descolorante': { source: 'coloracao', include: ['po descolorante'] },
  'regulador-de-ph': { source: 'profissional', include: ['regulador de ph'] },
  'reparo-absoluto': { source: 'home-care', include: ['reparo absoluto'] },
  'serum-gloss': { source: 'home-care', include: ['serum gloss', 'iluminador argan', 'lilly iluminador'] },
  'super-efeito-cinza': { source: 'matizadores', include: ['super'], exclude: ['prata'] },
  'super-prata': { source: 'matizadores', include: ['prata'] },
  'ultra-violeta-ice': { source: 'matizadores', include: ['violeta ice'] },
};

function normalizeText(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

// Função para ler os produtos locais (Fallback)
function getLocalProducts(slug: string) {
  try {
    const filePath = path.join(process.cwd(), 'src', 'data', 'products.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileContents);
    if (data[slug]) {
      return data[slug];
    }

    const sublineFilter = sublineProductFilters[slug];
    if (!sublineFilter || !data[sublineFilter.source]) {
      return [];
    }

    return data[sublineFilter.source].filter((product: Product) => {
      const normalizedTitle = normalizeText(product.title);
      const hasIncludedTerm = sublineFilter.include.some((term) => normalizedTitle.includes(normalizeText(term)));
      const hasExcludedTerm = sublineFilter.exclude?.some((term) => normalizedTitle.includes(normalizeText(term))) || false;

      return hasIncludedTerm && !hasExcludedTerm;
    });
  } catch (e) {
    return [];
  }
}

function getAlternativeSlugs(slug: string): string[] {
  const aliases: Record<string, string[]> = {
    'cachos': ['cachos-and-afro', 'cachos-afro', 'cachos'],
    'caviar': ['caviar-aminoacidos', 'caviar'],
    'coloracao': ['coloracao-creme', 'coloracao'],
    'jaborandi-alecrim': ['jaborandi-and-alecrim', 'jaborandi-alecrim'],
    'profissional': ['linha-profissional', 'profissional'],
    'barber-for-men': ['masculina', 'barber', 'barber-for-men'],
    'babosa': ['barbosa', 'babosa']
  };
  return aliases[slug] || [slug];
}

// Função para buscar produtos do Sanity
async function getSanityProducts(slug: string) {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    return null; // Retorna null para sinalizar que o Sanity não está configurado
  }
  
  const slugs = getAlternativeSlugs(slug);
  
  try {
    const query = groq`*[
      _type == "product" &&
      !(_id in path('drafts.**')) &&
      (line->slug.current in $slugs || catalogSlug in $slugs)
    ] | order(sortOrder asc) {
      _id,
      title,
      code,
      size,
      price,
      description,
      howToUse,
      lineDescription,
      "image": image.asset->url
    }`;

    const products = await client.fetch(query, { slugs }, { cache: 'no-store' });

    return products.map((p: any) => ({
      id: p._id,
      title: p.title,
      code: p.code,
      size: p.size,
      price: p.price,
      description: p.description,
      howToUse: p.howToUse,
      lineDescription: p.lineDescription,
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
  const cleanSlugFromUrl = decodedSlug.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/\s+/g, '-');
  const lineSlugAliases: Record<string, string> = {
    'cachos-and-afro': 'cachos',
    'cachos-afro': 'cachos',
    'caviar-aminoacidos': 'caviar',
    'coloracao-creme': 'coloracao',
    'jaborandi-and-alecrim': 'jaborandi-alecrim',
    'linha-profissional': 'profissional',
    'masculina': 'barber-for-men',
    'barber': 'barber-for-men',
    'barber-for-men': 'barber-for-men',
    'barbosa': 'babosa',
  };
  const cleanSlug = lineSlugAliases[cleanSlugFromUrl] || cleanSlugFromUrl;
  
  // Mapa para restaurar os nomes corretos com acentuação a partir do slug limpo da URL
  const lineNamesMap: Record<string, string> = {
    'lapidacao': 'Lapidação',
    'coloracao': 'Coloração Creme',
    'matizadores': 'Matizadores',
    'home-care': 'Home Care',
    'profissional': 'Linha Profissional',
    'cachos': 'Cachos & Afro',
    'liso': 'Liso Perfeito',
    'desmaia-cabelo': 'Desmaia Cabelo',
    'liso-perfeito': 'Liso Perfeito',
    'babosa': 'Babosa',
    'caviar': 'Caviar',
    'barber-for-men': 'Barber For Men',
    'masculina': 'Barber For Men',
    'sequestrante': 'Sequestrante',
    'anti-residuo': 'Anti Resíduo',
    'black': 'Black',
    'bomba': 'Bomba',
    'champagne': 'Champagne',
    'jaborandi-alecrim': 'Jaborandi & Alecrim',
    'linha-n': 'Linha N',
    'linha-p': 'Linha P',
    'mega-carga-de-keratina': 'Mega Carga de Keratina',
    'perola': 'Pérola',
    'po-descolorante': 'Pó Descolorante',
    'regulador-de-ph': 'Regulador de pH',
    'reparo-absoluto': 'Reparo Absoluto',
    'serum-gloss': 'Sérum Gloss',
    'super-efeito-cinza': 'Super Efeito Cinza',
    'super-prata': 'Super Prata',
    'ultra-violeta-ice': 'Ultra Violeta Ice',
    'acai': 'Açaí'
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
    'caviar': 'A linha CAVIAR da Diamante Profissional foi desenvolvida para promover máxima hidratação e regeneração capilar, deixando os cabelos mais sedosos e com brilho intenso. A sua composição conta com Óleo de Ojon e Pantenol que são ingredientes importantes na nutrição, hidratação e proteção dos fios. Preservando o cabelo dos danos causados no dia-a-dia.',
    'barber-for-men': 'Cuidado completo para o homem moderno: limpeza, hidratação, barba, finalização e estilo com acabamento profissional.',
    'sequestrante': 'Quelação capilar para remover impurezas, neutralizar metais pesados e recuperar o tom natural dos fios sensibilizados.',
    'champagne': 'Linha matizadora para cabelos loiros ou grisalhos; neutraliza tons amarelados e promove efeito tonalizante.'
  };

  const rawName = decodedSlug.replace(/-/g, ' ');
  const lineName = lineNamesMap[cleanSlug] || rawName;
  
  // Carrega os dados locais (database Excel completa), para fallback e enriquecimento.
  const localProducts = getLocalProducts(cleanSlug);
  
  // Usa Sanity como fonte principal após a migração. O JSON local fica como fallback.
  let products = await getSanityProducts(cleanSlug);
  
  if (products && products.length > 0) {
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

  // Deduplicar produtos com base no código/título e tamanho, priorizando o que possui imagem
  if (products && products.length > 0) {
    const seen = new Map<string, any>();
    for (const p of products) {
      const baseKey = p.code && p.code.trim() ? p.code.trim() : normalizeText(p.title);
      const key = `${baseKey}-${p.size || ''}`;
      const existing = seen.get(key);
      if (!existing) {
        seen.set(key, p);
      } else {
        if (p.image && !existing.image) {
          seen.set(key, p);
        }
      }
    }
    products = Array.from(seen.values());
  }

  // Limpa as descrições gigantescas das tonalidades na página de coloração para manter o layout limpo e uniforme
  if (cleanSlug === 'coloracao') {
    products = products.map((p: any) => {
      if (p.description && (p.description.includes('TRATAMENTO COMPLETO') || p.description.includes('Modo de Preparo') || p.description.includes('Modo de Aplicação') || p.description.includes('Composição'))) {
        return {
          ...p,
          description: "Tonalidade profissional de alta performance. Cores intensas, brilho radiante e cobertura completa dos fios brancos com proteção e tratamento para a fibra capilar.",
          howToUse: "Preparação: Proporção 1 + 1,5. Usar com a OX Cremosa Diamante Profissional na volumagem adequada."
        };
      }
      return p;
    });
  }

  // Tenta extrair a descrição da linha a partir de algum produto enriquecido ou local
  const lineDescFromProduct = products.find((p: any) => p.lineDescription && p.lineDescription.trim() !== '')?.lineDescription;
  const lineDesc = lineDescFromProduct || lineDescriptions[cleanSlug] || `Descubra os produtos incríveis da nossa linha ${lineName}.`;

  // Get products with valid images for the hero visual showcase
  const imagedProducts = products.filter((p: any) => p.image);

  return (
    <main style={{ minHeight: '100vh', backgroundColor: 'transparent', position: 'relative' }}>
      
      {/* Dynamic Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroBackgroundGlow} />
        <div className={styles.heroTexture} />
        <Container size="wide">
          <div className={styles.heroLayout}>
            <div className={styles.heroContent}>
              <span className={styles.heroTagline}>Diamante Profissional</span>
              <h1 className={styles.heroTitle}>{lineName}</h1>
              <p className={styles.heroSubtitle}>{lineDesc}</p>
            </div>
            
            <div className={styles.heroVisual} aria-hidden="true">
              <div className={styles.heroVisualGlow} />
              {imagedProducts.length === 1 && (
                <img 
                  src={imagedProducts[0].image} 
                  alt={imagedProducts[0].title}
                  className={`${styles.heroProductImage} ${styles.heroProductOneOf1}`}
                />
              )}
              {imagedProducts.length === 2 && (
                <>
                  <img 
                    src={imagedProducts[0].image} 
                    alt={imagedProducts[0].title}
                    className={`${styles.heroProductImage} ${styles.heroProductOneOf2}`}
                  />
                  <img 
                    src={imagedProducts[1].image} 
                    alt={imagedProducts[1].title}
                    className={`${styles.heroProductImage} ${styles.heroProductTwoOf2}`}
                  />
                </>
              )}
              {imagedProducts.length >= 3 && (
                <>
                  <img 
                    src={imagedProducts[0].image} 
                    alt={imagedProducts[0].title}
                    className={`${styles.heroProductImage} ${styles.heroProductOneOf3}`}
                  />
                  <img 
                    src={imagedProducts[1].image} 
                    alt={imagedProducts[1].title}
                    className={`${styles.heroProductImage} ${styles.heroProductTwoOf3}`}
                  />
                  <img 
                    src={imagedProducts[2].image} 
                    alt={imagedProducts[2].title}
                    className={`${styles.heroProductImage} ${styles.heroProductThreeOf3}`}
                  />
                </>
              )}
              {imagedProducts.length === 0 && (
                <svg className={styles.heroLuxuryIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 3h12l4 6-10 13L2 9Z"/>
                  <path d="M11 3 8 9l4 13"/>
                  <path d="M13 3l3 6-4 13"/>
                  <path d="M2 9h20"/>
                </svg>
              )}
            </div>
          </div>
        </Container>
      </section>

      <Container>

        {/* Manual Técnico e Instruções da Coloração Creme (Premium Collapsible Accordion) */}
        {cleanSlug === 'coloracao' && (
          <div style={{
            maxWidth: '1000px',
            margin: '-2.5rem auto 4.5rem auto',
            background: '#FFFFFF',
            borderRadius: '16px',
            border: '1px solid rgba(201, 157, 74, 0.25)',
            boxShadow: '0 12px 40px rgba(45, 42, 38, 0.04)',
            padding: '2rem',
            fontFamily: 'var(--font-inter)',
            position: 'relative',
            zIndex: 5
          }}>
            <h2 style={{
              fontFamily: 'var(--font-playfair)',
              color: '#c99d4a',
              fontSize: '1.65rem',
              marginTop: 0,
              marginBottom: '1.5rem',
              textAlign: 'center',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              fontWeight: 600
            }}>
              Manual Técnico & Guia de Aplicação da Coloração
            </h2>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.5rem'
            }}>
              {/* Formulação & Ativos */}
              <div style={{ background: 'rgba(201, 157, 74, 0.02)', padding: '1.25rem', borderRadius: '8px', borderLeft: '3px solid #c99d4a' }}>
                <h4 style={{ color: '#2D2A26', margin: '0 0 0.75rem 0', fontWeight: 700, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Formulação & Ativos de Tratamento
                </h4>
                <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.85rem', color: '#5A524A', lineHeight: '1.6' }}>
                  <li><strong>Proteína do Trigo:</strong> Promove condicionamento, proteção e reparação profunda dos fios.</li>
                  <li><strong>Manteiga de Cupuaçu:</strong> Garante maciez imediata, leveza e sedosidade extrema.</li>
                  <li><strong>Óleo de Coco:</strong> Proporciona brilho extraordinário, maciez, balanço e nutrição.</li>
                </ul>
              </div>

              {/* Modo de Preparo */}
              <div style={{ background: 'rgba(201, 157, 74, 0.02)', padding: '1.25rem', borderRadius: '8px', borderLeft: '3px solid #c99d4a' }}>
                <h4 style={{ color: '#2D2A26', margin: '0 0 0.75rem 0', fontWeight: 700, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Modo de Preparo & Dosagem
                </h4>
                <p style={{ margin: 0, fontSize: '0.85rem', color: '#5A524A', lineHeight: '1.6' }}>
                  A Coloração Creme Diamante Profissional deve ser preparada na seguinte proporção:
                  <br />
                  <strong>1 parte de coloração (60g) para 1,5 parte de OX Cremosa</strong> na volumagem adequada.
                  <br />
                  <span style={{ display: 'block', marginTop: '0.75rem', fontSize: '0.8rem', color: '#c99d4a', fontWeight: 700 }}>
                    * BRINDE: Na compra da Coloração, enviamos uma OX de 90ml de cortesia para a preparação!
                  </span>
                </p>
              </div>
            </div>

            {/* Aplicação & Pausa */}
            <div style={{ marginTop: '1.5rem', borderTop: '1px solid rgba(201, 157, 74, 0.15)', paddingTop: '1.5rem' }}>
              <h4 style={{ color: '#2D2A26', margin: '0 0 1rem 0', fontWeight: 700, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Modo de Aplicação & Tempo de Pausa
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                <div style={{ background: 'rgba(0,0,0,0.01)', padding: '1rem', borderRadius: '8px' }}>
                  <h5 style={{ color: '#c99d4a', margin: '0 0 0.5rem 0', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase' }}>CORES ESCURAS</h5>
                  <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.8rem', color: '#5A524A', lineHeight: '1.6' }}>
                    <li><strong>Proporção:</strong> Tubo de Coloração (60g) + 90ml de OX Cremosa.</li>
                    <li><strong>Recomendação:</strong> OX Cremosa de <strong>20 Volumes</strong>.</li>
                    <li>Aplicar com pincel sobre cabelos secos e não lavados.</li>
                    <li><strong>Tempo de Pausa:</strong> Deixar agir por <strong>30 a 35 minutos</strong>.</li>
                  </ul>
                </div>
                <div style={{ background: 'rgba(0,0,0,0.01)', padding: '1rem', borderRadius: '8px' }}>
                  <h5 style={{ color: '#c99d4a', margin: '0 0 0.5rem 0', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase' }}>CORES CLAREADORAS</h5>
                  <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.8rem', color: '#5A524A', lineHeight: '1.6' }}>
                    <li><strong>Proporção:</strong> Tubo de Coloração (60g) + 90ml de OX Cremosa.</li>
                    <li><strong>Recomendação:</strong> OX Cremosa de <strong>40 Volumes</strong>.</li>
                    <li>Aplicar com pincel sobre cabelos secos e não lavados.</li>
                    <li><strong>Tempo de Pausa:</strong> Deixar agir por <strong>40 a 50 minutos</strong>.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Enxágue, Precauções & Composição Accordions */}
            <div style={{ marginTop: '1.5rem', borderTop: '1px solid rgba(201, 157, 74, 0.15)', paddingTop: '1rem' }}>
              <details style={{ margin: '0.5rem 0', padding: '0.5rem 0', cursor: 'pointer' }}>
                <summary style={{ fontWeight: 600, color: '#2D2A26', fontSize: '0.9rem', outline: 'none', userSelect: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span>🚿 RITUAL DE ENXÁGUE E LIMPEZA</span>
                  <span style={{ color: '#c99d4a', fontSize: '0.8rem' }}>▶ Clique para ler</span>
                </summary>
                <div style={{ padding: '0.75rem 0 0.25rem 0', fontSize: '0.825rem', color: '#5A524A', lineHeight: '1.6', borderTop: '1px dashed rgba(201, 157, 74, 0.15)', marginTop: '0.5rem' }}>
                  Após a pausa, emulsione adicionando <strong>água morna</strong> em pequenas quantidades, massageando da raiz às pontas. Enxágue abundantemente para retirar todo o excesso, aplique shampoo, enxágue e finalize com condicionador enluvando os fios, deixando agir por <strong>5 minutos</strong> antes do enxágue final.
                </div>
              </details>

              <details style={{ margin: '0.5rem 0', padding: '0.5rem 0', cursor: 'pointer' }}>
                <summary style={{ fontWeight: 600, color: '#2D2A26', fontSize: '0.9rem', outline: 'none', userSelect: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span>🔒 PRECAUÇÕES E TESTE DE MECHAS</span>
                  <span style={{ color: '#c99d4a', fontSize: '0.8rem' }}>▶ Clique para ler</span>
                </summary>
                <div style={{ padding: '0.75rem 0 0.25rem 0', fontSize: '0.825rem', color: '#5A524A', lineHeight: '1.6', borderTop: '1px dashed rgba(201, 157, 74, 0.15)', marginTop: '0.5rem' }}>
                  <p style={{ margin: '0 0 0.75rem 0' }}><strong>Teste de Mecha:</strong> Misture algumas gotas da OX com a coloração. Aplique na dobra do antebraço e deixe por 40 minutos. Enxágue. Observe se ocorre irritação, inchaço ou vermelhidão durante 48h antes da aplicação completa.</p>
                  <p style={{ margin: 0 }}><strong>Dica Diamante (Colorir e Alisar):</strong> Não recomendado o uso em fios com Henê ou tinturas progressivas. Para colorir e alisar, faça primeiro a coloração, trate os fios por 10 a 15 dias com a linha <strong>Vitamina da Cor</strong>, e somente após esse período aplique o alisamento.</p>
                </div>
              </details>

              <details style={{ margin: '0.5rem 0', padding: '0.5rem 0', cursor: 'pointer' }}>
                <summary style={{ fontWeight: 600, color: '#2D2A26', fontSize: '0.9rem', outline: 'none', userSelect: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span>🧪 COMPOSIÇÃO QUÍMICA COMPLETA</span>
                  <span style={{ color: '#c99d4a', fontSize: '0.8rem' }}>▶ Clique para ler</span>
                </summary>
                <div style={{ padding: '0.75rem 0 0.25rem 0', fontSize: '0.775rem', color: '#6B625A', lineHeight: '1.6', fontFamily: 'monospace', borderTop: '1px dashed rgba(201, 157, 74, 0.15)', marginTop: '0.5rem', background: '#FDFBF7', paddingLeft: '0.75rem', borderLeft: '2px solid #c99d4a' }}>
                  Aqua, Ceteareth-20, Polysorbate 80, Ammonium Hydroxide, Cetearyl Alcohol, Butylene Glycol, Cetrimonium Chloride, Tetrasodium EDTA, Amodimethicone, Parfum, HydroxyMethyl Pentyl CycloHexene Carboxaldehyde, Hexyl Cinnamaldehyde, Coconut Oil, D-Limonene, Alphaisomethyl Ionone, Oleic Acid, Oleyl Alcohol, Glyceril Stearate Se, Behentrimonium Chloride, Sodium Erythorbate, Ethanolamine, Sodium Sulfite, Algae Extract, Panthenol, Theobroma Grandiflorum Sed Butter, Hydrogenated Olive Oil, Hydrolized Wheat Protein. Pode conter traços de Resorcinol, 2-Methylresorcionol, 5-Amino-6-Chloro-o-Cresol, P-Methylaminophenol Sulfate, P-Phenylenediamine, n,n-BIS, p-Phenylenediamine Sulfate, 2-Methyl-5-Hydroximethylaminophenol, 4-Amino-2Hydroxitoluen, 2,4-Diaminophenoxyethanol HCL, p-Amoniphenol, 4-Amino-m-Cresol, 1-Hydroxyethyl 4,5-Diamino Pyrzole Sulfate, Basic Yellow 87, 6-Amino-m-Cresol, 6-Amino-o-Cresol, Basic Orange 31, Basic Red 51, Ofenóis, Amônia.
                </div>
              </details>
            </div>
          </div>
        )}

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
                    {product.image ? (
                      <img 
                        src={product.image} 
                        alt={product.title} 
                        className={styles.productImage}
                      />
                    ) : (
                      <span style={{
                        color: '#8F857D',
                        fontFamily: 'var(--font-inter)',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase'
                      }}>
                        Imagem em revisão
                      </span>
                    )}
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

                  {product.howToUse && (() => {
                    const isBenefits = product.howToUse.trim().toLowerCase().startsWith('beneficios') || product.howToUse.trim().toLowerCase().startsWith('benefícios');
                    if (isBenefits) return null;
                    
                    return (
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
                        <strong style={{ color: '#c99d4a', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.05em', display: 'block', marginBottom: '0.15rem' }}>
                          Modo de usar
                        </strong>
                        {product.howToUse}
                      </p>
                    );
                  })()}

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
