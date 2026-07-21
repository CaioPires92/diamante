import { cache } from 'react';

import { lojaIntegradaFetch } from '@/lib/loja-integrada';

type LojaIntegradaImage = {
  caminho?: string | null;
  grande?: string | null;
  media?: string | null;
  pequena?: string | null;
  posicao?: number | string | null;
  principal?: boolean | null;
};

type LojaIntegradaProductListItem = {
  id: number;
  apelido?: string | null;
  ativo: boolean;
  bloqueado: boolean;
  categorias: string[];
  descricao_completa?: string | null;
  imagem_principal?: LojaIntegradaImage | null;
  imagens?: LojaIntegradaImage[] | null;
  nome?: string | null;
  removido?: boolean;
  sku?: string | null;
  url?: string | null;
};

type LojaIntegradaProductDetail = LojaIntegradaProductListItem & {
  imagens?: LojaIntegradaImage[] | null;
};

type LojaIntegradaCategory = {
  id: number;
  categoria_pai?: string | null;
  descricao?: string | null;
  nome: string;
  url?: string | null;
};

type LojaIntegradaPrice = {
  cheio?: string | null;
  promocional?: string | null;
  sob_consulta?: boolean;
};

type LojaIntegradaStock = {
  gerenciado?: boolean;
  quantidade_disponivel?: number;
};

export type CatalogProduct = {
  id: string;
  lojaIntegradaId: string;
  slug: string;
  name: string;
  title: string;
  description: string;
  image: string;
  gallery: string[];
  line: string;
  lineSlug: string;
  price?: string;
  size?: string;
  code?: string;
  howToUse?: string;
  benefits?: string;
  ingredients?: string;
  available: boolean;
  quantityAvailable?: number;
};

const PAGE_SIZE = 100;
const PLACEHOLDER_IMAGE = '/imgs/product1.png';
const PRODUCT_IMAGE_OVERRIDES: Record<string, string> = {
  'ativador-de-cachos-leve-250ml': '/images/products/cachos/ativador-leve.webp',
  'ativador-de-cachos-intenso-250ml': '/images/products/cachos/ativador-intenso.webp',
  'leave-in-spray-desmaia-cabelo-120ml': '/images/products/desmaia-cabelo/leave-in-spray-120ml.webp',
  'liso-perfeito-15-em-1-200-ml': '/images/products/liso/liso-perfeito-15-em-1.webp',
  'leave-in-liso-perfeito-250ml': '/images/products/liso/leave-in-liso-perfeito-250ml.png',
  'shampoo-n-500ml': '/images/products/linha-n/shampoo-n-500ml.png',
  'condicionador-n-500ml': '/images/products/linha-n/condicionador-n-500ml.png',
  'mascara-black-profissional-900g': '/images/products/black/mascara-black-profissional-900g.png',
  'shampoo-reparo-absoluto-300ml': '/images/products/reparo-absoluto/shampoo-reparo-absoluto-300ml.png',
  'regulador-de-ph-organico-1l': '/images/products/regulador-ph/regulador-ph-1000ml.png',
  'shampoo-nutritivo-5-litros': '/images/products/nutritivo/shampoo-nutritivo-5l.png',
  'condicionador-nutritivo-5-litros': '/images/products/nutritivo/condicionador-nutritivo-5l.png',
  'shampoo-acai-300ml': '/images/products/acai/shampoo-acai-300ml.png',
  'condicionador-acai-250ml': '/images/products/acai/condicionador-acai-250ml.png',
  'mascara-acai-250g': '/images/products/acai/mascara-acai-250g.png',
  'leave-in-spray-acai-120ml': '/images/products/acai/leave-in-spray-acai-120ml.png',
  'shampoo-p-500ml': '/images/products/linha-p/shampoo-p-500ml.png',
  'condicionador-p-500ml': '/images/products/linha-p/condicionador-p-500ml.png',
  'shampoo-lapidacao-1l-step-1': '/images/products/lapidacao/passo-01-limpar.png',
  'selador-de-cuticula-lapidacao-1l-step-2': '/images/products/lapidacao/passo-02-selar.png',
  'reconstrutor-lapidacao-1l-step-3': '/images/products/lapidacao/passo-03-reconstruir.png',
  'hidratacao-lapidacao-1l-step-4': '/images/products/lapidacao/passo-04-hidratar.png',
};

