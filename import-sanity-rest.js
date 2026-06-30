const fs = require('fs');
const https = require('https');

const token = "sk3rOaXCPUc3qlqDOCgshXfSuTLwNzN8r55Dy5GVaIklj2lf7nUpYFrJkl4Sq88ynxIm4M4wPf91UzCLpdEzRgWxKpYqsFtixSMpmd6mcp93W75VfKxknwAjpJqyhu5K467XfWY4MAwlyvwEIG3XQoYplyq3M2pvuoeUUi56toS1TUP9AL9z";
const projectId = "xm2gnmec";
const dataset = "production";

const file = fs.readFileSync('src/lib/constants/synced-products.json', 'utf8');
const products = JSON.parse(file);

const mutations = products.map(prod => ({
  createOrReplace: {
    _id: `produto-li-${prod.lojaIntegradaId}`,
    _type: 'product',
    title: prod.name,
    price: prod.price,
    lojaIntegradaId: prod.lojaIntegradaId,
    description: prod.description,
    source: 'Loja Integrada Sync'
  }
}));

const postData = JSON.stringify({ mutations });

const options = {
  hostname: `${projectId}.api.sanity.io`,
  port: 443,
  path: `/v2024-03-10/data/mutate/${dataset}`,
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
    'Content-Length': Buffer.byteLength(postData)
  }
};

const req = https.request(options, (res) => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => {
    console.log(`STATUS: ${res.statusCode}`);
    console.log(`Response: ${body}`);
  });
});

req.on('error', (e) => console.error(e));
req.write(postData);
req.end();
