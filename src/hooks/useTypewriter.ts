import { useEffect, useRef, useState } from 'react'

/**
 * Typewriter effect that reveals `text` character by character.
 * Returns the visible substring and a `done` flag.
 */
export function useTypewriter(text: string, speed = 42, startDelay = 0) {
  const [out, setOut] = useState('')
  const [done, setDone] = useState(false)
  const ref = useRef<number | null>(null)

  useEffect(() => {
    setOut('')
    setDone(false)
    let i = 0
    let timer: ReturnType<typeof setTimeout>
    const begin = setTimeout(() => {
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
    }, startDelay)

    return () => {
      clearTimeout(begin)
      clearTimeout(timer)
      if (ref.current) cancelAnimationFrame(ref.current)
    }
  }, [text, speed, startDelay])

  return { out, done }
}
