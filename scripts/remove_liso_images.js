const fs = require('fs');
const path = require('path');
const { createClient } = require('@sanity/client');

const rootDir = path.join(__dirname, '..');
const envPath = path.join(rootDir, '.env.local');

function loadEnvLocal() {
  if (!fs.existsSync(envPath)) return;
  for (const line of fs.readFileSync(envPath, 'utf8').split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)=(.*)\s*$/);
    if (match && !process.env[match[1]]) {
      process.env[match[1]] = match[2].replace(/^["']|["']$/g, '');
    }
  }
}

loadEnvLocal();

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-05-22',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

async function run() {
  const ids = [
    'product.liso-liso-5',
    'product.liso-liso-6',
    'product.liso-liso-7',
    'product.liso-liso-8'
  ];

  console.log('Removendo imagens dos produtos Liso Perfeito em Sanity...');
  for (const id of ids) {
    try {
      await client.patch(id).unset(['image']).commit();
      console.log(`Imagem removida com sucesso de: ${id}`);
    } catch (e) {
      console.error(`Erro ao remover imagem de ${id}:`, e.message);
    }
  }
}

run().catch(console.error);
