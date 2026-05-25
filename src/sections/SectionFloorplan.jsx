import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'

const TIPOLOGIAS = [
  {
    id: 'studio', label: 'STUDIO', area: '32m²', available: 3,
    ambientes: [
      { name: 'Living / Jantar', area: '18m²' },
      { name: 'Cozinha americana', area: '7m²' },
      { name: 'Banheiro', area: '5m²' },
      { name: 'Varanda', area: '2m²' },
    ],
    rooms: [
      { name: 'LIVING',   path: 'M10,10 L145,10 L145,105 L10,105 Z',   lx: 77,  ly: 54, area: '18m²' },
      { name: 'COZINHA',  path: 'M145,10 L215,10 L215,105 L145,105 Z', lx: 180, ly: 54, area: '7m²'  },
      { name: 'WC',       path: 'M10,105 L90,105 L90,175 L10,175 Z',   lx: 50,  ly: 137,area: '5m²'  },
      { name: 'VARANDA',  path: 'M90,105 L215,105 L215,175 L90,175 Z', lx: 152, ly: 137,area: '2m²'  },
    ],
    vb: '0 0 225 185',
  },
  {
    id: '1dorm', label: '1 DORM', area: '48m²', available: 7,
    ambientes: [
      { name: 'Sala de estar', area: '16m²' },
      { name: 'Cozinha americana', area: '9m²' },
      { name: 'Dormitório', area: '12m²' },
      { name: 'Banheiro', area: '6m²' },
      { name: 'Varanda', area: '5m²' },
    ],
    rooms: [
      { name: 'SALA',    path: 'M10,10 L150,10 L150,110 L10,110 Z',    lx: 80,  ly: 57,  area: '16m²' },
      { name: 'COZINHA', path: 'M150,10 L240,10 L240,110 L150,110 Z',  lx: 195, ly: 57,  area: '9m²'  },
      { name: 'DORM.',   path: 'M10,110 L130,110 L130,195 L10,195 Z',  lx: 70,  ly: 150, area: '12m²' },
      { name: 'WC',      path: 'M130,110 L195,110 L195,195 L130,195 Z',lx: 162, ly: 150, area: '6m²'  },
      { name: 'VAR.',    path: 'M195,110 L240,110 L240,195 L195,195 Z',lx: 217, ly: 150, area: '5m²'  },
    ],
    vb: '0 0 250 205',
  },
  {
    id: '2dorm', label: '2 DORM', area: '72m²', available: 5,
    ambientes: [
      { name: 'Sala de estar', area: '20m²' },
      { name: 'Cozinha americana', area: '12m²' },
      { name: 'Suíte master', area: '18m²' },
      { name: 'Dormitório 2', area: '12m²' },
      { name: 'Banheiro', area: '5m²' },
      { name: 'Varanda', area: '5m²' },
    ],
    rooms: [
      { name: 'SALA',    path: 'M10,10 L165,10 L165,120 L10,120 Z',    lx: 87,  ly: 62,  area: '20m²' },
      { name: 'COZINHA', path: 'M165,10 L270,10 L270,120 L165,120 Z',  lx: 217, ly: 62,  area: '12m²' },
      { name: 'SUÍTE',   path: 'M10,120 L145,120 L145,215 L10,215 Z',  lx: 77,  ly: 165, area: '18m²' },
      { name: 'DORM.2',  path: 'M145,120 L225,120 L225,215 L145,215 Z',lx: 185, ly: 165, area: '12m²' },
      { name: 'WC',      path: 'M225,120 L270,120 L270,175 L225,175 Z',lx: 247, ly: 145, area: '5m²'  },
      { name: 'VAR.',    path: 'M225,175 L270,175 L270,215 L225,215 Z',lx: 247, ly: 193, area: '5m²'  },
    ],
    vb: '0 0 280 225',
  },
  {
    id: 'cobertura', label: 'COBERTURA', area: '120m²', available: 1,
    ambientes: [
      { name: 'Living amplo', area: '35m²' },
      { name: 'Cozinha gourmet', area: '18m²' },
      { name: 'Suíte master', area: '28m²' },
      { name: 'Suíte 2', area: '16m²' },
      { name: 'Terraço privativo', area: '23m²' },
    ],
    rooms: [
      { name: 'LIVING',  path: 'M10,10 L195,10 L195,130 L10,130 Z',    lx: 102, ly: 67,  area: '35m²' },
      { name: 'COZINHA', path: 'M195,10 L295,10 L295,130 L195,130 Z',  lx: 245, ly: 67,  area: '18m²' },
      { name: 'SUÍTE 1', path: 'M10,130 L165,130 L165,240 L10,240 Z',  lx: 87,  ly: 183, area: '28m²' },
      { name: 'SUÍTE 2', path: 'M165,130 L295,130 L295,210 L165,210 Z',lx: 230, ly: 167, area: '16m²' },
      { name: 'TERRAÇO', path: 'M165,210 L295,210 L295,240 L165,240 Z',lx: 230, ly: 223, area: '23m²' },
    ],
    vb: '0 0 305 250',
  },
]

