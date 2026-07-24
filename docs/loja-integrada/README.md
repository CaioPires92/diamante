# Loja Integrada — carrinho e checkout

Esta pasta preserva as fontes atuais publicadas no painel da Loja Integrada da
Diamante Profissional.

## Arquivos

- `checkout-diamante-script.html`: comportamento do carrinho e checkout,
  incluindo navbar, footer, atualização assíncrona de quantidade e isolamento
  do CSS global da loja.
- `checkout-diamante-shell.css`: cores da Diamante e estilos exclusivos da
  navbar, footer e controles necessários do carrinho. O conteúdo principal do
  checkout utiliza o layout nativo da Loja Integrada.

## Onde são aplicados

No painel da Loja Integrada:

1. Acesse **Configurações → Incluir código HTML**.
2. Edite o código **Checkout Diamante 2026** (`ID 1694490`).
3. O conteúdo publicado é composto pelo CSS de
   `checkout-diamante-shell.css`, dentro de uma tag `<style>`, seguido pelo
   conteúdo de `checkout-diamante-script.html`.

O painel limita o código HTML a 15.000 caracteres. Por isso, a versão publicada
é minificada, enquanto estes arquivos permanecem legíveis como fonte oficial.

## Comportamento preservado

- Navbar e footer personalizados.
- Preloader desativado no carrinho e checkout.
- Formulários e organização nativos da Loja Integrada.
- Cores alinhadas à identidade visual da Diamante.
- Quantidade atualizada sem recarregar a página.
- Recarregamento de segurança caso a plataforma rejeite uma atualização.

## Campos obrigatórios

A obrigatoriedade é controlada pela Loja Integrada:

- Pessoa física: e-mail, nome completo, CPF, celular e CEP.
- Pessoa jurídica: e-mail, nome completo, CNPJ, razão social, celular e CEP.
- Telefone fixo e inscrição estadual não são obrigatórios.
