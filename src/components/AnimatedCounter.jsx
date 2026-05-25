import { useEffect, useRef, useState } from 'react'

// Count-up number animation — triggers when isActive becomes true
export default function AnimatedCounter({ target, suffix = '', duration = 2, isActive }) {
  const [value, setValue] = useState(0)
  const hasRun = useRef(false)

  useEffect(() => {
    if (!isActive || hasRun.current) return
    hasRun.current = true

    const startTime = performance.now()
    const tick = (now) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / (duration * 1000), 1)
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(eased * target))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [isActive, target, duration])

  return (
    <>{value.toLocaleString('pt-BR')}{suffix}</>
  )
}
