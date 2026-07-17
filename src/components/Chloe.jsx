import { SHOP_ITEMS } from '../data/shop'
import { useGameStore } from '../store/gameStore'

/**
 * Chloe mascot — friendly owl.
 * mood: idle | happy | think | sad | celebrate | wave
 */
const MOOD_MSG = {
  idle: { it: 'Ciao! Pronto a imparare?', en: 'Hi! Ready to learn?' },
  happy: { it: 'Fantastico!', en: 'Fantastic!' },
  think: { it: 'Hmm… ci penso…', en: 'Hmm… thinking…' },
  sad: { it: 'Nessun problema, riproviamo!', en: "No worries, let's try again!" },
  celebrate: { it: 'Yay! Hai fatto un ottimo lavoro!', en: 'Yay! You did great!' },
  wave: { it: 'Benvenuto/a!', en: 'Welcome!' },
  encourage: {
    it: 'Ce la puoi fare, un passo alla volta!',
    en: 'You can do it, one step at a time!',
  },
}

export default function Chloe({
  mood = 'idle',
  size = 'md',
  showBubble = true,
  message,
  className = '',
}) {
  const equippedSkin = useGameStore((s) => s.equippedSkin)
  const equippedHat = useGameStore((s) => s.equippedHat)
  const uiLang = useGameStore((s) => s.uiLang)

  const skin = SHOP_ITEMS.find((i) => i.id === equippedSkin) || SHOP_ITEMS[0]
  const hat = equippedHat
    ? SHOP_ITEMS.find((i) => i.id === equippedHat)
    : null

  const bodyColor = skin.color || '#FFD93D'
  const sizes = {
    sm: { box: 72, font: 40 },
    md: { box: 110, font: 64 },
    lg: { box: 150, font: 88 },
    xl: { box: 190, font: 110 },
  }
  const s = sizes[size] || sizes.md

  const moodClass =
    mood === 'celebrate' || mood === 'happy'
      ? 'animate-bounce-soft'
      : mood === 'wave'
        ? 'animate-wiggle'
        : mood === 'sad'
          ? ''
          : 'animate-float'

  const bubbleText =
    message ||
    MOOD_MSG[mood]?.[uiLang] ||
    MOOD_MSG.idle[uiLang]

  // Simple emoji-based hat overlay
  const hatEmoji = hat?.emoji

  return (
    <div className={`flex flex-col items-center gap-2 ${className}`}>
      {showBubble && bubbleText && (
        <div
          className="relative max-w-[220px] rounded-2xl bg-white border-3 border-violet-200 px-4 py-2 text-center text-sm sm:text-base font-bold text-chloe-ink shadow-md animate-pop-in"
          role="status"
          aria-live="polite"
        >
          {bubbleText}
          <span
            className="absolute left-1/2 -bottom-2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white"
            aria-hidden
          />
        </div>
      )}

      <div
        className={`relative ${moodClass}`}
        style={{ width: s.box, height: s.box }}
        role="img"
        aria-label="Chloe, la civetta mascotte"
      >
        {/* Body */}
        <svg viewBox="0 0 120 120" width={s.box} height={s.box} aria-hidden>
          {/* Wings */}
          <ellipse cx="22" cy="62" rx="16" ry="22" fill={bodyColor} opacity="0.9" />
          <ellipse cx="98" cy="62" rx="16" ry="22" fill={bodyColor} opacity="0.9" />
          {/* Body */}
          <ellipse cx="60" cy="68" rx="34" ry="38" fill={bodyColor} />
          {/* Belly */}
          <ellipse cx="60" cy="78" rx="20" ry="22" fill="#FFF8DC" />
          {/* Head tufts */}
          <path d="M38 28 C30 12 18 14 16 24" stroke={bodyColor} strokeWidth="8" strokeLinecap="round" fill="none" />
          <path d="M82 28 C90 12 102 14 104 24" stroke={bodyColor} strokeWidth="8" strokeLinecap="round" fill="none" />
          {/* Face disc */}
          <circle cx="60" cy="52" r="28" fill={bodyColor} />
          {/* Eyes */}
          <circle cx="48" cy="50" r="12" fill="white" />
          <circle cx="72" cy="50" r="12" fill="white" />
          <circle
            cx={mood === 'think' ? 50 : 49}
            cy={mood === 'sad' ? 52 : 51}
            r="6"
            fill="#2D2A4A"
          />
          <circle
            cx={mood === 'think' ? 74 : 73}
            cy={mood === 'sad' ? 52 : 51}
            r="6"
            fill="#2D2A4A"
          />
          {/* Eye shine */}
          <circle cx="46" cy="48" r="2.2" fill="white" />
          <circle cx="70" cy="48" r="2.2" fill="white" />
          {/* Beak */}
          <path d="M54 58 L60 68 L66 58 Z" fill="#E85D04" />
          {/* Cheeks */}
          <circle cx="38" cy="58" r="5" fill="#FF8FAB" opacity="0.55" />
          <circle cx="82" cy="58" r="5" fill="#FF8FAB" opacity="0.55" />
          {/* Smile / mouth based on mood */}
          {mood === 'sad' ? (
            <path d="M52 74 Q60 70 68 74" stroke="#2D2A4A" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          ) : mood === 'celebrate' || mood === 'happy' ? (
            <path d="M50 72 Q60 82 70 72" stroke="#2D2A4A" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          ) : (
            <path d="M52 73 Q60 78 68 73" stroke="#2D2A4A" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          )}
          {/* Feet */}
          <ellipse cx="48" cy="106" rx="10" ry="5" fill="#E85D04" />
          <ellipse cx="72" cy="106" rx="10" ry="5" fill="#E85D04" />
        </svg>

        {hatEmoji && (
          <span
            className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
            style={{ top: -8, fontSize: s.font * 0.35 }}
            aria-hidden
          >
            {hatEmoji}
          </span>
        )}
      </div>
    </div>
  )
}
