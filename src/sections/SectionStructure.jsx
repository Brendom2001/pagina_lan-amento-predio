import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import AnimatedCounter from '../components/AnimatedCounter'

const SPECS = [
  { num: 12,   label: 'PAVIMENTOS' },
  { num: 48,   label: 'UNIDADES' },
  { num: 2025, label: 'ENTREGA' },
]

const MATERIALS = ['Concreto armado', 'Vidro temperado', 'Aço inox', 'Granito nacional']

function BuildingSVG({ inView }) {
  const windows = []
  for (let f = 0; f < 12; f++) {
    for (let c = 0; c < 5; c++) {
      windows.push({ f, c, lit: (f * 5 + c) % 3 !== 0 })
    }
  }

  return (
    <svg viewBox="0 0 340 560" fill="none" style={{ width: '100%', maxHeight: '68vh' }}>
      <rect x="40" y="60" width="260" height="480" fill="#141414" stroke="#252525" strokeWidth="1" />
      <rect x="80" y="30" width="180" height="32" fill="#1C1C1C" stroke="#252525" strokeWidth="1" />
      <rect x="150" y="10" width="40" height="22" fill="#1C1C1C" stroke="#2A2A2A" strokeWidth="1" />

      {windows.map(({ f, c, lit }, i) => (
        <motion.rect
          key={i}
          x={60 + c * 46}
          y={80 + f * 36}
          width={36}
          height={24}
          fill={lit ? 'rgba(232, 93, 4, 0.22)' : '#1C1C1C'}
          stroke={lit ? 'rgba(232, 93, 4, 0.45)' : '#222'}
          strokeWidth="0.5"
          initial={{ opacity: 0 }}
          animate={{ opacity: inView ? 1 : 0 }}
          transition={{ duration: 0.28, delay: inView ? 0.3 + i * 0.012 : 0 }}
        />
      ))}

      <rect x="20" y="538" width="300" height="14" fill="#0E0E0E" opacity="0.9" />

      {/* Height line */}
      <motion.line x1="318" y1="60" x2="318" y2="538" stroke="#E85D04" strokeWidth="0.8"
        initial={{ pathLength: 0 }} animate={{ pathLength: inView ? 1 : 0 }}
        transition={{ duration: 0.9, delay: 0.5 }} />
      <motion.line x1="310" y1="60"  x2="326" y2="60"  stroke="#E85D04" strokeWidth="0.8"
        initial={{ pathLength: 0 }} animate={{ pathLength: inView ? 1 : 0 }}
        transition={{ duration: 0.25, delay: 1.2 }} />
      <motion.line x1="310" y1="538" x2="326" y2="538" stroke="#E85D04" strokeWidth="0.8"
        initial={{ pathLength: 0 }} animate={{ pathLength: inView ? 1 : 0 }}
        transition={{ duration: 0.25, delay: 1.2 }} />
      <motion.text x="330" y="302" fill="#E85D04" fontSize="9" fontFamily="'Courier New', monospace"
        initial={{ opacity: 0 }} animate={{ opacity: inView ? 1 : 0 }} transition={{ delay: 1.35 }}>
        H: 42m
      </motion.text>

      {/* Width line */}
      <motion.line x1="40" y1="553" x2="300" y2="553" stroke="#E85D04" strokeWidth="0.8"
        initial={{ pathLength: 0 }} animate={{ pathLength: inView ? 1 : 0 }}
        transition={{ duration: 0.6, delay: 0.7 }} />
      <motion.text x="150" y="566" fill="#E85D04" fontSize="9" fontFamily="'Courier New', monospace"
        textAnchor="middle"
        initial={{ opacity: 0 }} animate={{ opacity: inView ? 1 : 0 }} transition={{ delay: 1.45 }}>
        L: 18m
      </motion.text>

      {/* Pavimentos label */}
      <motion.line x1="22" y1="60" x2="22" y2="538" stroke="rgba(232,93,4,0.3)" strokeWidth="0.8" strokeDasharray="4 4"
        initial={{ pathLength: 0 }} animate={{ pathLength: inView ? 1 : 0 }} transition={{ duration: 0.8, delay: 0.6 }} />
    </svg>
  )
}

