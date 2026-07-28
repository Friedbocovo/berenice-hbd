import { motion } from 'framer-motion'
import { config } from '@/config/content'
import { Reveal, SectionTitle, stagger, fadeUp } from '@/components/motion'

export function Qualities() {
  return (
    <section className="section-shell">
      <SectionTitle eyebrow="Tes qualités" title={config.qualites.titre} subtitle={config.qualites.sousTit} />

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {config.qualites.cartes.map((c, i) => (
          <motion.div
            key={c.titre}
            variants={fadeUp}
            whileHover={{ y: -10, scale: 1.03 }}
            transition={{ type: 'spring', stiffness: 260, damping: 18 }}
            className="glass group relative overflow-hidden rounded-3xl p-7 text-center"
          >
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4 + i * 0.4, repeat: Infinity, ease: 'easeInOut' }}
              className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-white/80 to-rose-100/60 text-3xl shadow-inner"
            >
              {c.emoji}
            </motion.div>
            <h3 className="font-display text-xl font-semibold text-lavande-700">{c.titre}</h3>
            <p className="mt-2 text-sm leading-relaxed text-lavande-600/80">{c.texte}</p>
            <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 glow-rose" />
            <div className="pointer-events-none absolute -bottom-px left-1/2 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-rose-300 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
