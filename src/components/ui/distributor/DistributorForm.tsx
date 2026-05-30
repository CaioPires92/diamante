'use client';

import React from 'react';
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
  estimatedVolume: z.string().min(1, { message: "Selecione o volume mensal estimado." }),
  message: z.string().min(10, { message: "A mensagem deve ter no mínimo 10 caracteres." }),
});

type DistributorFormData = z.infer<typeof distributorSchema>;

export function DistributorForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm<DistributorFormData>({
    resolver: zodResolver(distributorSchema),
    defaultValues: {
      alreadyDistributes: 'nao',
      estimatedVolume: '',
    }
  });

  const onSubmit = async (data: DistributorFormData) => {
    // Active commercial B2B lead redirection
    await new Promise((resolve) => setTimeout(resolve, 800));

    const alreadyDistributesText = data.alreadyDistributes === 'sim' 
      ? 'Sim, já atuo no mercado' 
      : 'Não, pretendo iniciar agora';

    const volumeLabels: Record<string, string> = {
      'ate-5k': 'Até R$ 5.000,00',
      '5k-15k': 'De R$ 5.000,00 a R$ 15.000,00',
      '15k-50k': 'De R$ 15.000,00 a R$ 50.000,00',
      'acima-50k': 'Acima de R$ 50.000,00',
    };
    const volumeText = volumeLabels[data.estimatedVolume] || data.estimatedVolume;

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
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    }

    reset();
  };

  return (
    <div className={styles.formContainer}>
      {isSubmitSuccessful ? (
        <div className={styles.successMessage}>
          <h3>Candidatura Enviada com Sucesso!</h3>
          <p>Agradecemos o seu interesse na Diamante Profissional. Nossa equipe comercial analisará o seu perfil e entrará em contato em breve.</p>
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
            <label htmlFor="estimatedVolume">Volume de Compra Mensal Estimado</label>
            <select 
              id="estimatedVolume"
              {...register('estimatedVolume')}
              className={errors.estimatedVolume ? styles.inputError : ''}
            >
              <option value="">Selecione uma faixa de valores</option>
              <option value="ate-5k">Até R$ 5.000,00</option>
              <option value="5k-15k">De R$ 5.000,00 a R$ 15.000,00</option>
              <option value="15k-50k">De R$ 15.000,00 a R$ 50.000,00</option>
              <option value="acima-50k">Acima de R$ 50.000,00</option>
            </select>
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
        </form>
      )}
    </div>
  );
}
