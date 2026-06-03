'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import styles from './DistributorForm.module.css';

const distributorSchema = z.object({
  name: z.string().min(3, { message: "O nome completo deve ter no mínimo 3 caracteres." }),
  email: z.string().email({ message: "Insira um e-mail comercial válido." }),
  phone: z.string().min(10, { message: "Insira um número de WhatsApp válido." }),
  cityState: z.string().min(3, { message: "Informe sua cidade e estado (ex: Amparo/SP)." }),
  cnpj: z.string().optional(),
  alreadyDistributes: z.enum(['sim', 'nao']),
  estimatedVolume: z.string().optional(),
  message: z.string().min(10, { message: "A mensagem deve ter no mínimo 10 caracteres." }),
});

type DistributorFormData = z.infer<typeof distributorSchema>;

export function DistributorForm() {
  const [submitState, setSubmitState] = useState<'idle' | 'opened' | 'blocked'>('idle');
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<DistributorFormData>({
    resolver: zodResolver(distributorSchema),
    defaultValues: {
      alreadyDistributes: 'nao',
      estimatedVolume: '',
    }
  });

  const onSubmit = async (data: DistributorFormData) => {
    setSubmitState('idle');

    // Active commercial B2B lead redirection
    await new Promise((resolve) => setTimeout(resolve, 800));

    const alreadyDistributesText = data.alreadyDistributes === 'sim' 
      ? 'Sim, já atuo no mercado' 
      : 'Não, pretendo iniciar agora';

    const volumeText = data.estimatedVolume && data.estimatedVolume.trim() !== ''
      ? data.estimatedVolume
      : 'Não informado';

    const formattedText = `Olá, Diamante Profissional! Gostaria de me candidatar como distribuidor oficial.\n\n` +
      `• *Nome completo*: ${data.name}\n` +
      `• *E-mail*: ${data.email}\n` +
      `• *WhatsApp*: ${data.phone}\n` +
      `• *Cidade/Estado*: ${data.cityState}\n` +
      `• *CNPJ*: ${data.cnpj || 'Não informado'}\n` +
      `• *Já distribui cosméticos?*: ${alreadyDistributesText}\n` +
      `• *Volume de compra estimado*: ${volumeText}\n` +
      `• *Experiência/Mensagem*: ${data.message}`;

    const whatsappUrl = `https://wa.me/551938176156?text=${encodeURIComponent(formattedText)}`;

    if (typeof window !== 'undefined') {
      const popup = window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

      if (popup) {
        setSubmitState('opened');
        reset();
        return;
      }
    }

    setSubmitState('blocked');
  };

  return (
    <div className={styles.formContainer}>
      {submitState === 'opened' ? (
        <div className={styles.successMessage}>
          <h3>WhatsApp Aberto com Sucesso</h3>
          <p>Preenchemos a mensagem com seus dados. Agora é só concluir o envio no WhatsApp para falar com o comercial da Diamante Profissional.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.fieldGroup}>
            <div className={styles.field}>
              <label htmlFor="name">Nome Completo</label>
              <input 
                id="name" 
                type="text" 
                placeholder="Seu nome"
                {...register('name')} 
                className={errors.name ? styles.inputError : ''}
              />
              {errors.name && <span className={styles.errorText}>{errors.name.message}</span>}
            </div>

            <div className={styles.field}>
              <label htmlFor="email">E-mail Comercial</label>
              <input 
                id="email" 
                type="email" 
                placeholder="seu@emailcomercial.com"
                {...register('email')} 
                className={errors.email ? styles.inputError : ''}
              />
              {errors.email && <span className={styles.errorText}>{errors.email.message}</span>}
            </div>
          </div>

          <div className={styles.fieldGroup}>
            <div className={styles.field}>
              <label htmlFor="phone">WhatsApp / Telefone</label>
              <input 
                id="phone" 
                type="tel" 
                placeholder="(00) 99999-9999"
                {...register('phone')} 
                className={errors.phone ? styles.inputError : ''}
              />
              {errors.phone && <span className={styles.errorText}>{errors.phone.message}</span>}
            </div>

            <div className={styles.field}>
              <label htmlFor="cityState">Cidade / Estado</label>
              <input 
                id="cityState" 
                type="text" 
                placeholder="Ex: São Paulo / SP"
                {...register('cityState')} 
                className={errors.cityState ? styles.inputError : ''}
              />
              {errors.cityState && <span className={styles.errorText}>{errors.cityState.message}</span>}
            </div>
          </div>

          <div className={styles.fieldGroup}>
            <div className={styles.field}>
              <label htmlFor="cnpj">CNPJ (Opcional)</label>
              <input 
                id="cnpj" 
                type="text" 
                placeholder="00.000.000/0000-00"
                {...register('cnpj')} 
                className={errors.cnpj ? styles.inputError : ''}
              />
              {errors.cnpj && <span className={styles.errorText}>{errors.cnpj.message}</span>}
            </div>

            <div className={styles.field}>
              <label htmlFor="alreadyDistributes">Já distribui cosméticos?</label>
              <select 
                id="alreadyDistributes"
                {...register('alreadyDistributes')}
                className={errors.alreadyDistributes ? styles.inputError : ''}
              >
                <option value="sim">Sim, já atuo no mercado</option>
                <option value="nao">Não, pretendo iniciar agora</option>
              </select>
              {errors.alreadyDistributes && <span className={styles.errorText}>{errors.alreadyDistributes.message}</span>}
            </div>
          </div>

          <div className={styles.field}>
            <label htmlFor="estimatedVolume">Volume de Compra Mensal Estimado (Opcional)</label>
            <input 
              id="estimatedVolume"
              type="text"
              placeholder="Ex: R$ 10.000,00"
              {...register('estimatedVolume')}
              className={errors.estimatedVolume ? styles.inputError : ''}
            />
            {errors.estimatedVolume && <span className={styles.errorText}>{errors.estimatedVolume.message}</span>}
          </div>

          <div className={styles.field}>
            <label htmlFor="message">Mensagem / Experiência Comercial</label>
            <textarea 
              id="message" 
              rows={4}
              placeholder="Fale um pouco sobre sua atuação no mercado ou plano de negócios..."
              {...register('message')} 
              className={errors.message ? styles.inputError : ''}
            />
            {errors.message && <span className={styles.errorText}>{errors.message.message}</span>}
          </div>

          <button 
            type="submit" 
            className={styles.submitBtn}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Enviando Candidatura...' : 'Quero ser um Distribuidor'}
          </button>

          {submitState === 'blocked' && (
            <div className={styles.warningMessage}>
              <h3>Não foi possível abrir o WhatsApp automaticamente</h3>
              <p>Verifique se o navegador bloqueou a nova aba ou se o WhatsApp Web está disponível e tente novamente.</p>
            </div>
          )}
        </form>
      )}
    </div>
  );
}
