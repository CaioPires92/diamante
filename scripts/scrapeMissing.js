const fs = require('fs');
const path = require('path');
const { createClient } = require('@sanity/client');
const https = require('https');

const client = createClient({
  projectId: 'xm2gnmec',
  dataset: 'production',
  apiVersion: '2024-05-22',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN
});

const missingLinesMap = {
  'liso': '/buscar?q=liso',
  'cachos': '/buscar?q=cachos',
  'babosa': '/buscar?q=babosa',
  'sequestrante': '/buscar?q=sequestrante',
  'coloracao': '/buscar?q=coloracao',
  'lapidacao': '/buscar?q=lapidacao',
  'home-care': '/buscar?q=home+care'
};

const baseUrl = 'https://www.diamanteprofissional.com.br';

function fetchHtml(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { rejectUnauthorized: false }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

function downloadImage(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, { rejectUnauthorized: false }, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => reject(err));
    });
  });
}

async function uploadImage(imagePath) {
  try {
    const fileStream = fs.createReadStream(imagePath);
    const asset = await client.assets.upload('image', fileStream, {
      filename: path.basename(imagePath)
    });
    return asset._id;
  } catch (error) {
    console.error(`Erro ao subir imagem ${imagePath}:`, error.message);
    return null;
  }
}

async function run() {
  if (!process.env.SANITY_API_TOKEN) {
    console.error('API Token missing');
    return;
  }

  // Pegar os IDs das linhas já criadas
  const linesQuery = await client.fetch('*[_type == "line"]{ _id, "slug": slug.current }');
  const lineIds = {};
  for (const l of linesQuery) {
    lineIds[l.slug] = l._id;
  }

  for (const [slug, urlPath] of Object.entries(missingLinesMap)) {
    console.log(`\nProcurando produtos para: ${slug}`);
    try {
      const html = await fetchHtml(baseUrl + urlPath);
      
      // Regex simples para pegar os itens da listagem
      const itemRegex = /<div class="listagem-item"[^>]*>([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>/g;
      let match;
      let count = 0;
      
      const imgDir = path.join(__dirname, '..', 'public', 'images', 'products', slug);
      if (!fs.existsSync(imgDir)) {
        fs.mkdirSync(imgDir, { recursive: true });
      }

      while ((match = itemRegex.exec(html)) !== null) {
        const itemHtml = match[1];
        
        // Extrair titulo
        const titleMatch = itemHtml.match(/<a class="nome-produto"[^>]*>([^<]+)<\/a>/);
        const title = titleMatch ? titleMatch[1].trim() : null;
        
        // Extrair preço
        const priceMatch = itemHtml.match(/<strong class="preco-promocional cor-principal">([^<]+)<\/strong>/) || 
                           itemHtml.match(/<strong class="preco-venda">([^<]+)<\/strong>/);
        const price = priceMatch ? priceMatch[1].trim() : '';

        // Extrair imagem
        let imgMatch = itemHtml.match(/<img class="imagem-principal"[^>]*src="([^"]+)"/) || 
                       itemHtml.match(/<img class="imagem-principal"[^>]*data-src="([^"]+)"/) ||
                       itemHtml.match(/<img[^>]*src="([^"]+)"/);
                       
        let imgUrl = imgMatch ? imgMatch[1] : null;

        if (title && imgUrl) {
          if (imgUrl.startsWith('//')) imgUrl = 'https:' + imgUrl;
          count++;
          console.log(`  - Encontrado: ${title}`);
          
          const imgName = `prod_${count}.png`;
          const localImgPath = path.join(imgDir, imgName);
          
          await downloadImage(imgUrl, localImgPath);
          const assetId = await uploadImage(localImgPath);

          const prodDoc = {
            _type: 'product',
            title: title,
            price: price,
            line: {
              _type: 'reference',
              _ref: lineIds[slug]
            }
          };

          if (assetId) {
            prodDoc.image = {
              _type: 'image',
              asset: { _type: 'reference', _ref: assetId }
            };
          }

          await client.create(prodDoc);
          console.log(`    ✓ Produto salvo no Sanity.`);
        }
      }
      
      if (count === 0) {
        console.log(`  ! Nenhum produto encontrado na página: ${baseUrl + urlPath}`);
      }
    } catch (e) {
      console.error('Erro na linha', slug, e);
    }
  }
  
  console.log('\nFinalizado!');
}

run();