const lineNamesMap: Record<string, string> = {
  'lapidacao': 'Lapidação',
  'coloracao': 'Coloração Creme',
  'ox-profissional': 'OX Profissional',
  'matizadores': 'Matizadores',
  'home-care': 'Home Care',
  'profissional': 'Linha Profissional',
  'nutritivo': 'Nutritivo',
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
  'oleos': 'Óleos',
  'super-efeito-cinza': 'Super Efeito Cinza',
  'super-prata': 'Super Prata',
  'ultra-violeta-ice': 'Ultra Violeta Ice',
  'acai': 'Açaí',
};

function inferSpecificLineSlug(productName: string) {
  const name = normalizeText(productName);

  // Color names such as "Pérola" and "Champagne" describe the shade here,
  // not the hair-care line. Classify color products before matching line names.
  if (/^ox \d+ volumes/.test(name)) return 'ox-profissional';
  if (name.includes('coloracao diamante')) return 'coloracao';
  if (name.includes('jaborandi')) return 'jaborandi-alecrim';
  if (name.includes('caviar')) return 'caviar';
  if (name.includes('babosa')) return 'babosa';
  if (name.includes('desmaia')) return 'desmaia-cabelo';
  if (name.includes('liso perfeito')) return 'liso-perfeito';
  if (name.includes('cachos')) return 'cachos';
  if (name.includes('champagne')) return 'champagne';
  if (name.includes('perola')) return 'perola';
  if (name.includes('acai')) return 'acai';
  if (name.includes('violeta') && name.includes('ice')) return 'ultra-violeta-ice';
  if (name.includes('black')) return 'black';
  if (name.includes('bomba')) return 'bomba';
  if (name.includes('super prata') || name.includes('efeito prata')) return 'super-prata';
  if (name.includes('super efeito cinza') || name.includes('super morango')) return 'super-efeito-cinza';
  if (name.includes('mega carga') || name.includes('recarga keratina') || name.includes('keratina hidrolisada')) return 'mega-carga-de-keratina';
  if (name.includes('lapidacao')) return 'lapidacao';
  if (name.includes('sequestrante')) return 'sequestrante';
  if (name.includes('reparo absoluto')) return 'reparo-absoluto';
  if (/\b(shampoo|condicionador) p\b/.test(name)) return 'linha-p';
  if (/\b(shampoo|condicionador) n\b/.test(name) || name.includes('nutritivo')) return 'linha-n';
  if (name.includes('po descolorante')) return 'po-descolorante';
  if (name.includes('regulador de ph')) return 'regulador-de-ph';
  if (name.includes('anti residuo')) return 'anti-residuo';
  if (name.includes('serum gloss') || name.includes('serum ojon') || name.includes('iluminador argan') || name.includes('lilly')) return 'serum-gloss';
  if (name.includes('semi di lino') || name.includes('light blue') || name.includes('oleo de ricino') || name.includes('oleo de coco')) return 'oleos';
  if (name.includes('barber') || name.includes('masculino') || name.includes('shaving') || name.includes('gel fixador')) return 'barber-for-men';
  return null;
}

function isProfessionalSalonProduct(productName: string) {
  const name = normalizeText(productName);
  return /\b(1l|1 litro|900g|900 g|1000g)\b/.test(name)
    && /caviar|bomba|champagne|desmaia|super efeito cinza|super morango|black/.test(name);
}

function isNutritivoFiveLiterProduct(productName: string) {
  const name = normalizeText(productName);
  return name.includes('nutritivo') && /\b5\s*(?:l|litros?)\b/.test(name);
}

function matchesRequestedLine(product: LojaIntegradaProductListItem, slug: string) {
  const specificLine = inferSpecificLineSlug(product.nome || '');

  if (slug === 'profissional') return isProfessionalSalonProduct(product.nome || '');
  if (slug === 'nutritivo') return isNutritivoFiveLiterProduct(product.nome || '');
  if (slug === 'serum-gloss') return specificLine === 'serum-gloss' || specificLine === 'oleos';
  if (slug === 'matizadores') {
    return ['acai', 'black', 'champagne', 'perola', 'super-efeito-cinza', 'super-prata', 'ultra-violeta-ice'].includes(specificLine || '');
  }
  if (slug === 'home-care') {
    return ['babosa', 'bomba', 'jaborandi-alecrim', 'linha-n', 'linha-p', 'mega-carga-de-keratina', 'reparo-absoluto'].includes(specificLine || '')
      && !isProfessionalSalonProduct(product.nome || '');
  }
  if (slug === 'liso') return specificLine === 'liso-perfeito';
  if (slug === 'coloracao') return specificLine === 'coloracao';
  if (slug === 'linha-n') {
    return specificLine === 'linha-n' && !isNutritivoFiveLiterProduct(product.nome || '');
  }

  return specificLine === slug;
}

