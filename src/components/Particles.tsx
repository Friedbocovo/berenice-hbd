import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  r: number
  vx: number
  vy: number
  hue: number
  alpha: number
  tw: number
}

const COLORS = [
  'rgba(255, 122, 160, ',
  'rgba(157, 114, 255, ',
  'rgba(125, 211, 252, ',
  'rgba(245, 195, 68, ',
]

export function Particles({ density = 0.00009 }: { density?: number }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w = (canvas.width = window.innerWidth)
    let h = (canvas.height = window.innerHeight)
    let raf = 0
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const count = Math.min(120, Math.max(28, Math.floor(w * h * density)))
    const parts: Particle[] = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 2.6 + 0.6,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      hue: Math.floor(Math.random() * COLORS.length),
      alpha: Math.random() * 0.5 + 0.2,
      tw: Math.random() * Math.PI * 2,
    }))

    const onResize = () => {
      w = canvas.width = window.innerWidth
      h = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', onResize)

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      for (const p of parts) {
        p.x += p.vx
        p.y += p.vy
        p.tw += 0.02
        if (p.x < -10) p.x = w + 10
        if (p.x > w + 10) p.x = -10
        if (p.y < -10) p.y = h + 10
        if (p.y > h + 10) p.y = -10
        const a = p.alpha * (0.6 + 0.4 * Math.sin(p.tw))
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 6)
        grad.addColorStop(0, COLORS[p.hue] + a + ')')
        grad.addColorStop(1, COLORS[p.hue] + '0)')
        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r * 6, 0, Math.PI * 2)
        ctx.fill()
      }
      raf = requestAnimationFrame(draw)
    }

    if (!reduce) raf = requestAnimationFrame(draw)
    else draw()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
    }
  }, [density])

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full"
    />
  )
}
