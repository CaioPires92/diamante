'use client';

import React, { useState } from 'react';
import styles from './ProductActions.module.css';

interface ProductActionsProps {
  lojaIntegradaId?: string;
  price?: string;
  productTitle: string;
}

export function ProductActions({ lojaIntegradaId, price, productTitle }: ProductActionsProps) {
  const [quantity, setQuantity] = useState(1);
  const [cep, setCep] = useState('');
  const [shippingResult, setShippingResult] = useState<{ type: string; price: string; days: number }[] | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleDecrease = () => setQuantity(q => Math.max(1, q - 1));
  const handleIncrease = () => setQuantity(q => q + 1);

  const displayPrice = price || 'R$ 0,00'; // Replace with real logic later if fetched

  const cartUrl = lojaIntegradaId 
    ? `https://www.diamanteprofissional.com.br/carrinho/produto/${lojaIntegradaId}/adicionar?quantidade=${quantity}`
    : `https://www.diamanteprofissional.com.br/buscar?q=${encodeURIComponent(productTitle)}`;

  const handleCalculateShipping = async () => {
    if (!cep || cep.length < 8) return;
    setIsCalculating(true);
    
    // Simulate API call for now or call real endpoint
    setTimeout(() => {
      setShippingResult([
        { type: 'PAC', price: 'R$ 15,30', days: 7 },
        { type: 'SEDEX', price: 'R$ 28,50', days: 3 }
      ]);
      setIsCalculating(false);
    }, 1500);
  };

  return (
    <div className={styles.container}>
      <div className={styles.priceContainer}>
        <span className={styles.price}>{displayPrice}</span>
        <span className={styles.installments}>até <strong>3x</strong> de <strong>R$ {((parseFloat(displayPrice.replace('R$', '').replace(',', '.')) || 0) / 3).toFixed(2).replace('.', ',')}</strong> sem juros</span>
      </div>

      <div className={styles.buySection}>
        <div className={styles.quantitySelector}>
          <button onClick={handleDecrease} className={styles.qtyBtn}>-</button>
          <input type="number" value={quantity} readOnly className={styles.qtyInput} />
          <button onClick={handleIncrease} className={styles.qtyBtn}>+</button>
        </div>
        <a href={cartUrl} target="_blank" rel="noopener noreferrer" className={styles.buyBtn}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
            <path d="M3 6h18"></path>
            <path d="M16 10a4 4 0 0 1-8 0"></path>
          </svg>
          COMPRAR
        </a>
      </div>

      <p className={styles.stock}>Estoque: Disponível</p>

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

      <div className={styles.shippingSection}>
        <label className={styles.shippingLabel}>CALCULE O FRETE</label>
        <div className={styles.shippingInputGroup}>
          <input 
            type="text" 
            placeholder="CEP" 
            value={cep}
            onChange={(e) => setCep(e.target.value.replace(/\D/g, '').substring(0, 8))}
            className={styles.shippingInput}
          />
          <button onClick={handleCalculateShipping} disabled={isCalculating || cep.length < 8} className={styles.shippingBtn}>
            {isCalculating ? 'Calculando...' : 'CALCULAR'}
          </button>
        </div>
        
        {shippingResult && (
          <div className={styles.shippingResults}>
            {shippingResult.map((res, i) => (
              <div key={i} className={styles.shippingRow}>
                <span className={styles.shippingType}>{res.type}</span>
                <span className={styles.shippingDays}>{res.days} dias úteis</span>
                <span className={styles.shippingPrice}>{res.price}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
