import { Rainbow, Sparkles } from 'lucide-react'
import { useGameStore } from '../store/gameStore'
import { useT } from '../lib/i18n'

/**
 * Toggle between classic Chloe theme and LGBTQ+ rainbow theme.
 */
export default function ThemeToggle({ compact = false }) {
  const theme = useGameStore((s) => s.theme)
  const setTheme = useGameStore((s) => s.setTheme)
  const uiLang = useGameStore((s) => s.uiLang)
  const t = useT(uiLang)
  const isRainbow = theme === 'rainbow'

  return (
    <button
      type="button"
      className={`inline-flex items-center gap-1.5 rounded-full font-extrabold transition-transform active:scale-95 ${
        compact
          ? 'px-2.5 py-1 text-xs border-2'
          : 'px-3 py-2 text-sm border-2'
      } ${
        isRainbow
          ? 'border-transparent text-white shadow-md btn-rainbow'
          : 'border-violet-200 bg-white text-chloe-purple hover:bg-violet-50'
      }`}
      onClick={() => setTheme(isRainbow ? 'classic' : 'rainbow')}
      aria-pressed={isRainbow}
      title={t('rainbowTheme')}
    >
      {isRainbow ? (
        <Sparkles className="w-4 h-4" aria-hidden />
      ) : (
        <Rainbow className="w-4 h-4" aria-hidden />
      )}
      {!compact && (
        <span>{isRainbow ? t('themeClassic') : t('themeRainbow')}</span>
      )}
      {compact && <span aria-hidden>{isRainbow ? '✨' : '🏳️‍🌈'}</span>}
    </button>
  )
}
