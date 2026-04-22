# Diamante Profissional — Premium Web Experience

Este é o repositório da plataforma digital da **Diamante Profissional**, focada em cosméticos capilares de alta performance. O projeto foi desenvolvido com uma estética "Clean Luxury", priorizando performance, elegância e micro-interações fluidas.

## 💎 Premium Visual Stack

O projeto utiliza tecnologias de ponta para entregar uma experiência de usuário de nível editorial:

### 1. Sistema de Animação (GSAP)
Utilizamos o **GSAP (GreenSock Animation Platform)** para todas as interações dinâmicas:
- **Header Shimmer**: Efeito de brilho metálico contínuo na borda inferior da Navbar.
- **Hero Light Sweep**: Um feixe de luz global que percorre a seção Hero a cada 8 segundos, simulando reflexos de iluminação de estúdio.
- **Micro-interações de Botão**: Efeitos de escala e "shimmer" interno nos CTAs para feedback tátil premium.
- **Staggered Entrance**: Carregamento progressivo dos elementos da página para um reveal suave.

### 2. Smooth Scrolling (Lenis)
Implementamos o **Lenis Scroll** para substituir a rolagem padrão do navegador por uma navegação com inércia:
- **Duração**: 1.5s para um movimento "sedoso".
- **Física**: Curva de easing customizada para evitar paradas bruscas.
- **Performance**: Baixo consumo de CPU, mantendo 60fps constantes.

### 3. Design System "Clean Luxury"
- **Glassmorphism**: Header fixo com alta transparência (`opacity: 0.02`), `backdrop-filter: blur(4px)` e bordas douradas translúcidas.
- **Tipografia Editorial**: Uso de *Playfair Display* para títulos e *Inter* para corpo de texto, garantindo legibilidade e sofisticação.
- **Paleta Champagne**: Cores baseadas em tons de dourado suave, off-white e preto profundo.

---

## 🚀 Como Iniciar

### Pré-requisitos
- Node.js 20+
- npm ou pnpm

### Instalação
```bash
npm install
```

### Desenvolvimento
```bash
npm run dev
```

## 🌍 Internacionalização (i18n)
O projeto utiliza `next-intl` para suporte multi-idioma:
- **Português (pt-BR)**
- **Inglês (en)**
- **Espanhol (es)**

Os arquivos de tradução estão localizados em `src/i18n/messages/`.

---
*Diamante Profissional — Onde a ciência encontra a sofisticação.*
