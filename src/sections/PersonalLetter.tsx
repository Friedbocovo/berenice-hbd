import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { config } from '@/config/content'
import { Reveal, SectionTitle } from '@/components/motion'

/** Types out text char-by-char. Returns the visible substring and done flag. */
function useTypedParagraph(text: string, start: boolean, speed = 28) {
  const [out, setOut] = useState('')
  const [done, setDone] = useState(false)
  useEffect(() => {
    if (!start) return
    setOut('')
    setDone(false)
    let i = 0
    let timer: ReturnType<typeof setTimeout>
    const tick = () => {
      i++
      setOut(text.slice(0, i))
      if (i >= text.length) {
        setDone(true)
        return
      }
      timer = setTimeout(tick, speed)
    }
    tick()
    return () => clearTimeout(timer)
  }, [text, start, speed])
  return { out, done }
}

export function PersonalLetter() {
  // Full letter as one flowing text
  const fullText = config.lettre.paragraphes.join('\n\n')
  const { out, done } = useTypedParagraph(fullText, true, 22)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Auto-scroll the typed text container as it grows
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    el.scrollTop = el.scrollHeight
  }, [out])

  return (
    <section className="section-shell">
      <SectionTitle eyebrow="Message personnel" title={config.lettre.titre} />
      <Reveal amount={0.2}>
        <div className="glass relative mx-auto max-w-2xl rounded-3xl px-8 py-12 sm:px-12 sm:py-16">
          <div className="pointer-events-none absolute -top-6 left-1/2 -translate-x-1/2">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-rose-300 to-lavande-300 text-2xl shadow-lg">
              💌
            </span>
          </div>
          <div
            ref={scrollRef}
            className="max-h-[55vh] overflow-y-auto pr-2"
          >
            <p
              className={`whitespace-pre-line text-center font-sans text-lg leading-relaxed text-lavande-800/85 sm:text-xl ${done ? '' : 'caret'}`}
            >
              {out}
            </p>
          </div>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: done ? 1 : 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="mx-auto mt-10 h-px w-2/3 origin-center bg-gradient-to-r from-transparent via-rose-300 to-transparent"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: done ? 1 : 0 }}
            transition={{ duration: 0.6 }}
            className="mt-6 text-right font-display text-lg italic text-rose-400"
          >
            — Pour {config.prenom}
          </motion.p>
        </div>
      </Reveal>
    </section>
  )
}
