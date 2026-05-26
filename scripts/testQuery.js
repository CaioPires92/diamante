const { createClient } = require('@sanity/client');
const client = createClient({
  projectId: 'xm2gnmec',
  dataset: 'production',
  apiVersion: '2024-05-22',
  useCdn: false
});
client.fetch('*[_type == "product"]{ title, price, "line": line->slug.current }[0...5]').then(console.log);
