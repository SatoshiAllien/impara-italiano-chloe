import { useMemo } from 'react'

const COLORS = ['#7C5CFC', '#FFD93D', '#FF6B9D', '#6EE7B7', '#7DD3FC', '#FB923C']

/**
 * Lightweight CSS confetti — no external libs.
 */
export default function Confetti({ active = true, count = 40 }) {
  const pieces = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 0.8,
        duration: 2 + Math.random() * 2,
        color: COLORS[i % COLORS.length],
        size: 8 + Math.random() * 10,
        rotate: Math.random() * 360,
      })),
    [count]
  )

  if (!active) return null

  return (
    <div
      className="pointer-events-none fixed inset-0 z-50 overflow-hidden"
      aria-hidden
    >
      {pieces.map((p) => (
        <span
          key={p.id}
          className="absolute top-0 rounded-sm"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size * 0.6,
            background: p.color,
            transform: `rotate(${p.rotate}deg)`,
            animation: `confetti-fall ${p.duration}s ease-in ${p.delay}s both`,
          }}
        />
      ))}
    </div>
  )
}