function normalizeText(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

function isProfessionalDisplayProduct(product: CatalogProduct) {
  const searchableText = normalizeText(`${product.title} ${product.size || ''}`)
    .replace(/diamante profissional/g, '');

  return /\bprofissional\b/.test(searchableText)
    || /\b(?:900|1000)\s*(?:g|ml)\b/.test(searchableText)
    || /\b1\s*(?:kg|l|litro)\b/.test(searchableText)
    || /\b5\s*(?:l|litros?)\b/.test(searchableText);
}

function getHomeCareProductTypeOrder(product: CatalogProduct) {
  const name = normalizeText(product.title);

  if (/\bshampoo\b/.test(name)) return 0;
  if (/\bcondicionador\b/.test(name)) return 1;
  if (/\bshaving\b/.test(name)) return 2;
  if (/\bserum barber\b/.test(name)) return 3;
  if (/\bgel fixador\b/.test(name)) return 4;
  if (/\bmascara\b/.test(name)) return 2;
  if (/\bleave[ -]?in\b/.test(name) || name.includes('creme sem enxague')) {
    return name.includes('spray') ? 3.1 : 3;
  }
  if (name.includes('ativador')) return name.includes('leve') ? 4 : 4.1;

  return 4.2;
}

function getExplicitStepOrder(product: CatalogProduct) {
  const name = normalizeText(product.title);
  const match = name.match(/\b(?:passo|step)\s*0?(\d+)\b/);

  return match ? Number(match[1]) : null;
}

function getSerumGlossProductOrder(product: CatalogProduct) {
  const name = normalizeText(product.title);

  if (name.includes('serum gloss ojon')) return 0;
  if (name.includes('iluminador argan')) return 1;
  if (name.includes('lilly iluminador')) return 2;
  if (name.includes('semi di lino')) return 3;
  if (name.includes('light blue')) return 4;
  if (name.includes('oleo de ricino')) return 5;
  if (name.includes('oleo de coco')) return 6;

  return Number.POSITIVE_INFINITY;
}

export function sortLineProductsForDisplay(products: CatalogProduct[], lineSlug?: string) {
  return products
    .map((product, originalIndex) => ({ product, originalIndex }))
    .sort((a, b) => {
      if (lineSlug === 'serum-gloss') {
        return getSerumGlossProductOrder(a.product) - getSerumGlossProductOrder(b.product)
          || a.originalIndex - b.originalIndex;
      }

      const aStepOrder = getExplicitStepOrder(a.product);
      const bStepOrder = getExplicitStepOrder(b.product);
      if (aStepOrder !== null || bStepOrder !== null) {
        return (aStepOrder ?? Number.POSITIVE_INFINITY) - (bStepOrder ?? Number.POSITIVE_INFINITY)
          || a.originalIndex - b.originalIndex;
      }

      const aTypeOrder = getHomeCareProductTypeOrder(a.product);
      const bTypeOrder = getHomeCareProductTypeOrder(b.product);
      const aProfessional = isProfessionalDisplayProduct(a.product);
      const bProfessional = isProfessionalDisplayProduct(b.product);
      const aOrder = aProfessional ? (aTypeOrder === 0 ? 5 : aTypeOrder === 1 ? 6 : 7) : aTypeOrder;
      const bOrder = bProfessional ? (bTypeOrder === 0 ? 5 : bTypeOrder === 1 ? 6 : 7) : bTypeOrder;

      return aOrder - bOrder || a.originalIndex - b.originalIndex;
    })
    .map(({ product }) => product);
}

function stripHtml(value?: string | null) {
  if (!value) {
    return '';
  }

  return value
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n')
    .replace(/<li>/gi, '- ')
    .replace(/<\/li>/gi, '\n')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/\r/g, '')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/[ \t]{2,}/g, ' ')
    .trim();
}

function formatCurrency(rawValue?: string | null) {
  if (!rawValue) {
    return undefined;
  }

  const parsedValue = Number.parseFloat(rawValue);

  if (Number.isNaN(parsedValue)) {
    return undefined;
  }

  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(parsedValue);
}

