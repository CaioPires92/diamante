# Manutenção de novembro de 2026

Registro da limpeza de custos, segurança e código feita entre 12 e 20/11/2026.
Se algo der errado no site, comece por aqui.

## Por que foi feito

O plano Hobby da Vercel estourou o limite, principalmente por causa deste projeto
(`diamante`, domínio diamanteprofissional.com.br). A conta passou para o plano Pro e
o projeto foi otimizado e limpo.

## O que mudou, em ordem

| Data | Commit | O que mudou |
| --- | --- | --- |
| 12/11 | `a621397` | Cache dos dados da Loja Integrada e páginas estáticas com ISR. |
| 12/11 | `a621397` | Removida a rota pública `/api/loja-integrada/orders`, que expunha 1.344 pedidos. Existia desde 15/06/2026. |
| 12/11 | `fec2e38` | Imagens de `public/` recomprimidas; cache de imagem otimizada de 31 dias (`minimumCacheTTL`). |
| 12/11 | `ee1c398`, `6a8187a` | Next.js atualizado para 16.4.6 (versão fixa) e correções do `npm audit`. |
| 13/11 | `85464f3`, `894b5af` | Sanity removido: pacotes `sanity` e `next-sanity`, rota `/studio`, `src/sanity/`, `sanity.config.ts` e scripts de migração. |
| 13/11 | `86aabbc` | Removida a configuração do vitest e o script `test`: o vitest nunca foi instalado e não há testes. |
| 20/11 | `d93906a` | Removidos 7 componentes sem uso, `src/lib/constants/products-data.ts`, 59 imagens sem uso em `public/` (os logos foram mantidos) e os pacotes `react-hook-form` e `@hookform/resolvers`. |

Cada etapa foi testada em preview antes de ir para produção. Depois do deploy, a
produção foi conferida: na última etapa, 180 páginas responderam 200 e todas as
imagens usadas carregaram.

## Sanity: não existe mais

- O site deixou de ler o Sanity no commit `f6e76a3` (20/07/2026). Desde então, o
  catálogo vem da Loja Integrada e de `src/data/products.json`.
- Os projetos `xm2gnmec` (diamante) e `hfn3tjgw` (radio-hotel, que estava vazio) foram
  **apagados** do sanity.io em 13/11/2026. A conta não tem mais projetos Sanity.
- Os backups estão fora do repositório, na máquina local:
  - `/home/caio/projetos/Vercel/backups/sanity-diamante-xm2gnmec-2026-11-13.tar.gz`:
    491 documentos em `data.ndjson` e 173 imagens.
  - `/home/caio/projetos/Vercel/backups/sanity-radio-hotel-hfn3tjgw-2026-11-13.ndjson`:
    só documentos internos do Sanity.
- Não havia variáveis de ambiente do Sanity na Vercel.

## Armadilhas conhecidas

- **Não remova `@react-three/drei`.** O Knip e outras ferramentas dizem que ele não é
  usado, mas ele é dependência do `@whatisjery/react-fluid-distortion` (efeito de fluido
  do fundo, em `FluidCanvas.tsx`). Sem ele, o build quebra.
- **Página de produto quebra localmente sem as chaves da Loja Integrada.** Sem
  `LOJA_INTEGRADA_API_KEY` e `LOJA_INTEGRADA_APPLICATION_KEY` no `.env.local`, as
  páginas de linha usam o catálogo local, mas `/products/[slug]` dá erro. Isso é
  esperado e não acontece no preview nem em produção.
- **Efeito de fluido não aparece em navegador automatizado.** Ele só liga com mouse
  (`pointer: fine`), tela de 1024px ou mais e sem `prefers-reduced-motion`.
- **Os previews da Vercel são protegidos por login.** Para testar sem navegador, use
  `npx vercel curl /caminho --deployment <url-do-preview>`.
- **Não há testes automatizados.** A validação é: `npx tsc --noEmit`, `npm run build`,
  e conferir o preview.
- **Conversão do Google Ads** dispara só no envio do formulário de contato. Cliques no
  WhatsApp não são rastreados, por decisão do dono do projeto.

## Se der ruim

1. **Voltar a produção na hora:** no painel da Vercel, projeto `diamante`, aba
   Deployments, escolha um deploy de produção anterior e use "Promote to Production"
   (ou "Instant Rollback"). Pontos de retorno:
   - antes da limpeza de 20/11: deploy do commit `86aabbc`;
   - antes da remoção do Sanity: deploy do commit `6a8187a`.
2. **Desfazer no código:** `git revert <commit>` do item da tabela acima, numa branch,
   testar no preview e depois fazer merge na `main`.
3. **Imagem faltando:** todas as imagens removidas continuam no histórico do git.
   Recupere com:

   ```bash
   git checkout d93906a~1 -- public/caminho/da/imagem.png
   ```

4. **Precisa de dados antigos do Sanity:** use os backups listados acima.

## Fluxo de trabalho combinado

Mudanças vão para uma branch, geram um preview, são testadas e só vão para a `main`
(produção) com o OK do dono do projeto. Branches já incorporadas à `main` são apagadas.
