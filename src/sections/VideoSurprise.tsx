import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { Play, X } from 'lucide-react'
import { config } from '@/config/content'
import { useMusic } from '@/hooks/useMusic'
import { Reveal, SectionTitle } from '@/components/motion'

export function VideoSurprise() {
  const [open, setOpen] = useState(false)
  const music = useMusic()
  const wasPlayingRef = useRef(false)
  const v = config.video

  useEffect(() => {
    if (open) {
      // When video opens, pause music and remember if it was playing
      wasPlayingRef.current = music.playing
      if (music.playing) music.pause()
    } else {
      // When video closes, resume music if it was playing before
      if (wasPlayingRef.current) music.play()
    }
  }, [open]) // Only depend on 'open' to avoid loops

  return (
    <section className="section-shell">
      <SectionTitle eyebrow="Vidéo surprise" title={v.titre} subtitle={v.sousTit} />

      <Reveal amount={0.2}>
        <button
          onClick={() => setOpen(true)}
          className="group relative mx-auto block aspect-video w-full max-w-4xl overflow-hidden rounded-3xl shadow-2xl"
        >
          <img src={v.poster} alt="Vidéo surprise" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-lavande-900/70 via-lavande-900/20 to-transparent" />
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="absolute left-1/2 top-1/2 grid h-20 w-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-rose-500 shadow-2xl"
          >
            <Play size={28} />
          </motion.div>
          <div className="absolute bottom-6 left-6 text-white">
            <p className="font-display text-2xl font-semibold">▶ Lecture plein écran</p>
          </div>
        </button>
      </Reveal>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-lavande-900/85 backdrop-blur-xl p-4"
            onClick={() => setOpen(false)}
          >
            <button
              onClick={() => setOpen(false)}
              aria-label="Fermer"
              className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full bg-white/15 text-white transition hover:bg-white/25"
            >
              <X />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="aspect-video w-full max-w-5xl overflow-hidden rounded-2xl bg-black shadow-2xl"
            >
              {v.src ? (
                <video src={v.src} controls autoPlay className="h-full w-full" />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-lavande-800 to-rose-700 p-8 text-center text-white">
                  <div>
                    <p className="font-display text-2xl">Place ta vidéo ici</p>
                    <p className="mt-2 text-sm text-white/70">
                      Ajoute le fichier dans <code className="rounded bg-white/15 px-1.5 py-0.5">/public/video/</code> puis renseigne son chemin dans <code className="rounded bg-white/15 px-1.5 py-0.5">src/config/content.ts</code>.
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
