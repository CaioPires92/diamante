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
    'caviar': 'Caviar & Aminoácidos'
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
    'caviar': 'A sofisticação do caviar associada a aminoácidos nobres para um resgate imediato do brilho e da maciez. Nutrição profunda que reconstrói a elasticidade natural dos cabelos desidratados.'
  };

  const cleanSlug = decodedSlug.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(' ', '-');
  const rawName = decodedSlug.replace('-', ' ');
  const lineName = lineNamesMap[cleanSlug] || rawName;
  const lineDesc = lineDescriptions[cleanSlug] || `Descubra os produtos incríveis da nossa linha ${lineName}.`;
  
  // Tenta buscar do Sanity primeiro. Se não configurado, cai para o JSON local.
  let products = await getSanityProducts(cleanSlug);
  if (!products) {
    products = getLocalProducts(cleanSlug);
  }

  return (
    <main style={{ paddingTop: '150px', paddingBottom: '100px', minHeight: '100vh', backgroundColor: '#FAF6F0', position: 'relative' }}>
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
          
          {/* Gold separator with diamond */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '1.5rem 0' }}>
            <div style={{ width: '80px', height: '1px', background: 'rgba(201, 157, 74, 0.4)' }} />
            <span style={{ color: '#c99d4a', margin: '0 15px', fontSize: '0.75rem' }}>♦</span>
            <div style={{ width: '80px', height: '1px', background: 'rgba(201, 157, 74, 0.4)' }} />
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
                    height: '220px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 2
                  }}>
                    <img 
                      src={product.image} 
                      alt={product.title} 
                      style={{ 
                        maxWidth: '100%', 
                        maxHeight: '100%', 
                        objectFit: 'contain',
                        filter: 'drop-shadow(0 6px 12px rgba(0, 0, 0, 0.06))',
                        borderRadius: '8px'
                      }} 
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
                  
                  {/* Luxury divider line */}
                  <div style={{ width: '100%', height: '1px', background: 'rgba(201, 157, 74, 0.3)', marginBottom: '1rem' }} />

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
