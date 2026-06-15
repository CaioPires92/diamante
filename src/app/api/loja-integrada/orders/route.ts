import { NextRequest, NextResponse } from 'next/server';

import {
  lojaIntegradaFetch,
  sanitizeLojaIntegradaSearchParams,
} from '@/lib/loja-integrada';

export async function GET(request: NextRequest) {
  try {
    const searchParams = sanitizeLojaIntegradaSearchParams(request.nextUrl.searchParams);
    const data = await lojaIntegradaFetch('/v1/pedido/search/', { searchParams });

    return NextResponse.json(data);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Falha ao buscar pedidos na Loja Integrada.';

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
