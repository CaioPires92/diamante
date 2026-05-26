const fs = require('fs');
const path = require('path');
const { createClient } = require('@sanity/client');

// O Token será injetado via variável de ambiente quando rodarmos o script
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'xm2gnmec',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-05-22',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

const productsDataPath = path.join(__dirname, '..', 'src', 'data', 'products.json');

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

async function migrate() {
  if (!process.env.SANITY_API_TOKEN) {
    console.error('ERRO: SANITY_API_TOKEN não configurado.');
    process.exit(1);
  }

  console.log('Iniciando migração dos dados locais para o Sanity CMS...');
  const data = JSON.parse(fs.readFileSync(productsDataPath, 'utf8'));

  for (const [slug, products] of Object.entries(data)) {
    console.log(`\nProcessando linha: ${slug}`);
    
    // Nomes bonitos para as linhas
    const lineNamesMap = {
      'lapidacao': 'Lapidação',
      'coloracao': 'Coloração',
      'matizadores': 'Matizadores',
      'home-care': 'Home Care',
      'profissional': 'Profissional',
      'masculina': 'Masculina',
      'caviar': 'Caviar'
    };
    const title = lineNamesMap[slug] || slug;

    // 1. Criar a Linha no Sanity
    let lineDoc = {
      _type: 'line',
      title: title,
      slug: { _type: 'slug', current: slug }
    };
    
    const createdLine = await client.create(lineDoc);
    console.log(`✓ Linha '${title}' criada com ID: ${createdLine._id}`);

    // 2. Criar os produtos vinculados à linha
    for (const prod of products) {
      console.log(`  - Subindo imagem do produto: ${prod.title}`);
      
      const localImagePath = path.join(__dirname, '..', 'public', prod.image);
      let imageAssetId = null;
      
      if (fs.existsSync(localImagePath)) {
        imageAssetId = await uploadImage(localImagePath);
      } else {
        console.warn(`    Aviso: Imagem não encontrada localmente: ${localImagePath}`);
      }

      const prodDoc = {
        _type: 'product',
        title: prod.title,
        price: prod.price,
        line: {
          _type: 'reference',
          _ref: createdLine._id
        }
      };

      if (imageAssetId) {
        prodDoc.image = {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: imageAssetId
          }
        };
      }

      await client.create(prodDoc);
      console.log(`    ✓ Produto '${prod.title}' criado com sucesso.`);
    }
  }

  console.log('\n✨ Migração finalizada com sucesso! Todos os dados estão no Sanity.');
}

migrate().catch(console.error);