function extractSlug(product: LojaIntegradaProductListItem) {
  const rawSlug = product.apelido?.replace(/^\/+/, '').trim();

  if (rawSlug) {
    return rawSlug;
  }

  return `produto-${product.id}`;
}

function imageUrlFromPath(path?: string | null, size: '800x800' | '380x380' = '800x800') {
  if (!path) {
    return '';
  }

  return `https://cdn.awsli.com.br/${size}/${path.replace(/^\/+/, '')}`;
}

function getGallery(product: LojaIntegradaProductListItem | LojaIntegradaProductDetail) {
  const overrideImage = PRODUCT_IMAGE_OVERRIDES[extractSlug(product)];
  if (overrideImage) return [overrideImage];

  const images = [
    product.imagem_principal,
    ...(product.imagens || []),
  ]
    .filter(Boolean)
    .sort((a, b) => Number(a?.posicao || 0) - Number(b?.posicao || 0))
    .map((image) => image?.grande || image?.media || imageUrlFromPath(image?.caminho))
    .filter((value): value is string => Boolean(value));

  return Array.from(new Set(images));
}

function parseCategoryId(resourceUri: string) {
  const match = resourceUri.match(/\/categoria\/(\d+)/);
  return match ? Number(match[1]) : null;
}

function categoryToLineSlug(categoryName: string) {
  const normalized = normalizeText(categoryName);

  if (normalized.includes('caviar')) return 'caviar';
  if (normalized.includes('liso')) return 'liso';
  if (normalized.includes('cachos')) return 'cachos';
  if (normalized.includes('matizadores')) return 'matizadores';
  if (normalized === 'home care') return 'home-care';
  if (normalized.includes('babosa')) return 'babosa';
  if (normalized.includes('lapidacao')) return 'lapidacao';
  if (normalized.includes('sequestrante')) return 'sequestrante';
  if (normalized.includes('masculina') || normalized.includes('barba')) return 'barber-for-men';
  if (normalized.includes('coloracao')) return 'coloracao';
  if (normalized.includes('profissional')) return 'profissional';
  if (normalized.includes('jaborandi')) return 'jaborandi-alecrim';

  return null;
}

function parseSize(productName: string) {
  const patterns = [
    /\b\d+\s?(?:ml|g|kg|litro|litros|l)\b/i,
    /\b\d+\s?x\s?\d+\s?(?:ml|g)\b/i,
  ];

  for (const pattern of patterns) {
    const match = productName.match(pattern);
    if (match) {
      return match[0].replace(/\s+/g, ' ').trim();
    }
  }

  return undefined;
}

function splitDescription(description: string) {
  const plainText = stripHtml(description);

  if (!plainText) {
    return {
      description: 'Produto oficial da Diamante Profissional.',
      benefits: 'Consulte a descrição completa e as recomendações de uso no atendimento.',
      howToUse: 'Siga a orientação de uso indicada pela Diamante Profissional.',
      ingredients: 'Consulte a embalagem do produto para a composição completa.',
    };
  }

  const howToUseMatch = plainText.match(/(?:modo de usar|modo de aplicacao|modo de aplicação|como usar|conselho de aplicacao|conselho de aplicação|instrucoes de uso|instruções de uso|sugestao de uso|sugestão de uso)\s*:?\s*([\s\S]*?)(?:(?:ingredientes?|composicao|composição|precaucoes|precauções|advertencias|advertências)\s*:?|$)/i);
  const ingredientsMatch = plainText.match(/(?:ingredientes?|composicao|composição)\s*:?\s*([\s\S]*?)(?:(?:precaucoes|precauções|advertencias|advertências)\s*:?|$)/i);

  const benefits = plainText
    .replace(/(?:modo de usar|modo de aplicacao|modo de aplicação|como usar|conselho de aplicacao|conselho de aplicação|instrucoes de uso|instruções de uso|sugestao de uso|sugestão de uso)\s*:?\s*([\s\S]*?)(?:(?:ingredientes?|composicao|composição|precaucoes|precauções|advertencias|advertências)\s*:?|$)/i, '')
    .replace(/(?:ingredientes?|composicao|composição)\s*:?\s*([\s\S]*?)(?:(?:precaucoes|precauções|advertencias|advertências)\s*:?|$)/i, '')
    .trim();

  return {
    description: benefits.split('\n')[0] || plainText.slice(0, 180),
    benefits: benefits || plainText,
    howToUse: howToUseMatch?.[1]?.trim() || 'Siga a orientação de uso indicada pela Diamante Profissional.',
    ingredients: ingredientsMatch?.[1]?.trim() || 'Consulte a embalagem do produto para a composição completa.',
  };
}

