import { NextRequest, NextResponse } from 'next/server';

import { getCatalogProducts, getLineProducts } from '@/lib/loja-integrada-catalog';

export async function GET(request: NextRequest) {
  try {
    const line = request.nextUrl.searchParams.get('line');
    const products = line ? await getLineProducts(line) : await getCatalogProducts();

    return NextResponse.json({
      objects: products,
      total: products.length,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Falha ao buscar produtos na Loja Integrada.';

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
