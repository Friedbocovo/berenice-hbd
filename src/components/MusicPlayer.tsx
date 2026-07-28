import { AnimatePresence, motion } from 'framer-motion'
import { Pause, Play, Volume2, VolumeX } from 'lucide-react'
import { config } from '@/config/content'

interface Props {
  playing: boolean
  muted: boolean
  volume: number
  onToggle: () => void
  onMute: () => void
  onVolume: (v: number) => void
}

export function MusicPlayer({ playing, muted, volume, onToggle, onMute, onVolume }: Props) {
  return (
    <AnimatePresence>
      <motion.div
        key="player"
        initial={{ opacity: 0, y: 24, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="glass fixed bottom-5 right-5 z-40 flex items-center gap-3 rounded-full px-3 py-2.5 sm:bottom-6 sm:right-6"
      >
        <button
          onClick={onToggle}
          aria-label={playing ? 'Pause' : 'Lecture'}
          className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-rose-400 to-lavande-400 text-white shadow-md transition-transform hover:scale-110 active:scale-95"
        >
          {playing ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
        </button>

        <div className="hidden min-w-0 sm:block">
          <p className="truncate text-xs font-medium text-lavande-700">{config.musique.titre}</p>
          <div className="mt-1 flex items-center gap-2">
            <button onClick={onMute} aria-label={muted ? 'Son activé' : 'Son coupé'} className="text-lavande-500 hover:text-lavande-700">
              {muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
            </button>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={muted ? 0 : volume}
              onChange={(e) => onVolume(Number(e.target.value))}
              aria-label="Volume"
              className="h-1 w-20 cursor-pointer appearance-none rounded-full bg-lavande-200 accent-rose-400"
            />
          </div>
        </div>

        {/* Equalizer dots */}
        <div className="flex h-5 items-end gap-0.5 pr-1">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="w-1 rounded-full bg-gradient-to-t from-rose-400 to-lavande-400"
              animate={playing && !muted ? { height: [4, 14, 6, 12, 4] } : { height: 4 }}
              transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }}
            />
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
