import { Heart } from 'lucide-react'
import { useGameStore } from '../store/gameStore'

export default function HeartBar({ className = '' }) {
  const hearts = useGameStore((s) => s.hearts)
  const max = useGameStore((s) => s.MAX_HEARTS)

  return (
    <div
      className={`flex items-center gap-1 ${className}`}
      role="img"
      aria-label={`${hearts} cuori su ${max}`}
    >
      {Array.from({ length: max }).map((_, i) => {
        const filled = i < hearts
        return (
          <Heart
            key={i}
            className={`w-6 h-6 sm:w-7 sm:h-7 transition-all ${
              filled
                ? 'fill-heart text-heart'
                : 'fill-transparent text-gray-300'
            } ${!filled && i === hearts ? 'animate-heart-break' : ''}`}
            aria-hidden
          />
        )
      })}
    </div>
  )
}