function FloorplanSVG({ tip, drawing }) {
  const { rooms, vb } = tip
  const [vbW, , vbH] = vb.split(' ').slice(2).map(Number)

  return (
    <svg viewBox={vb} fill="none" style={{ width: '100%', maxHeight: '48vh' }}>
      {rooms.map((room, i) => (
        <g key={room.name}>
          <motion.path
            d={room.path}
            stroke="#E85D04"
            strokeWidth="1.2"
            fill="rgba(232, 93, 4, 0.04)"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: drawing ? 1 : 0 }}
            transition={{ duration: 0.65, delay: i * 0.13, ease: 'easeInOut' }}
          />
          <motion.text x={room.lx} y={room.ly - 3} textAnchor="middle"
            fill="rgba(242,239,233,0.65)" fontSize="7" fontFamily="'Courier New', monospace" letterSpacing="1"
            initial={{ opacity: 0 }} animate={{ opacity: drawing ? 1 : 0 }}
            transition={{ duration: 0.3, delay: i * 0.13 + 0.5 }}>
            {room.name}
          </motion.text>
          <motion.text x={room.lx} y={room.ly + 9} textAnchor="middle"
            fill="#E85D04" fontSize="7" fontFamily="'Courier New', monospace"
            initial={{ opacity: 0 }} animate={{ opacity: drawing ? 1 : 0 }}
            transition={{ duration: 0.3, delay: i * 0.13 + 0.62 }}>
            {room.area}
          </motion.text>
        </g>
      ))}
      <motion.text x="12" y={vbH - 8} fill="#6B6B6B" fontSize="8" fontFamily="'Courier New', monospace"
        initial={{ opacity: 0 }} animate={{ opacity: drawing ? 1 : 0 }} transition={{ delay: 1.1 }}>
        ↑N
      </motion.text>
      <motion.line x1={vbW - 50} y1={vbH - 10} x2={vbW - 10} y2={vbH - 10}
        stroke="#6B6B6B" strokeWidth="1"
        initial={{ pathLength: 0 }} animate={{ pathLength: drawing ? 1 : 0 }} transition={{ delay: 1.2, duration: 0.4 }} />
      <motion.text x={vbW - 30} y={vbH - 2} textAnchor="middle" fill="#6B6B6B" fontSize="6" fontFamily="'Courier New', monospace"
        initial={{ opacity: 0 }} animate={{ opacity: drawing ? 1 : 0 }} transition={{ delay: 1.4 }}>
        5m
      </motion.text>
    </svg>
  )
}

