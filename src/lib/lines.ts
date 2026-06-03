import { groq } from 'next-sanity';

import { client, hasSanityConfig } from '@/sanity/lib/client';

export type LineSummary = {
  name: string;
  slug: string;
};

const slugAliases: Record<string, string> = {
  'barbosa': 'babosa',
  'barber': 'barber-for-men',
  'masculina': 'barber-for-men',
  'caviar-aminoacidos': 'caviar',
  'coloracao-creme': 'coloracao',
  'cachos-and-afro': 'cachos',
  'cachos-afro': 'cachos',
  'jaborandi-and-alecrim': 'jaborandi-alecrim',
  'linha-profissional': 'profissional',
  'liso-perfeito': 'liso',
};

const fallbackLines = [
  'Caviar',
  'Liso',
  'Cachos',
  'Matizadores',
  'Home Care',
  'Babosa',
  'Lapidação',
  'Profissional',
  'Sequestrante',
  'Coloração',
  'Masculina',
];

const lineDescriptions: Record<string, string> = {
  'lapidacao': 'Cronograma capilar em 4 passos com limpeza profunda, selagem, reconstrução e hidratação.',
  'coloracao': 'Colorações creme de alta performance com cobertura uniforme, brilho intenso e proteção da fibra.',
  'matizadores': 'Neutralização profissional de tons amarelados com hidratação e acabamento luminoso.',
  'home-care': 'Tratamentos de manutenção para prolongar em casa o resultado e a performance do salão.',
  'profissional': 'Produtos de alto rendimento para bancada, lavatório e rotinas técnicas de salão.',
  'cachos': 'Definição, disciplina e nutrição para fios cacheados, crespos e afro.',
  'liso': 'Alinhamento, brilho espelhado e controle de frizz para fios lisos ou alisados.',
  'babosa': 'Tratamento fortificante com aloe vera para crescimento saudável e redução da quebra.',
  'caviar': 'Nutrição e regeneração intensa com toque sedoso, brilho e proteção diária.',
  'barber-for-men': 'Cuidados completos para cabelo, barba e rotina masculina com acabamento profissional.',
  'sequestrante': 'Remoção de resíduos, metais e impurezas para recuperar equilíbrio e performance dos fios.',
  'champagne': 'Matização e correção tonal para loiros e grisalhos com brilho refinado.',
  'jaborandi-alecrim': 'Cuidado revitalizante que fortalece a raiz e estimula uma rotina mais saudável.',
};

const lineDisplayNames: Record<string, string> = {
  'lapidacao': 'Lapidação',
  'coloracao': 'Coloração Creme',
  'matizadores': 'Matizadores',
  'home-care': 'Home Care',
  'profissional': 'Linha Profissional',
  'cachos': 'Cachos & Afro',
  'liso': 'Liso Perfeito',
  'babosa': 'Babosa',
  'caviar': 'Caviar',
  'barber-for-men': 'Barber For Men',
  'sequestrante': 'Sequestrante',
  'champagne': 'Champagne',
  'jaborandi-alecrim': 'Jaborandi & Alecrim',
};

export function normalizeLineKey(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export function canonicalizeLineSlug(value: string) {
  const normalizedSlug = normalizeLineKey(value);
  return slugAliases[normalizedSlug] || normalizedSlug;
}

export function dedupeLines(lines: LineSummary[]) {
  const seen = new Set<string>();

  return lines
    .map((line) => ({
      ...line,
      slug: canonicalizeLineSlug(line.slug || line.name),
    }))
    .filter((line) => {
      if (seen.has(line.slug)) {
        return false;
      }

      seen.add(line.slug);
      return true;
    });
}

export async function getLines() {
  if (hasSanityConfig) {
    try {
      const query = groq`*[_type == "line"]{ title, "slug": slug.current } | order(title asc)`;
      const sanityLines = await client!.fetch(query, {}, { cache: 'no-store' });

      if (sanityLines && sanityLines.length > 0) {
        return dedupeLines(sanityLines.map((line: { title: string; slug: string }) => ({
          name: line.title,
          slug: line.slug,
        })));
      }
    } catch (error) {
      console.error(error);
    }
  }

  return dedupeLines(
    fallbackLines.map((name) => ({
      name,
      slug: normalizeLineKey(name),
    })),
  );
}

export function getLineDisplayName(slug: string, fallbackName?: string) {
  return lineDisplayNames[slug] || fallbackName || slug.replace(/-/g, ' ');
}

export function getLineDescription(slug: string) {
  return lineDescriptions[slug] || 'Tratamento profissional desenvolvido para performance, resultado e consistência no salão e em casa.';
}
