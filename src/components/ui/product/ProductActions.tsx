'use client';

import React, { useState } from 'react';
import styles from './ProductActions.module.css';

type ShippingOption = {
  name?: string;
  price?: number;
  deliveryTime?: string;
  msgErro?: string | null;
};

interface ProductActionsProps {
  lojaIntegradaId?: string;
  price?: string;
  productTitle: string;
  available?: boolean;
  quantityAvailable?: number;
}

export function ProductActions({
  lojaIntegradaId,
  price,
  productTitle,
  available = true,
  quantityAvailable,
}: ProductActionsProps) {
  const [quantity, setQuantity] = useState(1);
  const [cep, setCep] = useState('');
  const [shippingOptions, setShippingOptions] = useState<ShippingOption[]>([]);
  const [shippingError, setShippingError] = useState('');
  const [isCalculatingShipping, setIsCalculatingShipping] = useState(false);

  const handleDecrease = () => setQuantity(q => Math.max(1, q - 1));
  const handleIncrease = () => setQuantity(q => q + 1);

  const displayPrice = price || 'R$ 0,00'; // Replace with real logic later if fetched

  const cartUrl = lojaIntegradaId
    ? `https://www.diamanteprofissional.com.br/carrinho/produto/${lojaIntegradaId}/adicionar?quantidade=${quantity}`
    : `https://www.diamanteprofissional.com.br/buscar?q=${encodeURIComponent(productTitle)}`;

  const handleCepChange = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 8);

    if (digits.length <= 5) {
      setCep(digits);
      return;
    }

    setCep(`${digits.slice(0, 5)}-${digits.slice(5)}`);
  };

  const formatShippingPrice = (shippingPrice?: number) => {
    if (typeof shippingPrice !== 'number') {
      return 'A consultar';
    }

    return shippingPrice.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  const handleCalculateShipping = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!lojaIntegradaId) {
      setShippingError('Frete indisponivel para este produto.');
      setShippingOptions([]);
      return;
    }

    const normalizedCep = cep.replace(/\D/g, '');

    if (normalizedCep.length !== 8) {
      setShippingError('Informe um CEP valido com 8 digitos.');
      setShippingOptions([]);
      return;
    }

    setIsCalculatingShipping(true);
    setShippingError('');

    try {
      const response = await fetch(
        `/api/loja-integrada/shipping?cep=${normalizedCep}&productId=${lojaIntegradaId}&quantity=${quantity}`,
      );
      const data = (await response.json()) as ShippingOption[] | { error?: string };

      if (!response.ok || !Array.isArray(data)) {
        const message = 'error' in data && data.error ? data.error : 'Nao foi possivel calcular o frete.';
        throw new Error(message);
      }

      const validOptions = data.filter(option => option.name || option.msgErro);

      if (!validOptions.length) {
        setShippingError('Nao foram encontradas formas de envio para o CEP informado.');
        setShippingOptions([]);
        return;
      }

      setShippingOptions(validOptions);
    } catch (error) {
      setShippingOptions([]);
      setShippingError(
        error instanceof Error ? error.message : 'Nao foi possivel calcular o frete.',
      );
    } finally {
      setIsCalculatingShipping(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.priceContainer}>
        <span className={styles.price}>{displayPrice}</span>
        <span className={styles.installments}>até <strong>3x</strong> de <strong>R$ {((parseFloat(displayPrice.replace('R$', '').replace(',', '.')) || 0) / 3).toFixed(2).replace('.', ',')}</strong> sem juros</span>
      </div>

      <div className={styles.buySection}>
        <div className={styles.quantityContainer}>
          <button onClick={handleDecrease} className={styles.qtyBtn}>-</button>
          <span className={styles.qtyValue}>{quantity}</span>
          <button onClick={handleIncrease} className={styles.qtyBtn}>+</button>
        </div>
        
        {lojaIntegradaId && available ? (
          <a 
            href={cartUrl} 
            className={styles.buyBtn}
            target="_blank"
            rel="noopener noreferrer"
          >
            COMPRAR
          </a>
        ) : (
          <a
            href={`https://wa.me/551938176156?text=${encodeURIComponent(`Olá! Quero consultar a disponibilidade do produto ${productTitle}.`)}`}
            className={styles.buyBtn}
            target="_blank"
            rel="noopener noreferrer"
            style={{ background: '#8F857D', boxShadow: 'none' }}
          >
            CONSULTAR
          </a>
        )}
      </div>

      <p className={styles.stock}>
        {available
          ? `Estoque: ${typeof quantityAvailable === 'number' ? quantityAvailable : 'Disponível'}`
          : 'Estoque: indisponível no momento'}
      </p>

      <div className={styles.shippingSection}>
        <span className={styles.shippingLabel}>Calcule o frete</span>
        <form className={styles.shippingInputGroup} onSubmit={handleCalculateShipping}>
          <input
            type="tel"
            inputMode="numeric"
            autoComplete="postal-code"
            placeholder="CEP"
            className={styles.shippingInput}
            value={cep}
            onChange={event => handleCepChange(event.target.value)}
          />
          <button
            type="submit"
            className={styles.shippingBtn}
            disabled={isCalculatingShipping || !lojaIntegradaId}
          >
            {isCalculatingShipping ? '...' : 'OK'}
          </button>
        </form>

        {shippingError ? (
          <div className={styles.shippingResults}>
            <div className={styles.shippingRow}>{shippingError}</div>
          </div>
        ) : null}

        {!shippingError && shippingOptions.length > 0 ? (
          <div className={styles.shippingResults}>
            {shippingOptions.map(option => (
              <div
                key={`${option.name || 'shipping'}-${option.deliveryTime || '0'}-${option.price || 0}`}
                className={styles.shippingRow}
              >
                <div>
                  <div className={styles.shippingType}>{option.name || 'Entrega'}</div>
                  <div>
                    {option.deliveryTime
                      ? `${option.deliveryTime} dia${option.deliveryTime === '1' ? '' : 's'} uteis`
                      : 'Prazo indisponivel'}
                  </div>
                  {option.msgErro ? <div>{option.msgErro}</div> : null}
                </div>
                <div className={styles.shippingPrice}>{formatShippingPrice(option.price)}</div>
              </div>
            ))}
          </div>
        ) : null}
      </div>

      <div className={styles.secondaryActions}>
        <button className={styles.wishlistBtn}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
          LISTA DE DESEJOS
        </button>
        <button className={styles.paymentBtn}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="5" width="20" height="14" rx="2"></rect>
            <line x1="2" y1="10" x2="22" y2="10"></line>
          </svg>
          Formas de pagamento
        </button>
      </div>
    </div>
  );
}
