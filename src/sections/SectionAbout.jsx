import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import AnimatedCounter from '../components/AnimatedCounter'
import useIsMobile from '../hooks/useIsMobile'

const OBRAS = [
  { name: 'Residencial Canto Verde', year: '2021', pavs: '8 pav.' },
  { name: 'Torres do Ipê',           year: '2022', pavs: '10 pav.' },
  { name: 'Condomínio Horizonte',    year: '2023', pavs: '14 pav.' },
]

const METRICS = [
  { num: 47,   suffix: '',  label: 'Obras entregues' },
  { num: 1200, suffix: '+', label: 'Famílias atendidas' },
  { num: 0,    suffix: '',  label: 'Obras com atraso' },
  { num: 15,   suffix: '',  label: 'Anos de mercado' },
]

function ObraCard({ obra, inView, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 14 }}
      transition={{ duration: 0.42, delay }}
      style={{ background: '#141414', border: '1px solid #1E1E1E', overflow: 'hidden' }}>
      {/* Placeholder render */}
      <div style={{ width: '100%', paddingBottom: '58%', background: '#1A1A1A', position: 'relative' }}>
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} viewBox="0 0 120 80" fill="none">
          <rect x="18" y="12" width="84" height="68" fill="#111" />
          <rect x="28" y="4" width="64" height="10" fill="#0E0E0E" />
          {[0,1,2,3,4].map(row => [0,1,2,3].map(col => (
            <rect key={`${row}-${col}`} x={26 + col * 17} y={16 + row * 11} width={12} height={7}
              fill={((row + col) % 3 === 0) ? 'rgba(232,93,4,0.18)' : '#1A1A1A'} />
          )))}
        </svg>
      </div>
      <div style={{ padding: '10px 14px 14px' }}>
        <div style={{ fontFamily: '"Space Grotesk", sans-serif', fontWeight: 500, fontSize: '0.72rem', color: '#D4CFC8', marginBottom: 5 }}>
          {obra.name}
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <span style={{ fontFamily: '"Courier New", monospace', fontSize: '0.58rem', color: '#E85D04' }}>{obra.year}</span>
          <span style={{ fontFamily: '"Courier New", monospace', fontSize: '0.58rem', color: '#6B6B6B' }}>{obra.pavs}</span>
        </div>
      </div>
    </motion.div>
  )
}

export default function SectionAbout() {
  const ref      = useRef(null)
  const inView   = useInView(ref, { once: true, amount: 0.2 })
  const isMobile = useIsMobile()

  return (
    <div
      ref={ref}
      className="section-base"
      style={{
        background: '#0E0E0E',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        paddingTop: 'var(--nav-height)',
        borderTop: '1px solid rgba(255,255,255,0.04)',
      }}
    >
      {/* Left */}
      <div style={{
        flex: isMobile ? 'none' : '0 0 52%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: isMobile ? '40px 6vw 32px' : '60px 4vw 60px 6vw',
        borderRight: isMobile ? 'none' : '1px solid #E85D04',
        borderBottom: isMobile ? '1px solid rgba(232,93,4,0.3)' : 'none',
      }}>
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: inView ? 1 : 0 }} transition={{ duration: 0.4 }}
          style={{ fontFamily: '"Courier New", monospace', fontSize: '0.62rem', color: '#E85D04', letterSpacing: '0.25em', marginBottom: 18 }}>
          06 / VÉRTICE CONSTRUTORA
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 14 }} animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 14 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{
            fontFamily: '"Bebas Neue", cursive',
            fontSize: 'clamp(1.8rem, 3.6vw, 3.2rem)',
            color: '#F2EFE9',
            letterSpacing: '0.05em',
            lineHeight: 1.05,
            marginBottom: 22,
          }}>
          15 ANOS CONSTRUINDO REFERÊNCIAS
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: inView ? 1 : 0 }} transition={{ delay: 0.25, duration: 0.5 }}
          style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.88rem', color: '#6B6B6B', lineHeight: 1.8, marginBottom: 40, maxWidth: 420 }}>
          A Vértice Construtora nasceu com uma premissa simples: entregar o que prometemos,
          no prazo combinado, com o acabamento que o cliente merece. Desde 2010, construímos
          mais de 47 empreendimentos no RS sem registrar um único atraso. Esse é nosso legado.
          E o Édificio Atlas é a nossa maior obra.
        </motion.p>

        {/* Obras */}
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: 12, marginBottom: 36 }}>
          {OBRAS.map((obra, i) => (
            <ObraCard key={obra.name} obra={obra} inView={inView} delay={0.38 + i * 0.09} />
          ))}
        </div>

        {/* Assinatura técnica */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: inView ? 1 : 0 }} transition={{ delay: 0.75 }}
          style={{ paddingTop: 20, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ fontFamily: '"Courier New", monospace', fontSize: '0.65rem', color: '#D4CFC8', letterSpacing: '0.07em', marginBottom: 4 }}>
            Eng. Ricardo Almada Vértice
          </div>
          <div style={{ fontFamily: '"Courier New", monospace', fontSize: '0.57rem', color: '#6B6B6B', letterSpacing: '0.07em' }}>
            CREA-RS 123.456-7 · Responsável Técnico
          </div>
        </motion.div>
      </div>

      {/* Right — metrics */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: isMobile ? '32px 6vw 48px' : '60px 6vw 60px 5vw',
      }}>
        {METRICS.map(({ num, suffix, label }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : 20 }}
            transition={{ duration: 0.42, delay: inView ? 0.3 + i * 0.1 : 0 }}
            style={{
              padding: '28px 0',
              borderBottom: i < METRICS.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
            }}>
            <div style={{
              fontFamily: '"Bebas Neue", cursive',
              fontSize: 'clamp(2.8rem, 5.5vw, 5rem)',
              color: num === 0 ? '#E85D04' : '#F2EFE9',
              lineHeight: 0.9,
              letterSpacing: '0.02em',
            }}>
              <AnimatedCounter target={num} suffix={suffix} isActive={inView} duration={1.8} />
            </div>
            <div style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300, fontSize: '0.67rem', color: '#6B6B6B', letterSpacing: '0.22em', marginTop: 9, textTransform: 'uppercase' }}>
              {label}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
