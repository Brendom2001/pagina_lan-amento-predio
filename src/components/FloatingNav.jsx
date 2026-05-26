import { motion } from 'framer-motion'
import { useState } from 'react'

export default function FloatingNav({ current, total, sections, onNavigate }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.6 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 500,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 32px',
        height: 68,
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        background: 'rgba(14, 14, 14, 0.75)',
        backdropFilter: 'blur(16px)',
      }}
    >
      {/* Logo */}
      <button
        data-hover="true"
        onClick={() => onNavigate(0)}
        style={{ background: 'none', border: 'none', display: 'flex', flexDirection: 'column', gap: 3 }}
      >
        <span style={{
          fontFamily: '"Space Grotesk", sans-serif',
          fontWeight: 700,
          fontSize: '0.88rem',
          color: '#F2EFE9',
          letterSpacing: '0.14em',
          display: 'block',
        }}>
          VÉRTICE
        </span>
        <span style={{
          fontFamily: 'Inter, sans-serif',
          fontWeight: 300,
          fontSize: '0.58rem',
          color: '#E85D04',
          letterSpacing: '0.24em',
          display: 'block',
        }}>
          EDIFÍCIO ATLAS
        </span>
      </button>

      {/* Section counter — hidden on mobile */}
      <div
        style={{
          fontFamily: '"Courier New", monospace',
          fontSize: '0.68rem',
          color: 'rgba(255,255,255,0.25)',
          letterSpacing: '0.18em',
        }}
        className="hidden-mobile"
      >
        <motion.span key={current} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {String(current + 1).padStart(2, '0')}
        </motion.span>
        {' '}/ {String(total).padStart(2, '0')}
      </div>

      {/* Right */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        {/* Desktop links */}
        <div style={{ display: 'flex', gap: 24, alignItems: 'center' }} className="hidden-mobile">
          {[
            { label: 'PLANTAS', idx: 2 },
            { label: 'LOCALIZAÇÃO', idx: 4 },
          ].map(({ label, idx }) => (
            <button
              key={label}
              data-hover="true"
              onClick={() => onNavigate(idx)}
              style={{
                background: 'none',
                border: 'none',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 300,
                fontSize: '0.62rem',
                letterSpacing: '0.18em',
                color: '#6B6B6B',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => e.target.style.color = '#F2EFE9'}
              onMouseLeave={e => e.target.style.color = '#6B6B6B'}
            >
              {label}
            </button>
          ))}
        </div>

        <button
          data-hover="true"
          onClick={() => onNavigate(6)}
          style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 500,
            fontSize: '0.66rem',
            letterSpacing: '0.18em',
            color: '#0E0E0E',
            background: '#E85D04',
            border: 'none',
            padding: '9px 20px',
            transition: 'background 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = '#F48C06'}
          onMouseLeave={e => e.currentTarget.style.background = '#E85D04'}
        >
          RESERVAR
        </button>

        {/* Hamburger */}
        <button
          data-hover="true"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
          className="show-mobile"
          style={{
            background: 'none',
            border: 'none',
            flexDirection: 'column',
            gap: 5,
            padding: 4,
          }}
          id="hamburger-btn"
        >
          {[0, 1, 2].map(i => (
            <div key={i} style={{ width: 22, height: 1.5, background: '#F2EFE9' }} />
          ))}
        </button>
      </div>

      {/* Mobile overlay */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setMenuOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(14,14,14,0.97)',
            zIndex: 490,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 32,
          }}
        >
          {sections.map(({ label }, i) => (
            <button
              key={i}
              onClick={() => { onNavigate(i); setMenuOpen(false) }}
              style={{
                fontFamily: '"Bebas Neue", cursive',
                fontSize: '2.4rem',
                color: current === i ? '#E85D04' : '#F2EFE9',
                background: 'none',
                border: 'none',
                letterSpacing: '0.1em',
                transition: 'color 0.2s',
              }}
            >
              {label}
            </button>
          ))}
        </motion.div>
      )}
    </motion.nav>
  )
}
