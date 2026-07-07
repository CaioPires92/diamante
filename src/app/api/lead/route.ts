import { NextResponse } from 'next/server';
import { z } from 'zod';

const leadSchema = z.object({
  name: z.string().trim().min(2),
  whatsapp: z.string().trim().min(8),
  email: z.string().trim().email(),
  brand: z.string().trim().optional().default(''),
  message: z.string().trim().min(10),
});

const receiverEmail = process.env.LEAD_RECEIVER_EMAIL || 'contato@diamanteprofissional.com.br';
const senderEmail = process.env.LEAD_SENDER_EMAIL || 'onboarding@resend.dev';
const resendApiKey = process.env.RESEND_API_KEY;

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export async function POST(request: Request) {
  if (!resendApiKey) {
    return NextResponse.json(
      { error: 'Defina RESEND_API_KEY no ambiente para habilitar o envio de leads.' },
      { status: 500 },
    );
  }

  try {
    const json = await request.json();
    const lead = leadSchema.parse(json);

    const text = [
      'Novo lead - Quero Criar Minha Marca de Cosméticos',
      '',
      `Nome: ${lead.name}`,
      `WhatsApp: ${lead.whatsapp}`,
      `E-mail: ${lead.email}`,
      `Marca/Projeto: ${lead.brand || 'Nao informado'}`,
      '',
      'Ideia:',
      lead.message,
    ].join('\n');

    const html = `
      <div style="font-family: Arial, sans-serif; color: #2f231b; line-height: 1.6;">
        <h2 style="margin-bottom: 16px;">Novo lead - Quero Criar Minha Marca de Cosméticos</h2>
        <p><strong>Nome:</strong> ${escapeHtml(lead.name)}</p>
        <p><strong>WhatsApp:</strong> ${escapeHtml(lead.whatsapp)}</p>
        <p><strong>E-mail:</strong> ${escapeHtml(lead.email)}</p>
        <p><strong>Marca/Projeto:</strong> ${escapeHtml(lead.brand || 'Nao informado')}</p>
        <p><strong>Ideia:</strong></p>
        <p>${escapeHtml(lead.message).replace(/\n/g, '<br />')}</p>
      </div>
    `;

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      signal: AbortSignal.timeout(15000),
      body: JSON.stringify({
        from: senderEmail,
        to: [receiverEmail],
        reply_to: lead.email,
        subject: 'Novo lead - Quero Criar Minha Marca de Cosméticos',
        text,
        html,
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();

      try {
        const resendError = JSON.parse(errorBody) as {
          name?: string;
          message?: string;
        };

        if (
          resendError.name === 'validation_error' &&
          resendError.message?.includes('You can only send testing emails to your own email address')
        ) {
          return NextResponse.json(
            {
              error:
                'A Resend ainda esta em modo de teste. Nesse modo, voce so pode enviar para o seu proprio e-mail cadastrado na Resend. Para enviar para contato@diamanteprofissional.com.br, verifique um dominio na Resend e troque LEAD_SENDER_EMAIL para um remetente desse dominio, como leads@diamanteprofissional.com.br.',
            },
            { status: 502 },
          );
        }
      } catch {
        // Keep generic fallback below when the provider response is not JSON.
      }

      return NextResponse.json(
        { error: `Falha ao enviar lead: ${errorBody}` },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Dados invalidos no formulario.', details: error.flatten() },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Erro inesperado ao enviar lead.' },
      { status: 500 },
    );
  }
}
