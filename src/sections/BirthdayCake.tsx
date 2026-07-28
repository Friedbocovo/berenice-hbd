import { motion, AnimatePresence } from 'framer-motion'
import { useState, useCallback } from 'react'
import confetti from 'canvas-confetti'
import { config } from '@/config/content'
import { Reveal, SectionTitle } from '@/components/motion'

interface Candle { lit: boolean }

export function BirthdayCake() {
  const [candles, setCandles] = useState<Candle[]>(
    Array.from({ length: config.gateau.nbBougies }, () => ({ lit: true })),
  )
  const [celebrated, setCelebrated] = useState(false)

  const allOut = candles.every((c) => !c.lit)

  const blow = useCallback(() => {
    setCandles((cs) => cs.map(() => ({ lit: false })))
    setCelebrated(true)
    const end = Date.now() + 1400
    const colors = ['#ff7aa0', '#9d72ff', '#7dd3fc', '#f5c344']
    const frame = () => {
      confetti({ particleCount: 6, angle: 60, spread: 70, origin: { x: 0, y: 0.7 }, colors })
      confetti({ particleCount: 6, angle: 120, spread: 70, origin: { x: 1, y: 0.7 }, colors })
      if (Date.now() < end) requestAnimationFrame(frame)
    }
    frame()
    confetti({ particleCount: 120, spread: 100, origin: { y: 0.6 }, colors })
    // Applaudissements synthétisés (WebAudio)
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)()
      const noise = ctx.createBuffer(1, ctx.sampleRate * 1.2, ctx.sampleRate)
      const data = noise.getChannelData(0)
      for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / data.length, 2)
      const src = ctx.createBufferSource()
      src.buffer = noise
      const gain = ctx.createGain()
      gain.gain.value = 0.18
      src.connect(gain).connect(ctx.destination)
      src.start()
    } catch { /* ignore */ }
  }, [])

  const relight = () => {
    setCandles((cs) => cs.map(() => ({ lit: true })))
    setCelebrated(false)
  }

  return (
    <section className="section-shell">
      <SectionTitle eyebrow="Le gâteau" title={config.gateau.titre} subtitle={config.gateau.sousTit} />

      <Reveal amount={0.25}>
        <div className="glass mx-auto flex max-w-xl flex-col items-center rounded-3xl p-10">
          {/* Gâteau réaliste en SVG */}
          <svg viewBox="0 0 340 280" className="w-full max-w-md drop-shadow-2xl">
            <defs>
              {/* Glaçage crème */}
              <linearGradient id="frosting" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#fff8fb" />
                <stop offset="0.5" stopColor="#ffeaf2" />
                <stop offset="1" stopColor="#ffd0e0" />
              </linearGradient>
              {/* Génoise rose */}
              <linearGradient id="sponge" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#ffc9d9" />
                <stop offset="0.5" stopColor="#ff9fbf" />
                <stop offset="1" stopColor="#e87a9c" />
              </linearGradient>
              {/* Génoise violet */}
              <linearGradient id="sponge2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#e9d8ff" />
                <stop offset="0.5" stopColor="#c9a5ff" />
                <stop offset="1" stopColor="#9d72ff" />
              </linearGradient>
              {/* Assiette */}
              <linearGradient id="plate" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#f0fbff" />
                <stop offset="1" stopColor="#bae6fd" />
              </linearGradient>
              <radialGradient id="plateShade" cx="0.5" cy="0.5" r="0.5">
                <stop offset="0.7" stopColor="#bae6fd" stopOpacity="0" />
                <stop offset="1" stopColor="#7dd3fc" stopOpacity="0.4" />
              </radialGradient>
              {/* Flamme */}
              <radialGradient id="flame" cx="0.5" cy="0.4" r="0.5">
                <stop offset="0" stopColor="#fff8c0" />
                <stop offset="0.4" stopColor="#ffd97a" />
                <stop offset="0.8" stopColor="#f5a23a" />
                <stop offset="1" stopColor="#e07a2e" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="flameCore" cx="0.5" cy="0.5" r="0.5">
                <stop offset="0" stopColor="#ffffff" />
                <stop offset="0.6" stopColor="#fff3a0" stopOpacity="0.8" />
                <stop offset="1" stopColor="#fff3a0" stopOpacity="0" />
              </radialGradient>
              {/* Lueur de flamme */}
              <radialGradient id="glow" cx="0.5" cy="0.5" r="0.5">
                <stop offset="0" stopColor="#ffd97a" stopOpacity="0.5" />
                <stop offset="1" stopColor="#ffd97a" stopOpacity="0" />
              </radialGradient>
              {/* Ombre sous le gâteau */}
              <radialGradient id="cakeShadow" cx="0.5" cy="0.5" r="0.5">
                <stop offset="0" stopColor="#9d72ff" stopOpacity="0.3" />
                <stop offset="1" stopColor="#9d72ff" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Ombre portée */}
            <ellipse cx="170" cy="252" rx="135" ry="10" fill="url(#cakeShadow)" />

            {/* Assiette */}
            <ellipse cx="170" cy="248" rx="140" ry="16" fill="url(#plate)" />
            <ellipse cx="170" cy="248" rx="140" ry="16" fill="url(#plateShade)" />
            <ellipse cx="170" cy="244" rx="132" ry="13" fill="none" stroke="#ffffff" strokeWidth="1.5" opacity="0.7" />

            {/* === Étage du bas (génoise rose) === */}
            <rect x="50" y="170" width="220" height="72" rx="6" fill="url(#sponge)" />
            {/* Tranche de génoise (lignes horizontales subtiles) */}
            <line x1="50" y1="186" x2="270" y2="186" stroke="#e87a9c" strokeWidth="0.6" opacity="0.4" />
            <line x1="50" y1="206" x2="270" y2="206" stroke="#e87a9c" strokeWidth="0.6" opacity="0.4" />
            <line x1="50" y1="226" x2="270" y2="226" stroke="#e87a9c" strokeWidth="0.6" opacity="0.4" />

            {/* Glaçage qui coule sur l'étage du bas */}
            <path
              d="M50 170 Q60 178 70 172 Q80 184 90 174 Q100 186 110 176 Q120 188 130 178 Q140 190 150 180 Q160 192 170 182 Q180 190 190 180 Q200 192 210 182 Q220 190 230 180 Q240 192 250 182 Q260 190 270 180 L270 170 Z"
              fill="url(#frosting)"
            />
            {/* Gouttes de glaçage plus longues */}
            <path d="M75 176 Q73 188 76 196 Q79 188 77 176 Z" fill="url(#frosting)" />
            <path d="M125 182 Q123 196 126 204 Q129 196 127 182 Z" fill="url(#frosting)" />
            <path d="M175 184 Q173 198 176 206 Q179 198 177 184 Z" fill="url(#frosting)" />
            <path d="M225 180 Q223 194 226 202 Q229 194 227 180 Z" fill="url(#frosting)" />

            {/* Cerises décoratives sur l'étage du bas */}
            <g>
              <circle cx="80" cy="178" r="5" fill="#e63d6e" />
              <ellipse cx="78.5" cy="176" rx="1.5" ry="1" fill="#ff9fbf" opacity="0.8" />
              <path d="M80 173 Q82 170 84 168" stroke="#5b8c3a" strokeWidth="1.2" fill="none" />
            </g>
            <g>
              <circle cx="260" cy="178" r="5" fill="#e63d6e" />
              <ellipse cx="258.5" cy="176" rx="1.5" ry="1" fill="#ff9fbf" opacity="0.8" />
              <path d="M260 173 Q258 170 256 168" stroke="#5b8c3a" strokeWidth="1.2" fill="none" />
            </g>

            {/* === Étage du milieu (génoise violet) === */}
            <rect x="85" y="118" width="150" height="56" rx="5" fill="url(#sponge2)" />
            <line x1="85" y1="132" x2="235" y2="132" stroke="#9d72ff" strokeWidth="0.6" opacity="0.35" />
            <line x1="85" y1="150" x2="235" y2="150" stroke="#9d72ff" strokeWidth="0.6" opacity="0.35" />

            {/* Glaçage qui coule sur l'étage du milieu */}
            <path
              d="M85 118 Q95 126 105 120 Q115 130 125 122 Q135 132 145 124 Q155 134 165 126 Q175 132 185 124 Q195 134 205 126 Q215 132 225 124 Q235 134 235 122 L235 118 Z"
              fill="url(#frosting)"
            />
            <path d="M105 124 Q103 134 106 140 Q109 134 107 124 Z" fill="url(#frosting)" />
            <path d="M155 128 Q153 140 156 146 Q159 140 157 128 Z" fill="url(#frosting)" />
            <path d="M205 124 Q203 136 206 142 Q209 136 207 124 Z" fill="url(#frosting)" />

            {/* Petites perles de sucre décoratives */}
            <circle cx="100" cy="148" r="2.5" fill="#fff" opacity="0.9" />
            <circle cx="120" cy="155" r="2.5" fill="#ffd97a" opacity="0.9" />
            <circle cx="145" cy="150" r="2.5" fill="#fff" opacity="0.9" />
            <circle cx="170" cy="158" r="2.5" fill="#ffd97a" opacity="0.9" />
            <circle cx="195" cy="150" r="2.5" fill="#fff" opacity="0.9" />
            <circle cx="220" cy="155" r="2.5" fill="#ffd97a" opacity="0.9" />

            {/* === Étage du haut (génoise rose) === */}
            <rect x="120" y="78" width="80" height="42" rx="5" fill="url(#sponge)" />
            <line x1="120" y1="92" x2="200" y2="92" stroke="#e87a9c" strokeWidth="0.6" opacity="0.4" />

            {/* Glaçage qui coule sur l'étage du haut */}
            <path
              d="M120 78 Q128 86 136 80 Q144 88 152 82 Q160 90 168 84 Q176 88 184 82 Q192 90 200 84 L200 78 Z"
              fill="url(#frosting)"
            />
            <path d="M135 84 Q133 92 136 96 Q139 92 137 84 Z" fill="url(#frosting)" />
            <path d="M168 86 Q166 94 169 98 Q172 94 170 86 Z" fill="url(#frosting)" />
            <path d="M185 84 Q183 92 186 96 Q189 92 187 84 Z" fill="url(#frosting)" />

            {/* Cerise centrale sur le dessus */}
            <g>
              <circle cx="160" cy="74" r="6" fill="#e63d6e" />
              <ellipse cx="158" cy="72" rx="2" ry="1.2" fill="#ff9fbf" opacity="0.8" />
              <path d="M160 68 Q163 64 166 62" stroke="#5b8c3a" strokeWidth="1.5" fill="none" />
              <ellipse cx="167" cy="61" rx="3" ry="1.5" fill="#7fb86a" transform="rotate(20 167 61)" />
            </g>

            {/* === Bougies === */}
            {candles.map((c, i) => {
              const total = candles.length
              const spacing = 16
              const startX = 160 - ((total - 1) * spacing) / 2
              const x = startX + i * spacing
              const baseY = 78
              const candleColors = ['#ff7aa0', '#9d72ff', '#7dd3fc', '#f5c344', '#ff9fbf']
              const candleColor = candleColors[i % candleColors.length]
              return (
                <g key={i}>
                  {/* Corps de bougie */}
                  <rect x={x - 2.5} y={baseY - 32} width="5" height="32" rx="1.5" fill={candleColor} />
                  {/* Rayures spiralées */}
                  <line x1={x - 2.5} y1={baseY - 26} x2={x + 2.5} y2={baseY - 22} stroke="#ffffff" strokeWidth="0.8" opacity="0.6" />
                  <line x1={x - 2.5} y1={baseY - 18} x2={x + 2.5} y2={baseY - 14} stroke="#ffffff" strokeWidth="0.8" opacity="0.6" />
                  <line x1={x - 2.5} y1={baseY - 10} x2={x + 2.5} y2={baseY - 6} stroke="#ffffff" strokeWidth="0.8" opacity="0.6" />
                  {/* Mèche */}
                  <line x1={x} y1={baseY - 32} x2={x} y2={baseY - 37} stroke="#5b3a1a" strokeWidth="1.5" />

                  {/* Lueur autour de la flamme */}
                  {c.lit && (
                    <motion.circle
                      cx={x}
                      cy={baseY - 44}
                      r="14"
                      fill="url(#glow)"
                      animate={{ opacity: [0.5, 0.8, 0.5], r: [13, 16, 13] }}
                      transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
                    />
                  )}

                  <AnimatePresence>
                    {c.lit && (
                      <motion.g
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{ transformOrigin: `${x}px ${baseY - 37}px` }}
                      >
                        {/* Flamme extérieure */}
                        <motion.path
                          d={`M${x} ${baseY - 56} Q${x - 5} ${baseY - 48} ${x} ${baseY - 37} Q${x + 5} ${baseY - 48} ${x} ${baseY - 56} Z`}
                          fill="url(#flame)"
                          animate={{
                            d: [
                              `M${x} ${baseY - 56} Q${x - 5} ${baseY - 48} ${x} ${baseY - 37} Q${x + 5} ${baseY - 48} ${x} ${baseY - 56} Z`,
                              `M${x} ${baseY - 58} Q${x - 6} ${baseY - 49} ${x} ${baseY - 37} Q${x + 6} ${baseY - 49} ${x} ${baseY - 58} Z`,
                              `M${x} ${baseY - 55} Q${x - 4} ${baseY - 47} ${x} ${baseY - 37} Q${x + 4} ${baseY - 47} ${x} ${baseY - 55} Z`,
                              `M${x} ${baseY - 57} Q${x - 5} ${baseY - 48} ${x} ${baseY - 37} Q${x + 5} ${baseY - 48} ${x} ${baseY - 57} Z`,
                            ],
                          }}
                          transition={{ duration: 0.4, repeat: Infinity }}
                        />
                        {/* Cœur de flamme */}
                        <motion.ellipse
                          cx={x}
                          cy={baseY - 45}
                          rx="2.5"
                          ry="5"
                          fill="url(#flameCore)"
                          animate={{ ry: [5, 6, 4, 5.5], cy: [baseY - 45, baseY - 47, baseY - 44, baseY - 46] }}
                          transition={{ duration: 0.5, repeat: Infinity }}
                        />
                      </motion.g>
                    )}
                  </AnimatePresence>

                  {/* Fumée quand éteint */}
                  {!c.lit && (
                    <motion.circle
                      key="smoke"
                      cx={x}
                      initial={{ cy: baseY - 37, opacity: 0.5, r: 2 }}
                      animate={{ cy: baseY - 64, opacity: 0, r: 7 }}
                      transition={{ duration: 1.6 }}
                      fill="#bda3ff"
                    />
                  )}
                </g>
              )
            })}
          </svg>

          <div className="mt-6 flex flex-col items-center gap-3">
            {!allOut ? (
              <button onClick={blow} className="btn-primary">
                🌬️ Souffler les bougies
              </button>
            ) : (
              <button onClick={relight} className="btn-primary">
                🔥 Rallumer les bougies
              </button>
            )}
            <AnimatePresence>
              {celebrated && allOut && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="font-display text-lg font-medium text-gradient-gold"
                >
                  Vœu exaucé ! 🎉
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
