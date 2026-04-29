export interface ProductDetail {
  id: string;
  slug: string;
  line: string;
  category: string;
  image: string;
  gallery: string[];
  features: string[];
  howToUse: string;
  benefits: string;
  ingredients: string;
}

export const productsData: ProductDetail[] = [
  {
    id: 'shampoo-supreme',
    slug: 'shampoo-supreme-caviar',
    line: 'Caviar & Aminoácidos',
    category: 'wash',
    image: '/imgs/product1.png',
    gallery: ['/imgs/product1.png', '/imgs/product2.png'],
    features: ['Livre de Parabenos', 'Cruelty Free', 'Proteção Térmica'],
    howToUse: 'Aplique o Shampoo Supreme nos cabelos molhados, massageando suavemente o couro cabeludo até formar espuma. Enxágue abundantemente e repita a operação se necessário.',
    benefits: 'Limpeza profunda sem agredir os fios, hidratação imediata e brilho intenso. Ideal para cabelos que passaram por processos químicos.',
    ingredients: 'Extrato de Caviar, Aminoácidos Essenciais, Queratina Hidrolisada, Pantenol.'
  },
  {
    id: 'mask-supreme',
    slug: 'mascara-supreme-tratamento',
    line: 'Caviar & Aminoácidos',
    category: 'treatment',
    image: '/imgs/product2.png',
    gallery: ['/imgs/product2.png', '/imgs/product1.png'],
    features: ['Alta Concentração', 'Efeito Teia', 'Nutrição Profunda'],
    howToUse: 'Após lavar os cabelos, aplique a Máscara Supreme mecha a mecha. Deixe agir por 10 a 15 minutos e enxágue totalmente.',
    benefits: 'Reconstrução da fibra capilar, selamento de cutículas e maciez extrema.',
    ingredients: 'Complexo de Vitaminas, Óleo de Argan, Nano-proteínas.'
  },
  {
    id: 'serum-supreme',
    slug: 'serum-supreme-finish',
    line: 'Linha Finish',
    category: 'finishing',
    image: '/imgs/product3.png',
    gallery: ['/imgs/product3.png'],
    features: ['Anti-frizz', 'Brilho Espelhado', 'Filtro UV'],
    howToUse: 'Aplique algumas gotas na palma das mãos e espalhe pelo comprimento e pontas dos cabelos secos ou úmidos.',
    benefits: 'Elimina o frizz, protege contra a umidade e confere um perfume luxuoso aos fios.',
    ingredients: 'Silicones Nobres, Vitamina E, Óleo de Macadâmia.'
  }
];

export function getProductBySlug(slug: string) {
  return productsData.find(p => p.slug === slug);
}

export function getRelatedProducts(currentId: string, line: string) {
  return productsData.filter(p => p.line === line && p.id !== currentId).slice(0, 3);
}
