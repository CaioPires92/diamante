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
  'liso': 'liso-perfeito',
};

const catalogLines: LineSummary[] = [
  { name: 'Caviar', slug: 'caviar' },
  { name: 'Desmaia Cabelo', slug: 'desmaia-cabelo' },
  { name: 'Babosa', slug: 'babosa' },
  { name: 'Liso Perfeito', slug: 'liso-perfeito' },
  { name: 'Cachos & Afro', slug: 'cachos' },
  { name: 'Bomba', slug: 'bomba' },
  { name: 'Super Efeito Cinza', slug: 'super-efeito-cinza' },
  { name: 'Pérola', slug: 'perola' },
  { name: 'Champagne', slug: 'champagne' },
  { name: 'Super Prata', slug: 'super-prata' },
  { name: 'Açaí', slug: 'acai' },
  { name: 'Ultra Violeta Ice', slug: 'ultra-violeta-ice' },
  { name: 'Black', slug: 'black' },
  { name: 'Linha P', slug: 'linha-p' },
  { name: 'Linha N', slug: 'linha-n' },
  { name: 'Jaborandi & Alecrim', slug: 'jaborandi-alecrim' },
  { name: 'Reparo Absoluto', slug: 'reparo-absoluto' },
  { name: 'Mega Carga de Keratina', slug: 'mega-carga-de-keratina' },
  { name: 'Lapidação', slug: 'lapidacao' },
  { name: 'Sequestrante', slug: 'sequestrante' },
  { name: 'Sérum Gloss', slug: 'serum-gloss' },
  { name: 'Óleos', slug: 'oleos' },
  { name: 'Barber For Men', slug: 'barber-for-men' },
  { name: 'Anti Resíduo', slug: 'anti-residuo' },
  { name: 'Regulador de pH', slug: 'regulador-de-ph' },
  { name: 'OX Profissional', slug: 'ox-profissional' },
  { name: 'Pó Descolorante', slug: 'po-descolorante' },
  { name: 'Nutritivo', slug: 'nutritivo' },
  { name: 'Coloração', slug: 'coloracao' },
];

const lineDescriptions: Record<string, string> = {
  'lapidacao': 'Cronograma capilar em 4 passos com limpeza profunda, selagem, reconstrução e hidratação.',
  'coloracao': 'Colorações creme de alta performance com cobertura uniforme, brilho intenso e proteção da fibra.',
  'ox-profissional': 'Emulsões oxidantes profissionais para preparação de colorações e descolorações nas volumagens adequadas a cada técnica.',
  'matizadores': 'Neutralização profissional de tons amarelados com hidratação e acabamento luminoso.',
  'home-care': 'Tratamentos de manutenção para prolongar em casa o resultado e a performance do salão.',
  'profissional': 'Produtos de alto rendimento para bancada, lavatório e rotinas técnicas de salão.',
  'nutritivo': 'Shampoo e condicionador nutritivos de alto rendimento em embalagens profissionais de 5 litros.',
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
  'nutritivo': 'Nutritivo',
  'cachos': 'Cachos & Afro',
  'liso': 'Liso Perfeito',
  'babosa': 'Babosa',
  'caviar': 'Caviar',
  'barber-for-men': 'Barber For Men',
  'sequestrante': 'Sequestrante',
  'champagne': 'Champagne',
  'jaborandi-alecrim': 'Jaborandi & Alecrim',
  'oleos': 'Óleos',
  'acai': 'Açaí',
  'anti-residuo': 'Anti Resíduo',
  'black': 'Black',
  'bomba': 'Bomba',
  'desmaia-cabelo': 'Desmaia Cabelo',
  'linha-n': 'Linha N',
  'linha-p': 'Linha P',
  'liso-perfeito': 'Liso Perfeito',
  'mega-carga-de-keratina': 'Mega Carga de Keratina',
  'perola': 'Pérola',
  'po-descolorante': 'Pó Descolorante',
  'regulador-de-ph': 'Regulador de pH',
  'ox-profissional': 'OX Profissional',
  'reparo-absoluto': 'Reparo Absoluto',
  'serum-gloss': 'Sérum Gloss',
  'super-efeito-cinza': 'Super Efeito Cinza',
  'super-prata': 'Super Prata',
  'ultra-violeta-ice': 'Ultra Violeta Ice',
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
  return catalogLines;
}

export function getLineDisplayName(slug: string, fallbackName?: string) {
  return lineDisplayNames[slug] || fallbackName || slug.replace(/-/g, ' ');
}

export function getLineDescription(slug: string) {
  return lineDescriptions[slug] || 'Tratamento profissional desenvolvido para performance, resultado e consistência no salão e em casa.';
}
