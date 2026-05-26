const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'xm2gnmec',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-05-22',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

async function clearData() {
  if (!process.env.SANITY_API_TOKEN) {
    console.error('ERRO: SANITY_API_TOKEN não configurado.');
    process.exit(1);
  }

  console.log('Fetching all products and lines to delete...');
  const query = '*[_type in ["product", "line"]]';
  const docs = await client.fetch(query);
  
  console.log(`Found ${docs.length} documents. Deleting...`);
  
  const transaction = client.transaction();
  docs.forEach(doc => {
    transaction.delete(doc._id);
  });
  
  await transaction.commit();
  console.log('Sanity data cleared successfully!');
}

clearData().catch(console.error);
