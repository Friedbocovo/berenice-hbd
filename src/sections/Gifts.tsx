import { AnimatePresence, motion } from 'framer-motion'
import { useState, useCallback, useRef } from 'react'
import confetti from 'canvas-confetti'
import { config } from '@/config/content'
import { Reveal, SectionTitle, stagger, fadeUp } from '@/components/motion'

const GIFT_COLORS = [
  { box: '#ff7aa0', lid: '#ff9fbf', ribbon: '#f5c344' },
  { box: '#9d72ff', lid: '#c9a5ff', ribbon: '#7dd3fc' },
  { box: '#7dd3fc', lid: '#bae6fd', ribbon: '#ff7aa0' },
  { box: '#f5c344', lid: '#ffd97a', ribbon: '#9d72ff' },
  { box: '#ff9fbf', lid: '#ffc9d9', ribbon: '#7dd3fc' },
]

function GiftBox({ color, opened, onClick, index }: { color: typeof GIFT_COLORS[0]; opened: boolean; onClick: () => void; index: number }) {
  return (
    <motion.button
      onClick={onClick}
      disabled={opened}
      whileHover={!opened ? { y: -8, rotate: [0, -3, 3, 0] } : {}}
      transition={{ type: 'spring', stiffness: 260, damping: 16 }}
      className="group relative grid place-items-center"
      style={{ width: 130, height: 130 }}
    >
      {/* Glow */}
      <div
        className="pointer-events-none absolute inset-0 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-60"
        style={{ background: `radial-gradient(circle, ${color.box}66, transparent 70%)` }}
      />
      {/* Ombre */}
      <div className="absolute -bottom-2 h-3 w-20 rounded-full bg-lavande-900/20 blur-md" />

      <svg viewBox="0 0 100 100" className="relative h-full w-full drop-shadow-lg">
        {/* Boîte */}
        <rect x="20" y="38" width="60" height="50" rx="4" fill={color.box} />
        {/* Ruban vertical */}
        <rect x="46" y="38" width="8" height="50" fill={color.ribbon} />
        {/* Ruban horizontal */}
        <rect x="20" y="56" width="60" height="8" fill={color.ribbon} />
        {/* Couvercle */}
        <motion.rect
          x="16"
          y="30"
          width="68"
          height="14"
          rx="3"
          fill={color.lid}
          animate={opened ? { y: -40, rotate: -15, opacity: 0 } : { y: 30, rotate: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: '50px 37px' }}
        />
        {/* Nœud du ruban */}
        <motion.g
          animate={opened ? { y: -40, opacity: 0 } : { y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <path d="M42 30 L50 22 L58 30 L50 36 Z" fill={color.ribbon} />
          <circle cx="50" cy="30" r="4" fill={color.ribbon} />
        </motion.g>
      </svg>

      {/* Badge "Ouvert" */}
      <AnimatePresence>
        {opened && (
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute -bottom-1 rounded-full bg-white/80 px-3 py-0.5 text-xs font-medium text-lavande-600 backdrop-blur"
          >
            ✨ Ouvert
          </motion.span>
        )}
      </AnimatePresence>

      {/* Flottement */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3 + index * 0.3, repeat: Infinity, ease: 'easeInOut' }}
      />
    </motion.button>
  )
}

export function Gifts() {
  const [opened, setOpened] = useState<boolean[]>(Array(config.cadeaux.items.length).fill(false))
  const [active, setActive] = useState<number | null>(null)
  const audioCtx = useRef<AudioContext | null>(null)

  const count = opened.filter(Boolean).length
  const total = config.cadeaux.items.length
  const allDone = count === total

  const playPop = useCallback(() => {
    try {
      if (!audioCtx.current) audioCtx.current = new (window.AudioContext || (window as any).webkitAudioContext)()
      const ctx = audioCtx.current
      const o = ctx.createOscillator()
      const g = ctx.createGain()
      o.connect(g).connect(ctx.destination)
      o.frequency.setValueAtTime(660, ctx.currentTime)
      o.frequency.exponentialRampToValueAtTime(220, ctx.currentTime + 0.15)
      g.gain.setValueAtTime(0.15, ctx.currentTime)
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15)
      o.start()
      o.stop(ctx.currentTime + 0.15)
    } catch { /* ignore */ }
  }, [])

  const openGift = useCallback((i: number) => {
    setOpened((prev) => {
      if (prev[i]) return prev
      const next = [...prev]
      next[i] = true
      return next
    })
    setActive(i)
    playPop()

    const item = config.cadeaux.items[i]
      const isSpecial = 'special' in item && item.special
    }
  }, [playPop])

  const scrollToNext = useCallback(() => {
    const nav = document.querySelector('[data-nav-next]') as HTMLButtonElement | null
    nav?.click()
  }, [])

  return (
    <section className="section-shell">
      <SectionTitle eyebrow="🎁 Ouvre tes cadeaux" title={config.cadeaux.titre} subtitle={config.cadeaux.sousTit} />

      {/* Progression */}
      <Reveal amount={0.3}>
        <div className="mb-10 inline-flex items-center gap-3 rounded-full bg-white/60 px-5 py-2 backdrop-blur">
          <div className="h-2 w-32 overflow-hidden rounded-full bg-lavande-200">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-rose-400 to-lavande-400"
              animate={{ width: `${(count / total) * 100}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </div>
          <span className="font-display text-sm font-medium text-lavande-700">
            {count} / {total} cadeaux ouverts
          </span>
        </div>
      </Reveal>

      {/* Grille des cadeaux */}
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        className="mx-auto grid w-full max-w-4xl grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5"
      >
        {config.cadeaux.items.map((_, i) => (
          <motion.div key={i} variants={fadeUp} className="flex justify-center">
            <GiftBox
              color={GIFT_COLORS[i % GIFT_COLORS.length]}
              opened={opened[i]}
              onClick={() => openGift(i)}
              index={i}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Message de fin */}
      <AnimatePresence>
        {allDone && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12 flex flex-col items-center gap-4 text-center"
          >
            <p className="font-display text-2xl font-semibold text-gradient">{config.cadeaux.messageFini}</p>
            <p className="text-lg text-lavande-700/80">{config.cadeaux.messageSuite}</p>
            <button onClick={scrollToNext} className="btn-primary mt-2">
              {config.cadeaux.boutonSuite}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modale du cadeau ouvert */}
      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-lavande-900/80 backdrop-blur-xl p-6"
            onClick={() => setActive(null)}
          >
            <motion.div
              key={active}
              initial={{ scale: 0.8, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 30 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="glass relative max-w-md rounded-3xl p-8 text-center"
            >
              <button
                onClick={() => setActive(null)}
                aria-label="Fermer"
                className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-white/40 text-lavande-700 transition hover:bg-white/60"
              >
                ✕
              </button>

              {(() => {
                const item = config.cadeaux.items[active]
                const isSpecial = 'special' in item && item.special
                const hasPhoto = 'photo' in item && item.photo
                const hasContent = 'contenu' in item && item.contenu
                return (
                  <>
                    <motion.div
                      initial={{ scale: 0, rotate: -20 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                      className="mx-auto mb-4 text-4xl"
                    >
                      {isSpecial ? '🎁' : '✨'}
                    </motion.div>
                    <h3 className="font-display text-xl font-semibold text-lavande-700">{item.titre}</h3>
                    {hasPhoto && (
                      <motion.img
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                        src={item.photo}
                        alt="Souvenir"
                        className="mx-auto mt-4 max-h-48 rounded-2xl object-cover shadow-lg"
                      />
                    )}
                    {hasContent && (
                      <p className="mt-4 text-base leading-relaxed text-lavande-700/80">{item.contenu}</p>
                    )}

                    {isSpecial && (
                      <button onClick={scrollToNext} className="btn-primary mt-6">
                        {'bouton' in item ? item.bouton : config.cadeaux.boutonSuite}
                      </button>
                    )}
                  </>
                )
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
