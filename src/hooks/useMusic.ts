import { useCallback, useEffect, useRef, useState } from 'react'
import { Howl } from 'howler'
import { config } from '@/config/content'

export function useMusic() {
  const howlRef = useRef<Howl | null>(null)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(false)
  const [volume, setVolume] = useState<number>(config.musique.volume)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const h = new Howl({
      src: [config.musique.src],
      loop: true,
      volume: config.musique.volume,
      html5: true,
      onload: () => setReady(true),
      onplay: () => setPlaying(true),
      onpause: () => setPlaying(false),
    })
    howlRef.current = h
    return () => {
      h.unload()
      howlRef.current = null
    }
  }, [])

  const play = useCallback(() => {
    howlRef.current?.play()
  }, [])

  const pause = useCallback(() => {
    howlRef.current?.pause()
  }, [])

  const toggle = useCallback(() => {
    if (!howlRef.current) return
    if (playing) howlRef.current.pause()
    else howlRef.current.play()
  }, [playing])

  const toggleMute = useCallback(() => {
    if (!howlRef.current) return
    const next = !muted
    setMuted(next)
    howlRef.current.mute(next)
  }, [muted])

  const setVol = useCallback((v: number) => {
    setVolume(v)
    howlRef.current?.volume(v)
  }, [])

  return { playing, muted, volume, ready, play, pause, toggle, toggleMute, setVol }
}
