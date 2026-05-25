import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const DISTANCES = [
  { dist: '200m',   label: 'Supermercado central' },
  { dist: '500m',   label: 'Escola municipal estadual' },
  { dist: '800m',   label: 'Hospital regional de Sapiranga' },
  { dist: '1,2km',  label: 'Shopping center Sapiranga' },
  { dist: 'Direto', label: 'Acesso RS-020' },
]

const TIMELINE = [
  { label: 'LANÇAMENTO', date: 'Jun/2025', done: true,  active: false },
  { label: 'OBRAS',      date: 'Ago/2025', done: false, active: true  },
  { label: 'ESTRUTURA',  date: '2026',     done: false, active: false },
  { label: 'ENTREGA',    date: '2027',     done: false, active: false },
]

function MapPlaceholder({ inView }) {
  return (
    <div style={{
      width: '100%', height: '100%',
      background: '#080808',
      position: 'relative',
      overflow: 'hidden',
      border: '1px solid rgba(255,255,255,0.05)',
      minHeight: 380,
    }}>
      <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0 }}>
        <defs>
          <pattern id="city-grid" x="0" y="0" width="52" height="52" patternUnits="userSpaceOnUse">
            <rect x="5" y="5" width="42" height="42" fill="#111" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#city-grid)" />
        {/* Main roads */}
        <rect x="0" y="44%" width="100%" height="7" fill="rgba(255,255,255,0.035)" />
        <rect x="47%" y="0" width="7" height="100%" fill="rgba(255,255,255,0.035)" />
        {/* Atlas block */}
        <motion.rect
          x="42%" y="39%" width="13%" height="11%"
          fill="rgba(232,93,4,0.09)"
          stroke="#E85D04" strokeWidth="1"
          initial={{ opacity: 0 }} animate={{ opacity: inView ? 1 : 0 }}
          transition={{ delay: 0.6, duration: 0.4 }}
        />
        {/* Label */}
        <motion.text
          x="48.5%" y="47%" textAnchor="middle"
          fill="rgba(232,93,4,0.7)" fontSize="8"
          fontFamily="'Courier New', monospace" letterSpacing="1"
          initial={{ opacity: 0 }} animate={{ opacity: inView ? 1 : 0 }}
          transition={{ delay: 0.9 }}>
          ATLAS
        </motion.text>
      </svg>

      {/* Pin */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: inView ? 1 : 0, scale: inView ? 1 : 0 }}
        transition={{ type: 'spring', delay: 0.8, stiffness: 320, damping: 22 }}
        style={{
          position: 'absolute', left: '50%', top: '43%',
          transform: 'translate(-50%, -100%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
        }}>
        <div style={{ width: 14, height: 14, borderRadius: '50% 50% 50% 0', background: '#E85D04', transform: 'rotate(-45deg)' }} />
        {[1, 2].map(i => (
          <motion.div key={i}
            animate={{ scale: [1, 2.8], opacity: [0.5, 0] }}
            transition={{ duration: 1.9, delay: i * 0.65, repeat: Infinity, ease: 'easeOut' }}
            style={{ position: 'absolute', width: 14, height: 14, borderRadius: '50%', border: '1px solid #E85D04', top: 0 }}
          />
        ))}
      </motion.div>

      <div style={{
        position: 'absolute', bottom: 14, right: 14,
        fontFamily: '"Courier New", monospace', fontSize: '0.56rem',
        color: 'rgba(107,107,107,0.5)', letterSpacing: '0.1em',
      }}>
        SAPIRANGA · RS · BRASIL
      </div>
    </div>
  )
}

export default function SectionLocation() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <div
      ref={ref}
      className="section-base"
      style={{
        background: '#0A0A0A',
        display: 'flex',
        paddingTop: 'var(--nav-height)',
        borderTop: '1px solid rgba(255,255,255,0.04)',
      }}
    >
      {/* Left — info */}
      <div style={{
        flex: '0 0 44%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '60px 4vw 60px 6vw',
      }}>
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: inView ? 1 : 0 }} transition={{ duration: 0.4 }}
          style={{ fontFamily: '"Courier New", monospace', fontSize: '0.62rem', color: '#E85D04', letterSpacing: '0.25em', marginBottom: 16 }}>
          05 / ENDEREÇO
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 14 }} animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 14 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{
            fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700,
            fontSize: 'clamp(1.4rem, 2.4vw, 2rem)', color: '#F2EFE9', marginBottom: 10, lineHeight: 1.2,
          }}>
          No coração da cidade.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: inView ? 1 : 0 }} transition={{ delay: 0.2, duration: 0.4 }}
          style={{ fontFamily: '"Space Grotesk", sans-serif', fontWeight: 400, fontSize: 'clamp(0.95rem, 1.4vw, 1.2rem)', color: '#D4CFC8', lineHeight: 1.65, marginBottom: 36 }}>
          Rua Adolfo Bastos, 450<br />
          <span style={{ color: '#6B6B6B', fontSize: '0.9em' }}>Centro — Sapiranga, RS</span>
        </motion.div>

        {/* Distances */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 48 }}>
          {DISTANCES.map(({ dist, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, x: -14 }} animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : -14 }}
              transition={{ duration: 0.38, delay: inView ? 0.32 + i * 0.07 : 0 }}
              style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <span style={{ color: '#E85D04', fontSize: '0.75rem', flexShrink: 0 }}>→</span>
              <span style={{ fontFamily: '"Courier New", monospace', fontSize: '0.66rem', color: '#E85D04', letterSpacing: '0.07em', minWidth: 50, flexShrink: 0 }}>
                {dist}
              </span>
              <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.82rem', color: '#8A8A8A' }}>
                {label}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: inView ? 1 : 0 }} transition={{ delay: 0.9 }}>
          <div style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300, fontSize: '0.58rem', letterSpacing: '0.22em', color: '#6B6B6B', marginBottom: 18 }}>
            CRONOGRAMA DE OBRAS
          </div>

          <div style={{ position: 'relative' }}>
            {/* Track */}
            <div style={{ position: 'absolute', top: 7, left: 0, right: 0, height: 1, background: 'rgba(255,255,255,0.07)' }} />
            <div style={{ position: 'absolute', top: 7, left: 0, width: '25%', height: 1, background: '#E85D04' }} />

            <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative' }}>
              {TIMELINE.map(({ label, date, done, active }) => (
                <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 7 }}>
                  <motion.div
                    animate={active ? { scale: [1, 1.5, 1] } : {}}
                    transition={{ duration: 1.6, repeat: Infinity }}
                    style={{
                      width: 10, height: 10, borderRadius: '50%',
                      background: done || active ? '#E85D04' : 'transparent',
                      border: `1px solid ${done || active ? '#E85D04' : 'rgba(255,255,255,0.18)'}`,
                      zIndex: 1, position: 'relative',
                    }}
                  />
                  <div style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300, fontSize: '0.5rem', letterSpacing: '0.1em', color: done || active ? '#F2EFE9' : '#6B6B6B', textAlign: 'center' }}>
                    {label}
                  </div>
                  <div style={{ fontFamily: '"Courier New", monospace', fontSize: '0.5rem', color: done || active ? '#E85D04' : '#6B6B6B' }}>
                    {date}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Right — map */}
      <div style={{ flex: 1, padding: '40px 6vw 40px 0', display: 'flex', alignItems: 'stretch' }}>
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: inView ? 1 : 0 }} transition={{ delay: 0.3, duration: 0.6 }}
          style={{ width: '100%' }}>
          <MapPlaceholder inView={inView} />
        </motion.div>
      </div>
    </div>
  )
}
