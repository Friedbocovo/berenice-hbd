import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { AuroraBackground } from '@/components/AuroraBackground'
import { Particles } from '@/components/Particles'
import { MusicPlayer } from '@/components/MusicPlayer'
import { WelcomeScreen } from '@/sections/WelcomeScreen'
import { PersonalLetter } from '@/sections/PersonalLetter'
import { Gallery } from '@/sections/Gallery'
import { Qualities } from '@/sections/Qualities'
import { YearAhead } from '@/sections/YearAhead'
import { Gifts } from '@/sections/Gifts'
import { VideoSurprise } from '@/sections/VideoSurprise'
import { BirthdayCake } from '@/sections/BirthdayCake'
import { Guestbook } from '@/sections/Guestbook'
import { Finale } from '@/sections/Finale'
import { useMusic } from '@/hooks/useMusic'

const SLIDES = [
  { id: 'lettre', label: 'Lettre', Comp: PersonalLetter },
  { id: 'galerie', label: 'Galerie', Comp: Gallery },
  { id: 'qualites', label: 'Qualités', Comp: Qualities },
  { id: 'annee', label: 'Année', Comp: YearAhead },
  { id: 'cadeaux', label: 'Cadeaux', Comp: Gifts },
  { id: 'video', label: 'Vidéo', Comp: VideoSurprise },
  { id: 'gateau', label: 'Gâteau', Comp: BirthdayCake },
  { id: 'livre-or', label: "Livre d'or", Comp: Guestbook },
  { id: 'finale', label: 'Finale', Comp: Finale },
]

export default function App() {
  const [entered, setEntered] = useState(false)
  const [slide, setSlide] = useState(0) // 0 = welcome, 1..N = slides
  const music = useMusic()
  const scrollRef = useRef<HTMLDivElement>(null)

  // Start music once the user enters (satisfies autoplay policy)
  useEffect(() => {
    if (entered) music.play()
  }, [entered]) // eslint-disable-line react-hooks/exhaustive-deps

  // Reset scroll position on slide change
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
  }, [slide])

  const goNext = () => setSlide((s) => Math.min(s + 1, SLIDES.length))
  const goPrev = () => setSlide((s) => Math.max(s - 1, 1))
  const isFinale = slide === SLIDES.length
  const isFirstSlide = slide === 1

  return (
    <>
      <AuroraBackground />
      <Particles />

      <div className="relative h-[100svh] w-full overflow-hidden">
        <AnimatePresence mode="wait">
          {!entered ? (
            <motion.div
              key="welcome"
              exit={{ opacity: 0, scale: 1.04 }}
              transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
              className="absolute inset-0"
            >
              <WelcomeScreen onDiscover={() => { setEntered(true); setSlide(1) }} />
            </motion.div>
          ) : (
            <motion.div
              key={`slide-${slide}`}
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 overflow-y-auto"
              ref={scrollRef}
            >
              {(() => {
                const S = SLIDES[slide - 1]
                if (!S) return null
                const { Comp } = S
                return <Comp />
              })()}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation controls */}
      {entered && !isFinale && (
        <motion.nav
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="fixed bottom-6 left-1/2 z-40 flex -translate-x-1/2 items-center gap-2 sm:gap-3"
        >
          {!isFirstSlide && (
            <button
              onClick={goPrev}
              aria-label="Précédent"
              className="glass hidden h-12 w-12 place-items-center rounded-full text-lavande-700 transition hover:scale-110 hover:text-rose-500 active:scale-95 sm:grid"
            >
              <ArrowLeft size={20} />
            </button>
          )}

          {/* Progress dots - responsive */}
          <div className="glass flex items-center gap-1 rounded-full px-2 py-2.5 sm:gap-1.5 sm:px-4">
            {SLIDES.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setSlide(i + 1)}
                aria-label={s.label}
                className="group relative"
              >
                <span
                  className={`block rounded-full transition-all duration-300 ${
                    i + 1 === slide
                      ? 'h-2 w-4 bg-gradient-to-r from-rose-400 to-lavande-400 sm:h-2.5 sm:w-6'
                      : 'h-1.5 w-1.5 bg-lavande-300 hover:bg-rose-300 sm:h-2 sm:w-2'
                  }`}
                />
              </button>
            ))}
          </div>

          <button
            onClick={goNext}
            aria-label="Suivant"
            className="glass group hidden h-12 items-center gap-2 rounded-full px-6 text-lavande-700 transition hover:scale-105 hover:text-rose-500 active:scale-95 sm:flex"
          >
            <span className="font-display text-sm font-medium">Suivant</span>
            <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
          </button>
          <button
            onClick={goNext}
            aria-label="Suivant"
            className="glass grid h-12 w-12 place-items-center rounded-full text-lavande-700 transition hover:scale-110 hover:text-rose-500 active:scale-95 sm:hidden"
          >
            <ArrowRight size={20} />
          </button>
        </motion.nav>
      )}

      {entered && (
        <MusicPlayer
          playing={music.playing}
          muted={music.muted}
          volume={music.volume}
          onToggle={music.toggle}
          onMute={music.toggleMute}
          onVolume={music.setVol}
        />
      )}
    </>
  )
}