export default function SectionFloorplan() {
  const ref     = useRef(null)
  const inView  = useInView(ref, { once: true, amount: 0.2 })
  const [activeTab, setActiveTab] = useState(0)
  const tip = TIPOLOGIAS[activeTab]

  return (
    <div
      ref={ref}
      className="section-base"
      style={{
        background: '#0A0A0A',
        display: 'flex',
        flexDirection: 'column',
        paddingTop: 'var(--nav-height)',
        borderTop: '1px solid rgba(255,255,255,0.04)',
      }}
    >
      {/* Header */}
      <div style={{ padding: '48px 6vw 0' }}>
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: inView ? 1 : 0 }} transition={{ duration: 0.4 }}
          style={{ fontFamily: '"Courier New", monospace', fontSize: '0.62rem', color: '#E85D04', letterSpacing: '0.25em', marginBottom: 10 }}>
          03 / TIPOLOGIAS
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 12 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{
            fontFamily: '"Bebas Neue", cursive',
            fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)',
            color: '#F2EFE9',
            letterSpacing: '0.06em',
            lineHeight: 1,
            marginBottom: 28,
          }}>
          ESCOLHA SEU ESPAÇO
        </motion.h2>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: inView ? 1 : 0 }} transition={{ delay: 0.2 }}
          style={{ display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.07)', position: 'relative', flexWrap: 'wrap' }}>
          {TIPOLOGIAS.map((t, i) => (
            <button
              key={t.id}
              data-hover="true"
              onClick={() => setActiveTab(i)}
              style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: activeTab === i ? 500 : 300,
                fontSize: '0.66rem',
                letterSpacing: '0.15em',
                color: activeTab === i ? '#F2EFE9' : '#6B6B6B',
                background: 'none',
                border: 'none',
                padding: '10px 20px',
                position: 'relative',
                transition: 'color 0.2s',
              }}>
              {t.label} {t.area}
              {activeTab === i && (
                <motion.div
                  layoutId="tab-line"
                  style={{ position: 'absolute', bottom: -1, left: 0, right: 0, height: 2, background: '#E85D04' }}
                  transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                />
              )}
            </button>
          ))}
        </motion.div>
      </div>

      {/* Floor plan content */}
      <div style={{
        flex: 1,
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 0,
        padding: '32px 6vw 60px',
        alignItems: 'start',
      }}>
        {/* SVG Plan */}
        <AnimatePresence mode="wait">
          <motion.div
            key={tip.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            style={{
              background: '#080808',
              border: '1px solid rgba(255,255,255,0.05)',
              padding: '28px',
              position: 'relative',
              marginRight: '4vw',
            }}>
            <FloorplanSVG tip={tip} drawing={inView} />
            <div style={{
              position: 'absolute',
              top: 12, left: 14,
              fontFamily: '"Courier New", monospace',
              fontSize: '0.55rem',
              color: 'rgba(232,93,4,0.45)',
              letterSpacing: '0.1em',
            }}>
              PLANTA BAIXA — ESC. 1:75
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Room list */}
        <AnimatePresence mode="wait">
          <motion.div
            key={tip.id + '-list'}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{ paddingTop: 8 }}>
            {tip.ambientes.map((amb) => (
              <div key={amb.name} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '14px 0',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
              }}>
                <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.86rem', color: '#D4CFC8' }}>
                  {amb.name}
                </span>
                <span style={{ fontFamily: '"Courier New", monospace', fontSize: '0.72rem', color: '#6B6B6B', letterSpacing: '0.08em' }}>
                  {amb.area}
                </span>
              </div>
            ))}

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 0 0' }}>
              <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: '0.7rem', letterSpacing: '0.15em', color: '#F2EFE9' }}>
                TOTAL
              </span>
              <span style={{ fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700, fontSize: '1.1rem', color: '#E85D04' }}>
                {tip.area}
              </span>
            </div>

            {/* Availability badge */}
            <div style={{ marginTop: 28 }}>
              <motion.div
                animate={{ opacity: [1, 0.4, 1] }}
                transition={{ duration: 1.8, repeat: Infinity }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 9,
                  padding: '9px 16px',
                  border: '1px solid rgba(232,93,4,0.28)',
                  background: 'rgba(232,93,4,0.05)',
                }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#E85D04' }} />
                <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300, fontSize: '0.63rem', letterSpacing: '0.18em', color: '#E85D04' }}>
                  {tip.available} UNIDADE{tip.available !== 1 ? 'S' : ''} DISPONÍVEL{tip.available !== 1 ? 'IS' : ''}
                </span>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
