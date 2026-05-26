import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import useIsMobile from '../hooks/useIsMobile'

const UNIT_OPTIONS = ['Studio 32m²', '1 Dormitório 48m²', '2 Dormitórios 72m²', 'Cobertura 120m²']

function CADSpinner() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <motion.circle cx="12" cy="12" r="8" stroke="#0E0E0E" strokeWidth="1.5"
        strokeDasharray="10 16"
        animate={{ rotate: 360 }}
        transition={{ duration: 0.85, repeat: Infinity, ease: 'linear' }}
        style={{ transformOrigin: '12px 12px' }}
      />
    </svg>
  )
}

export default function SectionCTA() {
  const ref      = useRef(null)
  const inView   = useInView(ref, { once: true, amount: 0.25 })
  const isMobile = useIsMobile()
  const [form, setForm]     = useState({ nome: '', tel: '', tipo: '' })
  const [status, setStatus] = useState('idle')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.nome || !form.tel) return
    setStatus('loading')
    setTimeout(() => setStatus('success'), 2000)
  }

  return (
    <div
      ref={ref}
      className="section-base"
      style={{
        background: '#E85D04',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'calc(var(--nav-height) + 48px) 6vw 64px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Grid overlay on orange */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `
          linear-gradient(rgba(0,0,0,0.07) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,0,0,0.07) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px',
      }} />

      {/* Watermark */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        fontFamily: '"Bebas Neue", cursive',
        fontSize: 'clamp(180px, 28vw, 400px)',
        color: 'rgba(0,0,0,0.055)',
        lineHeight: 1, userSelect: 'none', pointerEvents: 'none', zIndex: 0,
      }}>
        48
      </div>

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: 680 }}>
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: inView ? 1 : 0 }} transition={{ duration: 0.4 }}
          style={{
            fontFamily: 'Inter, sans-serif', fontWeight: 300, fontSize: '0.62rem',
            color: 'rgba(14,14,14,0.55)', letterSpacing: '0.38em', textAlign: 'center', marginBottom: 14,
          }}>
          07 / UNIDADES
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          style={{
            fontFamily: '"Space Grotesk", sans-serif', fontWeight: 800,
            fontSize: 'clamp(2rem, 4.5vw, 4rem)',
            color: '#0E0E0E', lineHeight: 1.05, textAlign: 'center', marginBottom: 16,
          }}>
          Quantas restam para você?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: inView ? 1 : 0 }} transition={{ delay: 0.22, duration: 0.4 }}
          style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.95rem', color: 'rgba(14,14,14,0.6)', textAlign: 'center', marginBottom: 32 }}>
          Reserve agora com condições de lançamento.
        </motion.p>

        {/* Availability counter */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: inView ? 1 : 0, scale: inView ? 1 : 0.95 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          style={{ display: 'flex', justifyContent: 'center', marginBottom: 44 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            padding: '11px 26px', border: '1.5px solid rgba(14,14,14,0.3)',
          }}>
            <motion.div
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              style={{ width: 7, height: 7, borderRadius: '50%', background: '#0E0E0E' }}
            />
            <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: '0.72rem', color: '#0E0E0E', letterSpacing: '0.2em' }}>
              12 UNIDADES DISPONÍVEIS
            </span>
          </div>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 18 }} animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 18 }}
          transition={{ delay: 0.4, duration: 0.5 }}>
          <AnimatePresence mode="wait">
            {status !== 'success' ? (
              <motion.form key="form" onSubmit={handleSubmit} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.25 }}>
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr 1fr', gap: isMobile ? 16 : 20, marginBottom: 20 }}>
                  {[
                    { key: 'nome', placeholder: 'Nome completo', type: 'text' },
                    { key: 'tel',  placeholder: 'Telefone / WhatsApp', type: 'tel'  },
                  ].map(({ key, placeholder, type }) => (
                    <div key={key} style={{ borderBottom: '2px solid rgba(14,14,14,0.4)', paddingBottom: 10 }}>
                      <input
                        type={type}
                        placeholder={placeholder}
                        value={form[key]}
                        onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))}
                        style={{ fontFamily: '"DM Sans", sans-serif', fontSize: isMobile ? '1rem' : '0.86rem', color: '#0E0E0E' }}
                      />
                    </div>
                  ))}
                  <div style={{ borderBottom: '2px solid rgba(14,14,14,0.4)', paddingBottom: 10 }}>
                    <select
                      value={form.tipo}
                      onChange={e => setForm(p => ({ ...p, tipo: e.target.value }))}
                      style={{ fontFamily: '"DM Sans", sans-serif', fontSize: isMobile ? '1rem' : '0.86rem', color: form.tipo ? '#0E0E0E' : 'rgba(14,14,14,0.4)', appearance: 'none' }}>
                      <option value="" disabled>Tipo de unidade ▾</option>
                      {UNIT_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  data-hover="true"
                  disabled={status === 'loading'}
                  style={{
                    width: '100%', padding: '18px 0',
                    background: '#0E0E0E', color: '#F2EFE9', border: 'none',
                    fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: '0.78rem', letterSpacing: '0.22em',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
                    transition: 'opacity 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.opacity = '0.86'}
                  onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                >
                  {status === 'loading' ? <><CADSpinner /> PROCESSANDO</> : 'GARANTIR MINHA UNIDADE →'}
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95, y: 18 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.48 }}
                style={{ padding: '36px', border: '1.5px solid rgba(14,14,14,0.28)', textAlign: 'center' }}>
                <div style={{ fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700, fontSize: '1.4rem', color: '#0E0E0E', marginBottom: 12 }}>
                  Reserva registrada.
                </div>
                <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.9rem', color: 'rgba(14,14,14,0.65)', lineHeight: 1.65 }}>
                  Nossa equipe de especialistas entrará em contato em breve.<br />
                  Parabéns — você deu o primeiro passo para o seu Atlas.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {status !== 'success' && (
            <div style={{ textAlign: 'center', marginTop: 20 }}>
              <a
                href="https://wa.me/5551999999999?text=Olá!%20Tenho%20interesse%20no%20Édificio%20Atlas."
                target="_blank"
                rel="noopener noreferrer"
                data-hover="true"
                style={{
                  fontFamily: 'Inter, sans-serif', fontWeight: 300, fontSize: '0.75rem',
                  color: 'rgba(14,14,14,0.6)', letterSpacing: '0.1em', textDecoration: 'none',
                  borderBottom: '1px solid rgba(14,14,14,0.28)', paddingBottom: 2, transition: 'color 0.2s',
                }}
                onMouseEnter={e => e.target.style.color = '#0E0E0E'}
                onMouseLeave={e => e.target.style.color = 'rgba(14,14,14,0.6)'}
              >
                ou fale direto no WhatsApp →
              </a>
            </div>
          )}
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: inView ? 1 : 0 }} transition={{ delay: 0.65 }}
          style={{ marginTop: 52, display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? 8 : 0, justifyContent: 'space-between', alignItems: isMobile ? 'flex-start' : 'center', paddingTop: 20, borderTop: '1px solid rgba(14,14,14,0.18)' }}>
          <div style={{ fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700, fontSize: '0.88rem', color: '#0E0E0E', letterSpacing: '0.1em' }}>
            VÉRTICE CONSTRUTORA
          </div>
          <div style={{ fontFamily: '"Courier New", monospace', fontSize: '0.56rem', color: 'rgba(14,14,14,0.45)', letterSpacing: '0.07em', textAlign: 'right' }}>
            © 2025 · CRECI-RS 12345-J · CREA-RS 123.456-7
          </div>
        </motion.div>
      </div>
    </div>
  )
}
