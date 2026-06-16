import { NextRequest, NextResponse } from 'next/server';

const LOJA_INTEGRADA_STOREFRONT_URL =
  process.env.LOJA_INTEGRADA_STOREFRONT_URL || 'https://www.diamanteprofissional.com.br';

type LojaIntegradaShippingOption = {
  name?: string;
  price?: number;
  deliveryTime?: string;
  msgErro?: string | null;
};

export async function GET(request: NextRequest) {
  try {
    const cep = request.nextUrl.searchParams.get('cep')?.replace(/\D/g, '') || '';
    const productId = request.nextUrl.searchParams.get('productId')?.trim() || '';
    const quantityParam = request.nextUrl.searchParams.get('quantity')?.trim() || '1';
    const quantity = Number.parseInt(quantityParam, 10);

    if (cep.length !== 8) {
      return NextResponse.json({ error: 'Informe um CEP valido com 8 digitos.' }, { status: 400 });
    }

    if (!productId) {
      return NextResponse.json({ error: 'Produto invalido para calcular frete.' }, { status: 400 });
    }

    if (!Number.isFinite(quantity) || quantity < 1) {
      return NextResponse.json({ error: 'Quantidade invalida para calcular frete.' }, { status: 400 });
    }

    const searchParams = new URLSearchParams({
      cep,
      produto_id: productId,
      quantidade: String(quantity),
    });

    const response = await fetch(
      `${LOJA_INTEGRADA_STOREFRONT_URL}/carrinho/frete?${searchParams.toString()}`,
      {
        headers: {
          Accept: 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
        cache: 'no-store',
      },
    );

    if (!response.ok) {
      const body = await response.text();
      throw new Error(`Loja Integrada ${response.status}: ${body}`);
    }

    const data = (await response.json()) as LojaIntegradaShippingOption[] | { error?: string };

    return NextResponse.json(data);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Falha ao calcular frete na Loja Integrada.';

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
