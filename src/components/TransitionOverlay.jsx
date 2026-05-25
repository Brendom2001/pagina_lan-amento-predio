import { motion } from 'framer-motion'

// Cinematic transition overlays — each type has a cover + reveal phase
export default function TransitionOverlay({ type, direction, phase }) {
  const isCovering = phase === 'covering'

  if (type === 'curtain') {
    return (
      <motion.div
        key="curtain"
        initial={{ x: direction === 'forward' ? '-101%' : '101%' }}
        animate={{ x: isCovering ? '0%' : (direction === 'forward' ? '101%' : '-101%') }}
        transition={{ duration: 0.52, ease: [0.76, 0, 0.24, 1] }}
        style={{
          position: 'fixed',
          inset: 0,
          background: '#1C1C1C',
          zIndex: 900,
          pointerEvents: 'none',
        }}
      >
        {/* Diagonal accent line on curtain */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: '40%',
          width: 1,
          height: '100%',
          background: 'rgba(232, 93, 4, 0.3)',
          transform: 'skewX(-5deg)',
        }} />
      </motion.div>
    )
  }

  if (type === 'scale') {
    // Subtle dark overlay while scale animation plays
    return (
      <motion.div
        key="scale"
        initial={{ opacity: 0 }}
        animate={{ opacity: isCovering ? 0.7 : 0 }}
        transition={{ duration: 0.45, ease: 'easeInOut' }}
        style={{
          position: 'fixed',
          inset: 0,
          background: '#0E0E0E',
          zIndex: 900,
          pointerEvents: 'none',
        }}
      />
    )
  }

  if (type === 'elevator') {
    return (
      <motion.div
        key="elevator"
        initial={{ y: '101%' }}
        animate={{ y: isCovering ? '0%' : '-101%' }}
        transition={
          isCovering
            ? { type: 'spring', stiffness: 280, damping: 28 }
            : { duration: 0.48, ease: [0.76, 0, 0.24, 1] }
        }
        style={{
          position: 'fixed',
          inset: 0,
          background: '#0E0E0E',
          zIndex: 900,
          pointerEvents: 'none',
          borderTop: isCovering ? '2px solid #E85D04' : 'none',
        }}
      />
    )
  }

  if (type === 'circle') {
    return (
      <motion.div
        key="circle"
        initial={{ clipPath: 'circle(0% at 50% 50%)' }}
        animate={{
          clipPath: isCovering
            ? 'circle(140% at 50% 50%)'
            : 'circle(0% at 50% 50%)',
        }}
        transition={{ duration: 0.58, ease: [0.76, 0, 0.24, 1] }}
        style={{
          position: 'fixed',
          inset: 0,
          background: '#141414',
          zIndex: 900,
          pointerEvents: 'none',
        }}
      />
    )
  }

  if (type === 'split') {
    return (
      <>
        {/* Top half */}
        <motion.div
          key="split-top"
          initial={{ y: isCovering ? '-101%' : '0%' }}
          animate={{ y: isCovering ? '0%' : '-101%' }}
          transition={{ duration: 0.52, ease: [0.76, 0, 0.24, 1] }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            height: '50%',
            background: '#1C1C1C',
            zIndex: 900,
            pointerEvents: 'none',
            borderBottom: '1px solid rgba(232, 93, 4, 0.2)',
          }}
        />
        {/* Bottom half */}
        <motion.div
          key="split-bottom"
          initial={{ y: isCovering ? '101%' : '0%' }}
          animate={{ y: isCovering ? '0%' : '101%' }}
          transition={{ duration: 0.52, ease: [0.76, 0, 0.24, 1] }}
          style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            height: '50%',
            background: '#1C1C1C',
            zIndex: 900,
            pointerEvents: 'none',
            borderTop: '1px solid rgba(232, 93, 4, 0.2)',
          }}
        />
      </>
    )
  }

  if (type === 'flash') {
    return (
      <motion.div
        key="flash"
        initial={{ opacity: 0 }}
        animate={{ opacity: isCovering ? 1 : 0 }}
        transition={{
          duration: isCovering ? 0.22 : 0.35,
          ease: isCovering ? 'easeIn' : 'easeOut',
        }}
        style={{
          position: 'fixed',
          inset: 0,
          background: '#E85D04',
          zIndex: 900,
          pointerEvents: 'none',
        }}
      />
    )
  }

  return null
}
