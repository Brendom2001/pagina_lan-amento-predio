import { motion, useScroll } from 'framer-motion'

// Top scroll progress bar + right-side section dots
export default function ProgressIndicator({ current, total, sections, onNavigate }) {
  const { scrollYProgress } = useScroll()

  return (
    <>
      {/* Top bar — fills with real scroll progress */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          zIndex: 600,
          background: 'rgba(255,255,255,0.05)',
        }}
      >
        <motion.div
          style={{
            height: '100%',
            background: '#E85D04',
            scaleX: scrollYProgress,
            transformOrigin: 'left',
          }}
        />
      </div>

      {/* Right-side section dots */}
      <div
        className="progress-dots"
        style={{
          position: 'fixed',
          right: 24,
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 400,
          display: 'flex',
          flexDirection: 'column',
          gap: 14,
          alignItems: 'flex-end',
        }}
      >
        {sections.map(({ label }, i) => {
          const isActive = i === current
          return (
            <div
              key={i}
              style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}
            >
              <div
                className="section-tooltip"
                style={{
                  position: 'absolute',
                  right: 22,
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 300,
                  fontSize: '0.56rem',
                  letterSpacing: '0.18em',
                  color: '#F2EFE9',
                  whiteSpace: 'nowrap',
                  opacity: 0,
                  transition: 'opacity 0.18s',
                  pointerEvents: 'none',
                }}
              >
                {label}
              </div>

              <button
                data-hover="true"
                onClick={() => onNavigate(i)}
                onMouseEnter={e => {
                  const tt = e.currentTarget.parentElement.querySelector('.section-tooltip')
                  if (tt) tt.style.opacity = '1'
                }}
                onMouseLeave={e => {
                  const tt = e.currentTarget.parentElement.querySelector('.section-tooltip')
                  if (tt) tt.style.opacity = '0'
                }}
                aria-label={`Ir para ${label}`}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: '5px 0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                }}
              >
                <motion.div
                  animate={{
                    width:      isActive ? 28 : 10,
                    background: isActive ? '#E85D04' : 'rgba(255,255,255,0.2)',
                    opacity:    isActive ? 1 : 0.6,
                  }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  style={{ height: 1.5, borderRadius: 2 }}
                />
              </button>
            </div>
          )
        })}
      </div>
    </>
  )
}
