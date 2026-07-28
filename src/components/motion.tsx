import { motion, useScroll, useTransform, type Variants } from 'framer-motion'
import { type ReactNode, useRef } from 'react'

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 36 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.9, ease: 'easeOut' } },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

export const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
}

export function Reveal({
  children,
  className = '',
  variant = fadeUp,
  amount = 0.3,
}: {
  children: ReactNode
  className?: string
  variant?: Variants
  amount?: number
}) {
  return (
    <motion.div
      className={className}
      variants={variant}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
    >
      {children}
    </motion.div>
  )
}

/** Parallax wrapper that translates Y based on scroll position. */
export function Parallax({
  children,
  className = '',
  speed = 0.15,
}: {
  children: ReactNode
  className?: string
  speed?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [speed * 120, -speed * 120])
  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  )
}

export function SectionTitle({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string
  title: string
  subtitle?: string
}) {
  return (
    <div className="mb-14 text-center">
      {eyebrow && (
        <Reveal>
          <span className="eyebrow">{eyebrow}</span>
        </Reveal>
      )}
      <Reveal>
        <h2 className="font-display text-4xl font-semibold tracking-tight text-gradient sm:text-5xl md:text-6xl">
          {title}
        </h2>
      </Reveal>
      {subtitle && (
        <Reveal>
          <p className="mx-auto mt-4 max-w-xl text-base text-lavande-700/70 sm:text-lg">
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  )
}
