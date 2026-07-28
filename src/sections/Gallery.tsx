import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { config } from '@/config/content'
import { Reveal, SectionTitle, stagger, fadeUp } from '@/components/motion'

export function Gallery() {
  const [lightbox, setLightbox] = useState<number | null>(null)
  const photos = config.galerie.photos

  useEffect(() => {
    if (lightbox === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null)
      if (e.key === 'ArrowRight') setLightbox((i) => (i === null ? i : (i + 1) % photos.length))
      if (e.key === 'ArrowLeft') setLightbox((i) => (i === null ? i : (i - 1 + photos.length) % photos.length))
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [lightbox, photos.length])

  // Deterministic varied rotations for a polaroid pile feel
  const rotations = [-5, 3, -2, 4, -4, 2, 5, -3, 1, -1]

  return (
    <section className="section-shell">
      <SectionTitle eyebrow="Galerie" title={config.galerie.titre} subtitle={config.galerie.sousTit} />

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        className="mx-auto grid w-full max-w-5xl grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3"
      >
        {photos.map((ph, i) => (
          <motion.button
            key={i}
            variants={fadeUp}
            whileHover={{ y: -8, rotate: 0, scale: 1.04, zIndex: 10 }}
            transition={{ type: 'spring', stiffness: 280, damping: 18 }}
            onClick={() => setLightbox(i)}
            style={{ rotate: `${rotations[i % rotations.length]}deg`, zIndex: 1 }}
            className="group relative block w-full"
          >
            {/* Polaroid frame */}
            <div className="rounded-[1.1rem] bg-white p-2 pb-9 shadow-xl shadow-lavande-300/30 transition-shadow duration-300 group-hover:shadow-2xl group-hover:shadow-rose-300/40">
              <div className="relative aspect-square overflow-hidden rounded-lg">
                <img
                  src={ph.src}
                  alt={ph.legende}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-lavande-900/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
              <p className="mt-2 text-center font-display text-xs font-medium text-lavande-700">
                {ph.legende}
              </p>
            </div>
            {/* Tape detail */}
            <span className="pointer-events-none absolute -top-2 left-1/2 h-5 w-12 -translate-x-1/2 rotate-2 rounded-sm bg-or-200/50 shadow-sm" />
          </motion.button>
        ))}
      </motion.div>

      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-lavande-900/80 backdrop-blur-xl"
            onClick={() => setLightbox(null)}
          >
            <button
              onClick={(e) => { e.stopPropagation(); setLightbox(null) }}
              aria-label="Fermer"
              className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full bg-white/15 text-white transition hover:bg-white/25"
            >
              <X />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); setLightbox((i) => (i === null ? i : (i - 1 + photos.length) % photos.length)) }}
              aria-label="Précédent"
              className="absolute left-4 grid h-12 w-12 place-items-center rounded-full bg-white/15 text-white transition hover:bg-white/25"
            >
              <ChevronLeft />
            </button>
            <motion.img
              key={lightbox}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              src={photos[lightbox].src}
              alt={photos[lightbox].legende}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[82vh] max-w-[90vw] rounded-2xl object-contain shadow-2xl"
            />
            <button
              onClick={(e) => { e.stopPropagation(); setLightbox((i) => (i === null ? i : (i + 1) % photos.length)) }}
              aria-label="Suivant"
              className="absolute right-4 grid h-12 w-12 place-items-center rounded-full bg-white/15 text-white transition hover:bg-white/25"
            >
              <ChevronRight />
            </button>
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center text-white">
              <p className="font-display text-lg">{photos[lightbox].legende}</p>
              <p className="text-sm text-white/70">{photos[lightbox].date}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
