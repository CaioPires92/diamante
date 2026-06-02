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
  const query = '*[_type == "product"]{ _id, title, "lineSlug": line->slug.current }';
  const res = await client.fetch(query);
  console.log('Total products in Sanity (with token):', res.length);
  // Filtrar os que começam com "product."
  const migrated = res.filter(p => p._id.startsWith('product.'));
  console.log('Total migrated products (starting with product.):', migrated.length);
  if (migrated.length > 0) {
    console.log('First 5 migrated products:', JSON.stringify(migrated.slice(0, 5), null, 2));
  }
}
run();
