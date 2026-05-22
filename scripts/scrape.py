import urllib.request
import json
import os
import ssl
from bs4 import BeautifulSoup
import re

# Ignore SSL errors just in case
ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

lines_map = {
    'caviar': '/caviar-linha-hidratacao',
    'matizadores': '/linha-matizadores',
    'home-care': '/produtos-para-cabelo',
    'profissional': '/linha-profissional',
    'masculina': '/linha-masculina',
    'liso': '/pesquisa?t=liso',
    'cachos': '/pesquisa?t=cachos',
    'babosa': '/pesquisa?t=babosa',
    'sequestrante': '/pesquisa?t=sequestrante',
    'coloracao': '/pesquisa?t=coloracao',
    'lapidacao': '/pesquisa?t=lapidacao'
}

base_url = 'https://www.diamanteprofissional.com.br'
data = {}

for slug, path in lines_map.items():
    print(f"Scraping {slug}...")
    try:
        url = base_url + path
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        html = urllib.request.urlopen(req, context=ctx).read()
        soup = BeautifulSoup(html, 'html.parser')
        
        products = []
        os.makedirs(f'public/images/products/{slug}', exist_ok=True)
        
        for idx, item in enumerate(soup.find_all('div', class_='listagem-item')):
            title_el = item.find('a', class_='nome-produto')
            img_el = item.find('img', class_='imagem-principal') or item.find('img')
            price_el = item.find(class_=re.compile('preco-promocional|preco-venda|cor-principal'))
            
            if title_el and img_el:
                title = title_el.get_text(strip=True)
                img_url = img_el.get('src') or img_el.get('data-src')
                price = price_el.get_text(strip=True) if price_el else ''
                
                # Download image
                img_name = f"prod_{idx}.png"
                img_path = f"public/images/products/{slug}/{img_name}"
                if img_url:
                    if img_url.startswith('//'): img_url = 'https:' + img_url
                    try:
                        urllib.request.urlretrieve(img_url, img_path)
                        products.append({
                            'id': f"{slug}-{idx}",
                            'title': title,
                            'price': price,
                            'image': f"/images/products/{slug}/{img_name}"
                        })
                    except Exception as e:
                        print(f"Error downloading {img_url}: {e}")
        
        data[slug] = products
        print(f"Found {len(products)} products for {slug}.")
    except Exception as e:
        print(f"Failed to scrape {slug}: {e}")
        data[slug] = []

os.makedirs('src/data', exist_ok=True)
with open('src/data/products.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)
print("Finished!")
