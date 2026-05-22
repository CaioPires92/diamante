import React from 'react';
import { Container } from '@/components/ui/Container';

import fs from 'fs';
import path from 'path';

// Função para ler os produtos locais
function getProducts(slug: string) {
  try {
    const filePath = path.join(process.cwd(), 'src', 'data', 'products.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileContents);
    return data[slug] || [];
  } catch (e) {
    return [];
  }
}

export default async function LinePage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  // No Next.js 15+, os params são uma Promise e precisam de 'await'
  const resolvedParams = await params;
  const decodedSlug = decodeURIComponent(resolvedParams.slug);
  
  // Mapa para restaurar os nomes corretos com acentuação a partir do slug limpo da URL
  const lineNamesMap: Record<string, string> = {
    'lapidacao': 'Lapidação',
    'coloracao': 'Coloração',
    'matizadores': 'Matizadores',
    'home-care': 'Home Care',
    'profissional': 'Profissional'
  };

  const cleanSlug = decodedSlug.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(' ', '-');
  const rawName = decodedSlug.replace('-', ' ');
  const lineName = lineNamesMap[cleanSlug] || rawName;
  const products = getProducts(cleanSlug);

  return (
    <main style={{ paddingTop: '120px', paddingBottom: '80px', minHeight: '100vh', backgroundColor: '#FAFAF8' }}>
      <Container>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h1 style={{ 
            fontFamily: 'var(--font-playfair)', 
            fontSize: 'clamp(2.5rem, 5vw, 4rem)', 
            color: '#2D2A26', 
            marginBottom: '1rem',
            textTransform: 'capitalize' 
          }}>
            Linha {lineName}
          </h1>
          <p style={{ color: '#6B625A', fontSize: '1.125rem', maxWidth: '600px', margin: '0 auto' }}>
            Descubra os produtos incríveis da nossa linha {lineName}.
          </p>
        </div>

        {products.length > 0 ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '2rem',
            marginTop: '4rem'
          }}>
            {products.map((product: any) => (
              <div key={product.id} style={{
                background: '#fff',
                borderRadius: '16px',
                padding: '2rem',
                textAlign: 'center',
                border: '1px solid rgba(201, 157, 74, 0.1)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                display: 'flex',
                flexDirection: 'column'
              }}>
                <div style={{
                  width: '100%',
                  height: '240px',
                  background: 'transparent',
                  marginBottom: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <img 
                    src={product.image} 
                    alt={product.title} 
                    style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} 
                  />
                </div>
                <h3 style={{ fontFamily: 'var(--font-playfair)', fontSize: '1.125rem', color: '#2D2A26', marginBottom: '0.5rem', flexGrow: 1 }}>
                  {product.title}
                </h3>
                <p style={{ color: '#c99d4a', fontSize: '1.25rem', fontWeight: 600, marginTop: 'auto' }}>
                  {product.price}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', marginTop: '4rem', padding: '4rem', background: '#fff', borderRadius: '16px', border: '1px dashed rgba(201, 157, 74, 0.3)' }}>
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
