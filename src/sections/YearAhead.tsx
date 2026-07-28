import { motion } from 'framer-motion'
import { config } from '@/config/content'
import { Reveal, SectionTitle, stagger, fadeUp } from '@/components/motion'

export function YearAhead() {
  return (
    <section className="section-shell">
      {/* Étoiles animées en arrière-plan */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        {Array.from({ length: 28 }).map((_, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 2.5 + 1}px`,
              height: `${Math.random() * 2.5 + 1}px`,
              boxShadow: '0 0 8px rgba(255,255,255,0.8)',
              animation: `twinkle ${3 + Math.random() * 4}s ease-in-out ${Math.random() * 4}s infinite`,
            }}
          />
        ))}
        <div className="absolute left-1/4 top-1/4 h-72 w-72 -translate-x-1/2 rounded-full bg-lavande-300/20 blur-3xl" />
        <div className="absolute right-1/4 bottom-1/4 h-72 w-72 translate-x-1/2 rounded-full bg-rose-300/20 blur-3xl" />
      </div>

      <div className="relative z-10 w-full">
        <SectionTitle eyebrow="🔮 Ton année à venir" title={config.annee.titre} subtitle={config.annee.sousTit} />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {config.annee.cartes.map((c, i) => (
            <motion.div
              key={c.titre}
              variants={fadeUp}
              whileHover={{ y: -10, scale: 1.03 }}
              transition={{ type: 'spring', stiffness: 260, damping: 18 }}
              className="glass group relative overflow-hidden rounded-3xl p-7 text-center"
            >
              <motion.div
                animate={{ y: [0, -6, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 4 + i * 0.4, repeat: Infinity, ease: 'easeInOut' }}
                className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-white/80 to-lavande-100/60 text-3xl shadow-inner"
              >
                {c.emoji}
              </motion.div>
              <h3 className="font-display text-xl font-semibold text-lavande-700">{c.titre}</h3>
              <p className="mt-2 max-h-0 overflow-hidden text-sm leading-relaxed text-lavande-600/80 opacity-0 transition-all duration-500 group-hover:max-h-40 group-hover:opacity-100">
                {c.texte}
              </p>
              <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 glow-violet" />
              <div className="pointer-events-none absolute -bottom-px left-1/2 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-lavande-300 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
