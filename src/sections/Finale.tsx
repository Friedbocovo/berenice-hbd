import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import { useEffect, useRef } from 'react'
import { config } from '@/config/content'

function fireFireworks() {
  const colors = ['#ff7aa0', '#9d72ff', '#7dd3fc', '#f5c344', '#ffffff']
  const duration = 4000
  const end = Date.now() + duration
  const frame = () => {
    confetti({ particleCount: 5, angle: 90, spread: 70, startVelocity: 55, origin: { x: Math.random(), y: Math.random() * 0.4 }, colors, scalar: 1.1 })
    confetti({ particleCount: 3, angle: 60, spread: 55, startVelocity: 45, origin: { x: 0, y: Math.random() * 0.5 }, colors })
    confetti({ particleCount: 3, angle: 120, spread: 55, startVelocity: 45, origin: { x: 1, y: Math.random() * 0.5 }, colors })
    if (Date.now() < end) requestAnimationFrame(frame)
  }
  frame()

  // Hearts rain
  const heartEnd = Date.now() + 3000
  const hearts = () => {
    confetti({ particleCount: 4, startVelocity: 25, spread: 360, origin: { x: Math.random(), y: 0 }, gravity: 0.8, scalar: 1.4, colors: ['#ff7aa0', '#f85c87', '#ff9fbf'], shapes: ['circle'] as any })
    if (Date.now() < heartEnd) requestAnimationFrame(hearts)
  }
  hearts()
}

export function Finale() {
  const fired = useRef(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !fired.current) {
          fired.current = true
          fireFireworks()
        }
      },
      { threshold: 0.5 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section ref={ref} className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-6 py-24">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-rose-100 via-white to-lavande-100" />
      <div className="relative z-10 text-center">
        <motion.p
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-display text-2xl text-rose-400"
        >
          ❤️ {config.finale.titre} ❤️
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 font-display text-6xl font-extrabold text-gradient sm:text-8xl md:text-9xl"
        >
          {config.prenom}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mx-auto mt-6 max-w-md text-lg text-lavande-700/80"
        >
          {config.finale.sousTit}
        </motion.p>
      </div>

      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-sm text-lavande-400"
      >
        {config.finale.footer}
      </motion.footer>
    </section>
  )
}
