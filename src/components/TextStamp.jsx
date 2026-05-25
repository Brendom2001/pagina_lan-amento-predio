import { motion } from 'framer-motion'
import { useMemo } from 'react'

// Industrial stamp effect — letters appear one by one with micro-jitter
export default function TextStamp({ text, delay = 0, onComplete, style, className }) {
  const chars = useMemo(() => text.split(''), [text])

  return (
    <span className={className} style={{ display: 'inline-block', ...style }}>
      {chars.map((char, i) => {
        const jitterX = ((i * 7 + 3) % 5) - 2   // deterministic pseudo-random
        const jitterY = ((i * 13 + 1) % 5) - 2

        return (
          <motion.span
            key={i}
            initial={{ opacity: 0, x: jitterX * 2, y: jitterY * 2 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{
              opacity:   { duration: 0.04, delay: delay + i * 0.055 },
              x:         { duration: 0.08, delay: delay + i * 0.055, ease: 'easeOut' },
              y:         { duration: 0.08, delay: delay + i * 0.055, ease: 'easeOut' },
            }}
            onAnimationComplete={i === chars.length - 1 ? onComplete : undefined}
            style={{
              display: 'inline-block',
              whiteSpace: char === ' ' ? 'pre' : 'normal',
            }}
          >
            {char === ' ' ? ' ' : char}
          </motion.span>
        )
      })}
    </span>
  )
}
