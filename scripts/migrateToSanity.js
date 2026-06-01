const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const { createClient } = require('@sanity/client');

const rootDir = path.join(__dirname, '..');
const productsDataPath = path.join(rootDir, 'src', 'data', 'products.json');
const envPath = path.join(rootDir, '.env.local');
const dryRun = process.argv.includes('--dry-run');

function loadEnvLocal() {
  if (!fs.existsSync(envPath)) {
    return;
  }

  for (const line of fs.readFileSync(envPath, 'utf8').split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)=(.*)\s*$/);
    if (!match || process.env[match[1]]) {
      continue;
    }

    process.env[match[1]] = match[2].replace(/^["']|["']$/g, '');
  }
}

function slugify(text) {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function normalizeText(text) {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

function hashFile(filePath) {
  return crypto.createHash('sha1').update(fs.readFileSync(filePath)).digest('hex');
}

function docId(prefix, value) {
  return `${prefix}.${slugify(value)}`;
}

loadEnvLocal();

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-05-22',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

const lineMeta = {
  'acai': { title: 'Açaí' },
  'anti-residuo': { title: 'Anti Resíduo' },
  'babosa': { title: 'Babosa' },
  'barber-for-men': { title: 'Barber For Men' },
  'black': { title: 'Black' },
  'bomba': { title: 'Bomba' },
  'cachos': { title: 'Cachos & Afro' },
  'caviar': { title: 'Caviar' },
  'champagne': { title: 'Champagne' },
  'coloracao': { title: 'Coloração' },
  'desmaia-cabelo': { title: 'Desmaia Cabelo' },
  'home-care': { title: 'Home Care' },
  'jaborandi-alecrim': { title: 'Jaborandi & Alecrim' },
  'lapidacao': { title: 'Lapidação' },
  'linha-n': { title: 'Linha N' },
  'linha-p': { title: 'Linha P' },
  'liso': { title: 'Liso' },
  'liso-perfeito': { title: 'Liso Perfeito' },
  'matizadores': { title: 'Matizadores' },
  'mega-carga-de-keratina': { title: 'Mega Carga de Keratina' },
  'oleos': { title: 'Óleos' },
  'perola': { title: 'Pérola' },
  'po-descolorante': { title: 'Pó Descolorante' },
  'profissional': { title: 'Linha Profissional' },
  'regulador-de-ph': { title: 'Regulador de pH' },
  'reparo-absoluto': { title: 'Reparo Absoluto' },
  'sequestrante': { title: 'Sequestrante' },
  'serum-gloss': { title: 'Sérum Gloss' },
  'super-efeito-cinza': { title: 'Super Efeito Cinza' },
  'super-prata': { title: 'Super Prata' },
  'ultra-violeta-ice': { title: 'Ultra Violeta Ice' },
};

const sublineRules = [
  { catalogSlug: 'matizadores', slug: 'super-prata', include: ['prata'] },
  { catalogSlug: 'matizadores', slug: 'super-efeito-cinza', include: ['super'], exclude: ['prata'] },
  { catalogSlug: 'matizadores', slug: 'perola', include: ['perola'] },
  { catalogSlug: 'matizadores', slug: 'champagne', include: ['champagne'] },
  { catalogSlug: 'matizadores', slug: 'acai', include: ['acai'] },
  { catalogSlug: 'matizadores', slug: 'ultra-violeta-ice', include: ['violeta ice'] },
  { catalogSlug: 'matizadores', slug: 'black', include: ['black'] },
  { catalogSlug: 'home-care', slug: 'bomba', include: ['bomba'] },
  { catalogSlug: 'home-care', slug: 'linha-p', include: ['shampoo p', 'condicionador p'] },
  { catalogSlug: 'home-care', slug: 'linha-n', include: ['shampoo n', 'condicionador n'] },
  { catalogSlug: 'home-care', slug: 'jaborandi-alecrim', include: ['jaborandi'] },
  { catalogSlug: 'home-care', slug: 'reparo-absoluto', include: ['reparo absoluto'] },
  { catalogSlug: 'home-care', slug: 'mega-carga-de-keratina', include: ['recarga keratina', 'keratina hidrolisada'] },
  { catalogSlug: 'home-care', slug: 'serum-gloss', include: ['serum gloss', 'iluminador argan', 'lilly iluminador'] },
  { catalogSlug: 'home-care', slug: 'oleos', include: ['semi di lino', 'light blue', 'oleo de ricino', 'oleo de coco'] },
  { catalogSlug: 'liso', slug: 'desmaia-cabelo', include: ['desmaia'] },
  { catalogSlug: 'liso', slug: 'liso-perfeito', include: ['liso perfeito'] },
  { catalogSlug: 'coloracao', slug: 'po-descolorante', include: ['po descolorante'] },
  { catalogSlug: 'profissional', slug: 'anti-residuo', include: ['anti residuo'] },
  { catalogSlug: 'profissional', slug: 'regulador-de-ph', include: ['regulador de ph'] },
];

function matchesRule(product, rule) {
  const title = normalizeText(product.title);
  const includes = rule.include.some((term) => title.includes(normalizeText(term)));
  const excludes = rule.exclude?.some((term) => title.includes(normalizeText(term))) || false;

  return includes && !excludes;
}

function getLineSlug(catalogSlug, product) {
  const subline = sublineRules.find((rule) => rule.catalogSlug === catalogSlug && matchesRule(product, rule));
  return subline?.slug || catalogSlug;
}

function collectLineDescriptions(productsData) {
  const descriptions = {};

  for (const [catalogSlug, products] of Object.entries(productsData)) {
    const productWithDescription = products.find((product) => product.lineDescription);
    if (productWithDescription) {
      descriptions[catalogSlug] = productWithDescription.lineDescription;
    }

    for (const product of products) {
      const lineSlug = getLineSlug(catalogSlug, product);
      if (product.lineDescription && !descriptions[lineSlug]) {
        descriptions[lineSlug] = product.lineDescription;
      }
    }
  }

  descriptions.champagne ||= 'Linha matizadora para cabelos loiros ou grisalhos; neutraliza tons amarelados e promove efeito tonalizante.';
  descriptions['barber-for-men'] ||= 'Cuidado completo para o homem moderno.';

  return descriptions;
}

async function uploadImageOnce(imagePath) {
  if (!fs.existsSync(imagePath)) {
    console.warn(`    Imagem não encontrada: ${imagePath}`);
    return null;
  }

  const sha1 = hashFile(imagePath);
  const existingAsset = await client.fetch('*[_type == "sanity.imageAsset" && sha1hash == $sha1][0]{_id}', { sha1 });

  if (existingAsset?._id) {
    return existingAsset._id;
  }

  if (dryRun) {
    return `dry-run-image-${sha1}`;
  }

  const asset = await client.assets.upload('image', fs.createReadStream(imagePath), {
    filename: path.basename(imagePath),
  });

  return asset._id;
}

async function migrate() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || !process.env.NEXT_PUBLIC_SANITY_DATASET) {
    console.error('ERRO: variáveis NEXT_PUBLIC_SANITY_PROJECT_ID/NEXT_PUBLIC_SANITY_DATASET não configuradas.');
    process.exit(1);
  }

  if (!process.env.SANITY_API_TOKEN && !dryRun) {
    console.error('ERRO: SANITY_API_TOKEN não configurado.');
    process.exit(1);
  }

  const productsData = JSON.parse(fs.readFileSync(productsDataPath, 'utf8'));
  const descriptions = collectLineDescriptions(productsData);
  const lineSlugs = new Set(Object.keys(productsData));
  let productCount = 0;
  let imageCount = 0;

  for (const [catalogSlug, products] of Object.entries(productsData)) {
    for (const product of products) {
      lineSlugs.add(getLineSlug(catalogSlug, product));
    }
  }

  console.log(`${dryRun ? 'Prévia' : 'Migração'} para Sanity ${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}`);
  console.log(`Linhas: ${lineSlugs.size}`);

  for (const slug of [...lineSlugs].sort()) {
    const meta = lineMeta[slug] || { title: slug.replace(/-/g, ' ') };
    const lineDoc = {
      _id: docId('line', slug),
      _type: 'line',
      title: meta.title,
      slug: { _type: 'slug', current: slug },
      description: descriptions[slug] || '',
    };

    if (!dryRun) {
      await client.createOrReplace(lineDoc);
    }
  }

  for (const [catalogSlug, products] of Object.entries(productsData)) {
    console.log(`\n${catalogSlug}: ${products.length} produtos`);

    for (const [index, product] of products.entries()) {
      const lineSlug = getLineSlug(catalogSlug, product);
      const imagePath = path.join(rootDir, 'public', product.image.replace(/^\//, ''));
      const imageAssetId = product.image ? await uploadImageOnce(imagePath) : null;

      if (imageAssetId) {
        imageCount += 1;
      }

      const productDoc = {
        _id: docId('product', `${catalogSlug}-${product.id || product.title}`),
        _type: 'product',
        title: product.title,
        code: product.code || '',
        size: product.size || '',
        price: product.price || '',
        description: product.description || '',
        howToUse: product.howToUse || '',
        lineDescription: product.lineDescription || '',
        catalogSlug,
        sortOrder: index,
        source: 'products-json',
        line: {
          _type: 'reference',
          _ref: docId('line', lineSlug),
        },
      };

      if (imageAssetId) {
        productDoc.image = {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: imageAssetId,
          },
        };
      }

      if (!dryRun) {
        await client.createOrReplace(productDoc);
      }

      productCount += 1;
    }
  }

  console.log(`\n${dryRun ? 'Prévia concluída' : 'Migração concluída'}: ${productCount} produtos, ${imageCount} imagens referenciadas.`);
}

migrate().catch((error) => {
  console.error(error);
  process.exit(1);
});
