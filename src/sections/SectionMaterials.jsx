import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const CARDS = [
  {
    num: '01', title: 'ESTRUTURA',
    desc: 'Concreto de alta resistência fck 30 MPa com armação em aço CA-50. Fundação por estacas hélice contínua monitorada.',
    icon: (
      <svg width="30" height="30" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.2">
        <rect x="4" y="20" width="24" height="8" /><rect x="8" y="12" width="16" height="8" />
        <rect x="12" y="4" width="8" height="8" /><line x1="16" y1="4" x2="16" y2="28" />
      </svg>
    ),
  },
  {
    num: '02', title: 'ESQUADRIAS',
    desc: 'Alumínio anodizado com vidro duplo 6+6mm antiruído e película de controle solar. Selagem perfeita contra umidade.',
    icon: (
      <svg width="30" height="30" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.2">
        <rect x="3" y="3" width="26" height="26" /><line x1="16" y1="3" x2="16" y2="29" />
        <line x1="3" y1="16" x2="29" y2="16" />
        <rect x="5" y="5" width="9" height="9" opacity="0.35" fill="currentColor" />
      </svg>
    ),
  },
  {
    num: '03', title: 'ELEVADORES',
    desc: 'Dois elevadores KONE com capacidade 8 pessoas. Inox escovado, espelho e piso porcelanato. Velocidade 1,0 m/s.',
    icon: (
      <svg width="30" height="30" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.2">
        <rect x="6" y="2" width="20" height="28" /><rect x="9" y="5" width="14" height="18" />
        <polyline points="12,13 16,9 20,13" /><polyline points="12,18 16,22 20,18" />
      </svg>
    ),
  },
  {
    num: '04', title: 'SEGURANÇA',
    desc: 'Acesso biométrico em todas as entradas. CFTV com câmeras 4K, 24h monitorado. Interfone com câmera por unidade.',
    icon: (
      <svg width="30" height="30" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M16 2 L28 7 L28 16 C28 23 22 29 16 31 C10 29 4 23 4 16 L4 7 Z" />
        <polyline points="11,16 14,19 21,12" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    num: '05', title: 'SUSTENTÁVEL',
    desc: 'Captação e reuso de água pluvial para irrigação e limpeza. Placas fotovoltaicas nas áreas comuns. LED integral.',
    icon: (
      <svg width="30" height="30" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.2">
        <circle cx="16" cy="9" r="5" /><line x1="16" y1="1" x2="16" y2="4" />
        <line x1="24" y1="3" x2="21.5" y2="5.5" /><line x1="27" y1="9" x2="23" y2="9" />
        <path d="M8 20 C8 16 12 14 16 14 C20 14 24 16 24 20 L24 30 L8 30 Z" />
      </svg>
    ),
  },
  {
    num: '06', title: 'CONECTIVIDADE',
    desc: 'Dutos para fibra óptica em todas as unidades e áreas comuns. Infraestrutura pronta para home office e streaming 4K.',
    icon: (
      <svg width="30" height="30" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.2">
        <circle cx="16" cy="16" r="3" />
        <path d="M10 22 C10 19 13 17 16 17 C19 17 22 19 22 22" />
        <path d="M6 26 C6 21 10 17 16 17 C22 17 26 21 26 26" />
        <path d="M2 30 C2 23 8 17 16 17 C24 17 30 23 30 30" />
      </svg>
    ),
  },
]

export default function SectionMaterials() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.15 })
  const [hovered, setHovered] = useState(null)

  return (
    <div
      ref={ref}
      className="section-base"
      style={{
        background: '#0E0E0E',
        display: 'flex',
        flexDirection: 'column',
        padding: '0 6vw',
        paddingTop: 'calc(var(--nav-height) + 60px)',
        paddingBottom: 80,
        borderTop: '1px solid rgba(255,255,255,0.04)',
      }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: inView ? 1 : 0 }} transition={{ duration: 0.4 }}
        style={{ fontFamily: '"Courier New", monospace', fontSize: '0.62rem', color: '#E85D04', letterSpacing: '0.25em', marginBottom: 12 }}>
        04 / ACABAMENTOS
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 12 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        style={{
          fontFamily: '"Space Grotesk", sans-serif',
          fontWeight: 800,
          fontSize: 'clamp(1.8rem, 3.2vw, 3rem)',
          color: '#F2EFE9',
          lineHeight: 1.1,
          marginBottom: 56,
        }}>
        Cada detalhe tem um porquê.
      </motion.h2>

      {/* Cards grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 2,
      }}>
        {CARDS.map((card, i) => {
          const isHov = hovered === i
          return (
            <motion.div
              key={card.num}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
              transition={{ duration: 0.42, delay: inView ? 0.2 + i * 0.07 : 0 }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              data-hover="true"
              style={{
                position: 'relative',
                background: isHov ? '#1A1A1A' : '#141414',
                borderTop: isHov ? '2px solid #E85D04' : '2px solid transparent',
                border: isHov ? undefined : '1px solid #1C1C1C',
                padding: '32px 28px',
                transition: 'background 0.25s, border-color 0.25s',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                gap: 16,
                minHeight: 220,
              }}>
              {/* Ordinal bg */}
              <div style={{
                position: 'absolute',
                bottom: -12,
                right: -4,
                fontFamily: '"Bebas Neue", cursive',
                fontSize: isHov ? '6.5rem' : '3.2rem',
                color: 'rgba(232,93,4,0.07)',
                lineHeight: 1,
                transition: 'font-size 0.3s ease',
                pointerEvents: 'none',
                userSelect: 'none',
              }}>
                {card.num}
              </div>

              <div style={{ color: '#E85D04', opacity: isHov ? 1 : 0.65, transition: 'opacity 0.2s' }}>
                {card.icon}
              </div>

              <div style={{
                fontFamily: '"Space Grotesk", sans-serif',
                fontWeight: 700,
                fontSize: '0.82rem',
                color: '#F2EFE9',
                letterSpacing: '0.12em',
              }}>
                {card.title}
              </div>

              <p style={{
                fontFamily: '"DM Sans", sans-serif',
                fontSize: '0.78rem',
                color: '#6B6B6B',
                lineHeight: 1.7,
                margin: 0,
              }}>
                {card.desc}
              </p>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
