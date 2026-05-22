'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import styles from './ContactForm.module.css';

const contactSchema = z.object({
  name: z.string().min(3, { message: "O nome deve ter no mínimo 3 caracteres." }),
  email: z.string().email({ message: "Insira um e-mail válido." }),
  phone: z.string().min(10, { message: "Insira um telefone válido." }).optional(),
  subject: z.string().min(5, { message: "O assunto é obrigatório." }),
  message: z.string().min(10, { message: "A mensagem deve ter no mínimo 10 caracteres." }),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log('Form data:', data);
    reset();
  };

  return (
    <div className={styles.formContainer}>
      {isSubmitSuccessful ? (
        <div className={styles.successMessage}>
          <h3>Mensagem enviada com sucesso!</h3>
          <p>Nossa equipe entrará em contato em breve.</p>
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
              <label htmlFor="email">E-mail</label>
              <input 
                id="email" 
                type="email" 
                placeholder="seu@email.com"
                {...register('email')} 
                className={errors.email ? styles.inputError : ''}
              />
              {errors.email && <span className={styles.errorText}>{errors.email.message}</span>}
            </div>
          </div>

          <div className={styles.fieldGroup}>
            <div className={styles.field}>
              <label htmlFor="phone">Telefone (Opcional)</label>
              <input 
                id="phone" 
                type="tel" 
                placeholder="(00) 00000-0000"
                {...register('phone')} 
                className={errors.phone ? styles.inputError : ''}
              />
              {errors.phone && <span className={styles.errorText}>{errors.phone.message}</span>}
            </div>

            <div className={styles.field}>
              <label htmlFor="subject">Assunto</label>
              <input 
                id="subject" 
                type="text" 
                placeholder="Qual o motivo do contato?"
                {...register('subject')} 
                className={errors.subject ? styles.inputError : ''}
              />
              {errors.subject && <span className={styles.errorText}>{errors.subject.message}</span>}
            </div>
          </div>

          <div className={styles.field}>
            <label htmlFor="message">Mensagem</label>
            <textarea 
              id="message" 
              rows={5}
              placeholder="Escreva sua mensagem aqui..."
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
            {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
          </button>
        </form>
      )}
    </div>
  );
}
