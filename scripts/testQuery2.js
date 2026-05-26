const { createClient } = require('@sanity/client');
const client = createClient({
  projectId: 'xm2gnmec',
  dataset: 'production',
  apiVersion: '2024-05-22',
  useCdn: false
});

async function run() {
  const query = '*[_type == "product" && line->slug.current == $slug]{ title, price }';
  const res1 = await client.fetch(query, { slug: 'caviar' });
  console.log('CAVIAR:', res1.length);
  const res2 = await client.fetch(query, { slug: 'matizadores' });
  console.log('MATIZADORES:', res2.length);
  const res3 = await client.fetch(query, { slug: 'profissional' });
  console.log('PROFISSIONAL:', res3.length);
}
run();