export default function SectionStructure() {
  const ref     = useRef(null)
  const inView  = useInView(ref, { once: true, amount: 0.25 })

  // Real parallax driven by scroll position relative to this section
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imageY = useTransform(scrollYProgress, [0, 1], ['-12%', '12%'])

  return (
    <div
      ref={ref}
      className="section-base"
      style={{
        background: '#0E0E0E',
        display: 'flex',
        alignItems: 'stretch',
        paddingTop: 'var(--nav-height)',
      }}
    >
      {/* Left — building + parallax */}
      <div style={{
        flex: '0 0 55%',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        padding: '40px 40px 60px',
        borderRight: '1px solid rgba(255,255,255,0.04)',
      }}>
        <motion.div
          style={{ y: imageY, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <BuildingSVG inView={inView} />
        </motion.div>
      </div>

      {/* Right — info */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '60px 6vw 60px 48px',
      }}>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : 20 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          style={{ fontFamily: '"Courier New", monospace', fontSize: '0.62rem', color: '#E85D04', letterSpacing: '0.25em', marginBottom: 20 }}
        >
          02 / ESTRUTURA
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 18 }}
          transition={{ duration: 0.55, delay: 0.28 }}
          style={{
            fontFamily: '"Space Grotesk", sans-serif',
            fontWeight: 700,
            fontSize: 'clamp(1.5rem, 2.4vw, 2.1rem)',
            color: '#F2EFE9',
            lineHeight: 1.2,
            marginBottom: 18,
          }}
        >
          Projetado para resistir ao tempo.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 12 }}
          transition={{ duration: 0.5, delay: 0.42 }}
          style={{
            fontFamily: '"DM Sans", sans-serif',
            fontSize: '0.88rem',
            color: '#6B6B6B',
            lineHeight: 1.8,
            marginBottom: 44,
            maxWidth: 380,
          }}
        >
          O Édificio Atlas nasce de uma concepção estrutural que prioriza durabilidade,
          conforto acústico e eficiência espacial. Cada pavimento foi planejado para
          maximizar a luz natural e as vistas privilegiadas da cidade.
        </motion.p>

        {/* Specs */}
        <div style={{ display: 'flex', flexDirection: 'column', marginBottom: 44 }}>
          {SPECS.map(({ num, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : 18 }}
              transition={{ duration: 0.4, delay: 0.55 + i * 0.1 }}
              style={{
                borderLeft: '2px solid #E85D04',
                paddingLeft: 18,
                paddingTop: 18,
                paddingBottom: 18,
                borderBottom: i < SPECS.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
              }}
            >
              <div style={{
                fontFamily: '"Space Grotesk", sans-serif',
                fontWeight: 700,
                fontSize: 'clamp(1.9rem, 3vw, 2.8rem)',
                color: '#F2EFE9',
                lineHeight: 1,
                marginBottom: 5,
              }}>
                <AnimatedCounter target={num} isActive={inView} duration={1.5} />
              </div>
              <div style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 300,
                fontSize: '0.6rem',
                color: '#6B6B6B',
                letterSpacing: '0.22em',
              }}>
                {label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Materials */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: inView ? 1 : 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
        >
          <div style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300, fontSize: '0.58rem', letterSpacing: '0.22em', color: '#6B6B6B', marginBottom: 12 }}>
            MATERIAIS PRINCIPAIS
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px 22px' }}>
            {MATERIALS.map((mat) => (
              <span
                key={mat}
                data-hover="true"
                style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.78rem', color: '#8A8A8A', transition: 'color 0.2s' }}
                onMouseEnter={e => e.target.style.color = '#E85D04'}
                onMouseLeave={e => e.target.style.color = '#8A8A8A'}
              >
                ◆ {mat}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
