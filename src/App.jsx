import { useState, useEffect } from 'react'

import ArchitecturalGrid from './components/ArchitecturalGrid'
import NoiseOverlay      from './components/NoiseOverlay'
import TechnicalCursor   from './components/TechnicalCursor'
import FloatingNav       from './components/FloatingNav'
import ProgressIndicator from './components/ProgressIndicator'

import SectionHero      from './sections/SectionHero'
import SectionStructure from './sections/SectionStructure'
import SectionFloorplan from './sections/SectionFloorplan'
import SectionMaterials from './sections/SectionMaterials'
import SectionLocation  from './sections/SectionLocation'
import SectionAbout     from './sections/SectionAbout'
import SectionCTA       from './sections/SectionCTA'

export const SECTIONS = [
  { id: 'hero',      label: 'ABERTURA' },
  { id: 'structure', label: 'ESTRUTURA' },
  { id: 'floorplan', label: 'PLANTAS' },
  { id: 'materials', label: 'MATERIAIS' },
  { id: 'location',  label: 'LOCALIZAÇÃO' },
  { id: 'about',     label: 'CONSTRUTORA' },
  { id: 'cta',       label: 'RESERVAR' },
]

function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export default function App() {
  const [currentSection, setCurrentSection] = useState(0)

  // Track which section is in view via IntersectionObserver
  useEffect(() => {
    const observers = []

    SECTIONS.forEach(({ id }, idx) => {
      const el = document.getElementById(id)
      if (!el) return

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.4) {
            setCurrentSection(idx)
          }
        },
        { threshold: 0.4 }
      )
      obs.observe(el)
      observers.push(obs)
    })

    return () => observers.forEach(o => o.disconnect())
  }, [])

  return (
    <div style={{ background: '#0E0E0E', position: 'relative' }}>
      {/* Global fixed effects */}
      <ArchitecturalGrid />
      <NoiseOverlay />
      <TechnicalCursor />

      <FloatingNav
        current={currentSection}
        total={SECTIONS.length}
        sections={SECTIONS}
        onNavigate={(idx) => scrollToSection(SECTIONS[idx].id)}
      />

      <ProgressIndicator
        current={currentSection}
        total={SECTIONS.length}
        sections={SECTIONS}
        onNavigate={(idx) => scrollToSection(SECTIONS[idx].id)}
      />

      {/* Scrollable content */}
      <main>
        <section id="hero">
          <SectionHero onNavigate={(idx) => scrollToSection(SECTIONS[idx].id)} />
        </section>

        <section id="structure">
          <SectionStructure />
        </section>

        <section id="floorplan">
          <SectionFloorplan />
        </section>

        <section id="materials">
          <SectionMaterials />
        </section>

        <section id="location">
          <SectionLocation />
        </section>

        <section id="about">
          <SectionAbout />
        </section>

        <section id="cta">
          <SectionCTA />
        </section>
      </main>
    </div>
  )
}
