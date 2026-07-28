import { motion } from 'framer-motion'
import { useState } from 'react'
import { config } from '@/config/content'
import { useTypewriter } from '@/hooks/useTypewriter'

export function WelcomeScreen({ onDiscover }: { onDiscover: () => void }) {
  const [started, setStarted] = useState(false)
  const { out, done } = useTypewriter(config.accroche, 45, 1400)

  const handle = () => {
    setStarted(true)
    setTimeout(onDiscover, 700)
  }

  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-6">
      {/* Twinkling stars */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {Array.from({ length: 40 }).map((_, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              boxShadow: '0 0 8px rgba(255,255,255,0.8)',
              animation: `twinkle ${3 + Math.random() * 4}s ease-in-out ${Math.random() * 4}s infinite`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-3 font-display text-lg font-light tracking-[0.3em] text-lavande-600 uppercase"
        >
          ✨ Joyeux anniversaire ✨
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-6xl font-extrabold tracking-tight text-gradient sm:text-8xl md:text-9xl"
        >
          {config.prenom}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.4 }}
          className={`mt-8 min-h-[1.6em] font-sans text-lg text-lavande-700/80 sm:text-xl ${done ? '' : 'caret'}`}
        >
          {out}
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: done ? 1 : 0, y: done ? 0 : 20 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          onClick={handle}
          disabled={!done || started}
          className="btn-primary mt-10 text-base"
        >
          Découvrir
          <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
            →
          </motion.span>
        </motion.button>
      </div>

      {/* Cinematic transition veil */}
      {started && (
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          className="absolute inset-0 z-50 origin-top bg-gradient-to-b from-rose-100 via-white to-lavande-100"
          style={{ transformOrigin: 'top' }}
        />
      )}
    </section>
  )
}
