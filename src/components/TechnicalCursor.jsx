import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Crosshair cursor + CAD coordinate display
export default function TechnicalCursor() {
  const pos     = useRef({ x: 0, y: 0 })
  const dotRef  = useRef(null)
  const rafRef  = useRef(null)
  const [coords, setCoords]   = useState({ x: 0, y: 0 })
  const [hovering, setHovering] = useState(false)
  const [visible, setVisible]  = useState(false)

  useEffect(() => {
    // Only on desktop
    if (window.matchMedia('(max-width: 768px)').matches) return

    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY }
      if (!visible) setVisible(true)
    }

    const onEnter = (e) => {
      const el = e.target
      if (
        el.tagName === 'BUTTON' ||
        el.tagName === 'A'      ||
        el.closest('button')   ||
        el.closest('a')        ||
        el.dataset.hover
      ) {
        setHovering(true)
      }
    }
    const onLeave = () => setHovering(false)

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseover', onEnter)
    window.addEventListener('mouseout',  onLeave)

    // RAF loop for smooth cursor + coordinate update
    let lastCoordUpdate = 0
    const tick = () => {
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`
      }
      const now = Date.now()
      if (now - lastCoordUpdate > 40) {
        lastCoordUpdate = now
        setCoords({ x: Math.round(pos.current.x), y: Math.round(pos.current.y) })
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onEnter)
      window.removeEventListener('mouseout',  onLeave)
      cancelAnimationFrame(rafRef.current)
    }
  }, [visible])

  if (typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches) return null

  return (
    <>
      {/* Crosshair cursor */}
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 9999,
          pointerEvents: 'none',
          willChange: 'transform',
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.3s',
        }}
      >
        {/* Crosshair arms */}
        <div style={{ position: 'absolute', transform: 'translate(-50%, -50%)' }}>
          {/* Horizontal */}
          <div style={{
            position: 'absolute',
            width: 20,
            height: 1,
            background: '#E85D04',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }} />
          {/* Vertical */}
          <div style={{
            position: 'absolute',
            width: 1,
            height: 20,
            background: '#E85D04',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }} />
          {/* Center dot */}
          <div style={{
            position: 'absolute',
            width: 3,
            height: 3,
            borderRadius: '50%',
            background: '#E85D04',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }} />
        </div>

        {/* Hover ring */}
        <AnimatePresence>
          {hovering && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.18 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.22 }}
              style={{
                position: 'absolute',
                width: 42,
                height: 42,
                borderRadius: '50%',
                border: '1.5px solid #E85D04',
                background: 'rgba(232, 93, 4, 0.12)',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            />
          )}
        </AnimatePresence>
      </div>

      {/* CAD coordinates */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          bottom: 20,
          left: 24,
          zIndex: 9998,
          pointerEvents: 'none',
          fontFamily: '"Courier New", monospace',
          fontSize: '0.6rem',
          color: 'rgba(107, 107, 107, 0.7)',
          letterSpacing: '0.08em',
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.4s',
        }}
      >
        X: {String(coords.x).padStart(4, '0')} / Y: {String(coords.y).padStart(4, '0')}
      </div>
    </>
  )
}
