# Projeto: Edifício Atlas

## Cliente / Contexto
Landing page de lançamento imobiliário para um edifício.
Público-alvo: compradores de imóveis, investidores.

## Stack
React + TailwindCSS + Framer Motion + Vite
Deploy: Vercel via GitHub (--legacy-peer-deps obrigatório)

## Padrões de Animação
- ScrollReveal: useInView, threshold 0.2
- Stagger universal: delay 0.2 + i * 0.08
- Spring: stiffness 280, damping 28
- Easing cinemático: [0.76, 0, 0.24, 1]

## Estilo Visual
Premium, sofisticado, transmite exclusividade e confiança.
Sem animações chamativas demais — movimento elegante e contido.

## Seções do Projeto
(preenche aqui conforme o projeto tiver: Hero, Diferenciais,
Planta, Localização, CTA, etc.)

## Regras
- Mobile-first obrigatório
- Sempre usar --legacy-peer-deps no npm install
- Não quebrar o build antes de commitar