const getAllCategories = cache(async () => {
  const searchParams = new URLSearchParams({
    limit: '100',
    offset: '0',
  });

  const data = await lojaIntegradaFetch<{ objects: LojaIntegradaCategory[] }>('/v1/categoria', {
    searchParams,
  });

  return new Map<number, LojaIntegradaCategory>(
    (data.objects || []).map((category) => [category.id, category]),
  );
});

const getAllActiveProducts = cache(async () => {
  const allProducts: LojaIntegradaProductListItem[] = [];
  let offset = 0;

  while (true) {
    const searchParams = new URLSearchParams({
      limit: String(PAGE_SIZE),
      offset: String(offset),
      ativo: 'true',
    });

    const data = await lojaIntegradaFetch<{
      meta?: { total_count?: number };
      objects: LojaIntegradaProductListItem[];
    }>('/v1/produto', { searchParams });

    const pageObjects = data.objects || [];
    const pageProducts = pageObjects.filter(
      (product) => product.ativo && !product.bloqueado && !product.removido && product.nome,
    );

    allProducts.push(...pageProducts);

    if (pageObjects.length < PAGE_SIZE) {
      break;
    }

    offset += PAGE_SIZE;
  }

  return allProducts;
});

async function getProductPrice(productId: number) {
  return lojaIntegradaFetch<LojaIntegradaPrice>(`/v1/produto_preco/${productId}`);
}

async function getProductStock(productId: number) {
  return lojaIntegradaFetch<LojaIntegradaStock>(`/v1/produto_estoque/${productId}`);
}

async function getProductDetail(productId: number) {
  return lojaIntegradaFetch<LojaIntegradaProductDetail>(`/v1/produto/${productId}`);
}

async function mapProductDetail(
  detail: LojaIntegradaProductDetail,
  categoriesMap: Map<number, LojaIntegradaCategory>,
  price: LojaIntegradaPrice | null,
  stock: LojaIntegradaStock | null,
) {
  const lineSlug = inferLineSlug(detail, categoriesMap);
  const gallery = getGallery(detail);
  const parsedDescription = splitDescription(detail.descricao_completa || '');
  const quantityAvailable = stock?.quantidade_disponivel;

  return {
    id: String(detail.id),
    lojaIntegradaId: String(detail.id),
    slug: extractSlug(detail),
    title: detail.nome || `Produto ${detail.id}`,
    name: detail.nome || `Produto ${detail.id}`,
    description: parsedDescription.description,
    gallery: gallery.length > 0 ? gallery : [PLACEHOLDER_IMAGE],
    image: gallery[0] || PLACEHOLDER_IMAGE,
    line: lineNamesMap[lineSlug] || lineSlug,
    lineSlug,
    price: formatCurrency(price?.promocional || price?.cheio),
    size: parseSize(detail.nome || ''),
    code: detail.sku || undefined,
    howToUse: parsedDescription.howToUse,
    benefits: parsedDescription.benefits,
    ingredients: parsedDescription.ingredients,
    available: detail.ativo && !detail.bloqueado && (stock?.gerenciado ? (quantityAvailable || 0) > 0 : true),
    quantityAvailable,
    features: [
      stock?.gerenciado ? `Estoque disponível: ${quantityAvailable || 0}` : 'Disponibilidade sob consulta',
      detail.sku ? `SKU: ${detail.sku}` : 'Produto oficial Diamante Profissional',
      price?.promocional ? 'Preço promocional ativo' : 'Compra oficial pela loja',
    ],
  };
}

function inferLineSlug(
  product: LojaIntegradaProductListItem,
  categoriesMap: Map<number, LojaIntegradaCategory>,
) {
  const specificLineSlug = inferSpecificLineSlug(product.nome || '');

  if (specificLineSlug) {
    return specificLineSlug;
  }

  for (const categoryUri of product.categorias || []) {
    const categoryId = parseCategoryId(categoryUri);

    if (!categoryId) {
      continue;
    }

    const category = categoriesMap.get(categoryId);
    const lineSlug = category ? categoryToLineSlug(category.nome) : null;

    if (lineSlug) {
      return lineSlug;
    }
  }

  const productName = normalizeText(product.nome || '');

  if (productName.includes('jaborandi')) return 'jaborandi-alecrim';
  if (productName.includes('caviar')) return 'caviar';
  if (productName.includes('babosa')) return 'babosa';
  if (productName.includes('desmaia') || productName.includes('liso')) return 'liso';
  if (productName.includes('cachos')) return 'cachos';
  if (productName.includes('matizador') || productName.includes('prata') || productName.includes('perola') || productName.includes('champagne')) return 'matizadores';
  if (productName.includes('coloracao') || productName.includes('po descolorante') || productName.includes('ox ')) return 'coloracao';
  if (productName.includes('barba') || productName.includes('pomada')) return 'barber-for-men';
  if (productName.includes('anti residuo') || productName.includes('regulador de ph')) return 'profissional';

  return 'home-care';
}

