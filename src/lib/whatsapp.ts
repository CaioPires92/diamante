export const WHATSAPP_PHONE = '551938176226';
export const WHATSAPP_CHOICE_EVENT = 'diamante:open-whatsapp-choice';

export function buildWhatsAppUrl(message: string, phone = WHATSAPP_PHONE) {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export function requestWhatsAppChoice(url: string) {
  if (typeof window === 'undefined') {
    return;
  }

  const event = new CustomEvent<{ url: string }>(WHATSAPP_CHOICE_EVENT, {
    detail: { url },
    cancelable: true,
  });

  const shouldFallback = window.dispatchEvent(event);

  if (shouldFallback) {
    window.open(url, '_blank', 'noopener,noreferrer');
  }
}
