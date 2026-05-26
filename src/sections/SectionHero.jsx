import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import TextStamp from '../components/TextStamp'
import useIsMobile from '../hooks/useIsMobile'

const T = { P2: 800, P3: 1600, P4: 2400 }

export default function SectionHero({ onNavigate }) {
  const [phase, setPhase]         = useState(0)
  const [titleDone, setTitleDone] = useState(false)
  const isMobile                  = useIsMobile()

  // Hero always plays on mount — it's the first thing the user sees
  useEffect(() => {
    setPhase(1)
    const t2 = setTimeout(() => setPhase(2), T.P2)
    const t3 = setTimeout(() => setPhase(3), T.P3)
    return () => { clearTimeout(t2); clearTimeout(t3) }
  }, [])

  return (
    <div
      className="section-base"
      style={{
        background: '#0E0E0E',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: '0 6vw',
        paddingTop: 'calc(var(--nav-height) + 48px)',
        paddingBottom: 80,
      }}
    >
      {/* Watermark "01" */}
      <AnimatePresence>
        {phase >= 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontFamily: '"Bebas Neue", cursive',
              fontSize: 'clamp(160px, 25vw, 380px)',
              color: 'rgba(255,255,255,0.022)',
              lineHeight: 1,
              userSelect: 'none',
              pointerEvents: 'none',
              zIndex: 0,
            }}
          >
            01
          </motion.div>
        )}
      </AnimatePresence>

      {/* Grid drawing from center */}
      {phase >= 1 && (
        <motion.div
          initial={{ clipPath: 'inset(50% 50% 50% 50%)' }}
          animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            zIndex: 1,
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.055) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.055) 1px, transparent 1px)
            `,
            backgroundSize: '55px 55px',
          }}
        />
      )}

      {/* Phase 3 — decorative elements */}
      {phase >= 2 && (
        <>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              top: 110,
              left: 0,
              width: '26vw',
              height: 1,
              background: '#E85D04',
              transform: 'rotate(-22deg)',
              transformOrigin: 'left center',
              zIndex: 2,
            }}
          />

          {!isMobile && <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.12 }}
            style={{
              position: 'absolute',
              top: '16%',
              right: '7vw',
              width: 'clamp(200px, 28vw, 420px)',
              height: '55vh',
              border: '1px solid rgba(232, 93, 4, 0.35)',
              zIndex: 2,
              pointerEvents: 'none',
            }}
          >
            {[
              { top: -4, left: -4 }, { top: -4, right: -4 },
              { bottom: -4, left: -4 }, { bottom: -4, right: -4 },
            ].map((pos, i) => (
              <div key={i} style={{ position: 'absolute', width: 7, height: 7, background: '#E85D04', ...pos }} />
            ))}
            {/* Blueprint label inside */}
            <div style={{
              position: 'absolute',
              top: 16,
              left: 16,
              fontFamily: '"Courier New", monospace',
              fontSize: '0.55rem',
              color: 'rgba(232,93,4,0.5)',
              letterSpacing: '0.15em',
            }}>
              RENDER / ATLAS
            </div>
          </motion.div>}

          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.22 }}
            style={{
              position: 'absolute',
              top: 'calc(var(--nav-height) + 16px)',
              left: '6vw',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 300,
              fontSize: isMobile ? '0.72rem' : '0.6rem',
              color: '#E85D04',
              letterSpacing: isMobile ? '0.18em' : '0.32em',
              zIndex: 2,
            }}
          >
            PROJ. ATLAS · EST. 2025 · UNIDADES LIMITADAS
          </motion.div>
        </>
      )}

      {/* Phase 4 — title + CTAs */}
      <div style={{ position: 'relative', zIndex: 3, maxWidth: isMobile ? '92vw' : '72vw' }}>
        {phase >= 3 && (
          <>
            <div style={{ marginBottom: 6 }}>
              <TextStamp
                text="ÉDIFICIO"
                delay={0}
                style={{
                  fontFamily: '"Space Grotesk", sans-serif',
                  fontWeight: 800,
                  fontSize: 'clamp(48px, 7.5vw, 116px)',
                  color: '#F2EFE9',
                  lineHeight: 1,
                  display: 'block',
                }}
              />
            </div>

            <div style={{ marginBottom: 32 }}>
              <TextStamp
                text="ATLAS"
                delay={0.42}
                onComplete={() => setTitleDone(true)}
                style={{
                  fontFamily: '"Bebas Neue", cursive',
                  fontSize: 'clamp(76px, 13vw, 190px)',
                  color: '#E85D04',
                  lineHeight: 0.85,
                  display: 'block',
                  letterSpacing: '0.02em',
                }}
              />
            </div>

            <AnimatePresence>
              {titleDone && (
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55 }}
                >
                  <p style={{
                    fontFamily: '"DM Sans", sans-serif',
                    fontWeight: 400,
                    fontSize: isMobile ? '1rem' : 'clamp(0.88rem, 1.3vw, 1.1rem)',
                    color: '#8A8A8A',
                    letterSpacing: '0.03em',
                    marginBottom: isMobile ? 28 : 40,
                    maxWidth: isMobile ? '100%' : 460,
                    lineHeight: 1.7,
                  }}>
                    Viver no centro. Construído para durar décadas.
                  </p>

                  <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? 10 : 14 }}>
                    <button
                      data-hover="true"
                      onClick={() => onNavigate(1)}
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 400,
                        fontSize: '0.7rem',
                        letterSpacing: '0.18em',
                        color: '#E85D04',
                        background: 'transparent',
                        border: '1px solid #E85D04',
                        padding: '14px 26px',
                        transition: 'background 0.22s',
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = 'rgba(232,93,4,0.1)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                    >
                      CONHECER O PROJETO →
                    </button>

                    <button
                      data-hover="true"
                      onClick={() => onNavigate(6)}
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 500,
                        fontSize: '0.7rem',
                        letterSpacing: '0.18em',
                        color: '#0E0E0E',
                        background: '#E85D04',
                        border: '1px solid #E85D04',
                        padding: '14px 26px',
                        transition: 'background 0.22s',
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = '#F48C06'}
                      onMouseLeave={e => e.currentTarget.style.background = '#E85D04'}
                    >
                      FALAR COM ESPECIALISTA
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </div>

      {/* GPS coordinates */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: phase >= 3 ? 1 : 0 }}
        transition={{ delay: 2.8, duration: 0.6 }}
        style={{
          position: 'absolute',
          bottom: 32,
          left: '6vw',
          fontFamily: 'Inter, sans-serif',
          fontWeight: 300,
          fontSize: '0.58rem',
          color: '#6B6B6B',
          letterSpacing: '0.22em',
          zIndex: 3,
        }}
      >
        23°32'51"S &nbsp;·&nbsp; 46°38'10"W &nbsp;·&nbsp; SAPIRANGA, RS
      </motion.div>

      {/* Scroll hint arrow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: phase >= 3 ? 0.45 : 0 }}
        transition={{ delay: 3.2, duration: 0.6 }}
        style={{
          position: 'absolute',
          bottom: 28,
          right: '6vw',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
          zIndex: 3,
        }}
      >
        <div style={{
          fontFamily: 'Inter, sans-serif',
          fontWeight: 300,
          fontSize: '0.52rem',
          color: '#6B6B6B',
          letterSpacing: '0.28em',
          writingMode: 'vertical-rl',
        }}>
          ROLAR
        </div>
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{ width: 1, height: 32, background: '#E85D04', opacity: 0.7 }}
        />
      </motion.div>
    </div>
  )
}
