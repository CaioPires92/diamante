const { createClient } = require('@sanity/client');
const client = createClient({
  projectId: 'xm2gnmec',
  dataset: 'production',
  apiVersion: '2024-05-22',
  useCdn: false
});

async function run() {
  const query = '*[_type == "product" && (line->slug.current == "liso-perfeito" || catalogSlug == "liso-perfeito")]{ _id, title, code, size, price, "lineSlug": line->slug.current, catalogSlug, "image": image.asset->url }';
  const res = await client.fetch(query);
  console.log('Found products count:', res.length);
  console.log(JSON.stringify(res, null, 2));
}
run();