async function mapProductSummary(
  product: LojaIntegradaProductListItem,
  categoriesMap: Map<number, LojaIntegradaCategory>,
  includeCommerceData = false,
): Promise<CatalogProduct> {
  const [price, stock, detail] = includeCommerceData
    ? await Promise.all([
        getProductPrice(product.id).catch(() => null),
        getProductStock(product.id).catch(() => null),
        getProductDetail(product.id).catch(() => null),
      ])
    : [null, null, null];
  const lineSlug = inferLineSlug(product, categoriesMap);
  const gallery = getGallery(detail || product);
  const parsedDescription = splitDescription(detail?.descricao_completa || product.descricao_completa || '');
  const quantityAvailable = stock?.quantidade_disponivel;

  return {
    id: String(product.id),
    lojaIntegradaId: String(product.id),
    slug: extractSlug(product),
    name: product.nome || `Produto ${product.id}`,
    title: product.nome || `Produto ${product.id}`,
    description: parsedDescription.description,
    image: gallery[0] || PLACEHOLDER_IMAGE,
    gallery: gallery.length > 0 ? gallery : [PLACEHOLDER_IMAGE],
    line: lineNamesMap[lineSlug] || lineSlug,
    lineSlug,
    price: formatCurrency(price?.promocional || price?.cheio),
    size: parseSize(product.nome || ''),
    code: product.sku || undefined,
    howToUse: parsedDescription.howToUse,
    benefits: parsedDescription.benefits,
    ingredients: parsedDescription.ingredients,
    available: includeCommerceData
      ? product.ativo && !product.bloqueado && (stock?.gerenciado ? (quantityAvailable || 0) > 0 : true)
      : product.ativo && !product.bloqueado,
    quantityAvailable,
  };
}

export const getCatalogProducts = cache(async () => {
  const [products, categoriesMap] = await Promise.all([
    getAllActiveProducts(),
    getAllCategories(),
  ]);

  return Promise.all(products.map((product) => mapProductSummary(product, categoriesMap)));
});

export async function getLineProducts(slug: string) {
  const [products, categoriesMap] = await Promise.all([
    getAllActiveProducts(),
    getAllCategories(),
  ]);

  const matchingProducts = products.filter((product) => matchesRequestedLine(product, slug));

  const mappedProducts = await Promise.all(
    matchingProducts.map((product) => mapProductSummary(product, categoriesMap, true)),
  );

  return sortLineProductsForDisplay(mappedProducts, slug);
}

export async function getStoreProductBySlug(slug: string) {
  const normalizedSlug = slug.replace(/^\/+/, '');
  const [products, categoriesMap] = await Promise.all([
    getAllActiveProducts(),
    getAllCategories(),
  ]);

  const summary = products.find((product) => extractSlug(product) === normalizedSlug);

  if (!summary) {
    return null;
  }

  const [detail, price, stock] = await Promise.all([
    getProductDetail(summary.id),
    getProductPrice(summary.id).catch(() => null),
    getProductStock(summary.id).catch(() => null),
  ]);

  return mapProductDetail(detail, categoriesMap, price, stock);
}

export async function getStoreProductsByIds(ids: string[]) {
  const categoriesMap = await getAllCategories();

  return Promise.all(
    ids.map(async (id) => {
      const productId = Number(id);
      const [detail, price, stock] = await Promise.all([
        getProductDetail(productId),
        getProductPrice(productId).catch(() => null),
        getProductStock(productId).catch(() => null),
      ]);

      return mapProductDetail(detail, categoriesMap, price, stock);
    }),
  );
}

export async function getRelatedStoreProducts(lineSlug: string, currentProductId: string, limit = 3) {
  const products = await getCatalogProducts();

  return products
    .filter((product) => product.lineSlug === lineSlug && product.id !== currentProductId)
    .slice(0, limit);
}
