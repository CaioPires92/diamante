export interface ProductDetail {
  id: string;
  slug: string;
  lojaIntegradaId?: string;
  price?: string;
  name?: string;
  line: string;
  category: string;
  image: string;
  gallery: string[];
  features: string[];
  howToUse: string;
  benefits: string;
  ingredients: string;
}

const productsData: ProductDetail[] = [
  {
    id: 'shampoo-supreme',
    slug: 'shampoo-supreme-caviar',
    lojaIntegradaId: '', // Nenhum ID real associado
    price: 'R$ 89,90',
    line: 'Caviar',
    category: 'wash',
    image: '/images/products/caviar/prod_2.png',
    gallery: ['/images/products/caviar/prod_2.png', '/images/products/caviar/prod_1.png'],
    features: ['Livre de Parabenos', 'Cruelty Free', 'Proteção Térmica'],
    howToUse: 'Aplique o Shampoo Caviar nos cabelos molhados, massageando suavemente o couro cabeludo até formar espuma. Enxágue abundantemente e repita a operação se necessário.',
    benefits: 'Limpeza profunda sem agredir os fios, hidratação imediata e brilho intenso. Ideal para cabelos que passaram por processos químicos.',
    ingredients: 'Extrato de Caviar, Óleo de Ojon, D-Pantenol.'
  },
  {
    id: 'mask-supreme',
    slug: 'mascara-supreme-tratamento',
    lojaIntegradaId: '', // Nenhum ID real associado
    price: 'R$ 119,90',
    line: 'Caviar',
    category: 'treatment',
    image: '/images/products/caviar/prod_3.png',
    gallery: ['/images/products/caviar/prod_3.png', '/images/products/caviar/prod_1.png'],
    features: ['Alta Concentração', 'Efeito Teia', 'Nutrição Profunda'],
    howToUse: 'Após lavar os cabelos, aplique a Máscara Caviar mecha a mecha. Deixe agir por 10 a 15 minutos e enxágue totalmente.',
    benefits: 'Reconstrução da fibra capilar, selamento de cutículas e maciez extrema.',
    ingredients: 'Extrato de Caviar, Óleo de Ojon, Queratina Hidrolisada.'
  },
  {
    id: 'serum-supreme',
    slug: 'serum-supreme-finish',
    lojaIntegradaId: '', // Nenhum ID real associado
    price: 'R$ 69,90',
    line: 'Caviar',
    category: 'finishing',
    image: '/images/products/caviar/prod_4.png',
    gallery: ['/images/products/caviar/prod_4.png', '/images/products/caviar/prod_0.png'],
    features: ['Anti-frizz', 'Brilho Espelhado', 'Filtro UV'],
    howToUse: 'Aplique o Leave-in Caviar nos cabelos limpos e úmidos. Distribua uniformemente ao longo dos fios. Não enxágue.',
    benefits: 'Ação anti-frizz, creme de pentear desembaraçante e protetor térmico sem enxágue.',
    ingredients: 'Extrato de Caviar, Óleo de Ojon, Silicones Nobres, Filtro Solar.'
  }
];

export function getProductBySlug(slug: string) {
  return productsData.find(p => p.slug === slug);
}

export function getRelatedProducts(currentId: string, line: string) {
  return productsData.filter(p => p.line === line && p.id !== currentId).slice(0, 3);
}
