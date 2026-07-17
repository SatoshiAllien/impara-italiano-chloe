import { Link, useLocation, useNavigate } from 'react-router-dom'
import Chloe from '../components/Chloe'
import Confetti from '../components/Confetti'
import { useGameStore } from '../store/gameStore'
import { getBadge } from '../data/badges'
import { pick, useT } from '../lib/i18n'
import { getUnit } from '../data/units'

export default function LessonComplete() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const uiLang = useGameStore((s) => s.uiLang)
  const t = useT(uiLang)

  if (!state) {
    return (
      <div className="text-center py-12">
        <Link to="/" className="btn-kid btn-primary px-6">
          Home
        </Link>
      </div>
    )
  }

  const {
    xpEarned = 0,
    gemsEarned = 0,
    newBadges = [],
    perfect = false,
    unlockedUnit,
    correctCount = 0,
    totalCount = 0,
    unitTitle = '',
    lessonTitle = '',
  } = state

  const nextUnit = unlockedUnit ? getUnit(unlockedUnit) : null

  return (
    <div className="relative flex flex-col items-center text-center space-y-5 py-4">
      <Confetti active />
      <Chloe
        mood="celebrate"
        size="lg"
        message={
          perfect
            ? uiLang === 'en'
              ? 'Perfect lesson! You are a star! ⭐'
              : 'Lezione perfetta! Sei una stella! ⭐'
            : uiLang === 'en'
              ? 'Great job finishing the lesson!'
              : 'Che bravo/a! Lezione finita!'
        }
      />

      <div className="card-kid p-6 w-full max-w-md space-y-4 animate-pop-in">
        <h1 className="text-3xl font-black text-chloe-purple">{t('wellDone')}</h1>
        <p className="font-bold text-chloe-ink/70">
          {lessonTitle}
          {unitTitle ? ` · ${unitTitle}` : ''}
        </p>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-amber-50 border-2 border-amber-200 p-4">
            <div className="text-3xl" aria-hidden>
              ⭐
            </div>
            <p className="font-black text-2xl text-amber-700">+{xpEarned}</p>
            <p className="text-sm font-bold text-amber-700/70">{t('xp')}</p>
          </div>
          <div className="rounded-2xl bg-sky-50 border-2 border-sky-200 p-4">
            <div className="text-3xl" aria-hidden>
              💎
            </div>
            <p className="font-black text-2xl text-sky-700">+{gemsEarned}</p>
            <p className="text-sm font-bold text-sky-700/70">{t('gems')}</p>
          </div>
        </div>

        <p className="font-extrabold text-chloe-ink">
          {correctCount}/{totalCount}{' '}
          {uiLang === 'en' ? 'correct' : 'corrette'}
          {perfect ? ` · ${t('perfectBonus')}` : ''}
        </p>

        {newBadges.length > 0 && (
          <div className="space-y-2">
            <p className="font-black text-chloe-purple">
              {uiLang === 'en' ? 'New badges!' : 'Nuovi badge!'}
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {newBadges.map((id) => {
                const b = getBadge(id)
                if (!b) return null
                return (
                  <span
                    key={id}
                    className="inline-flex items-center gap-1 rounded-full bg-violet-100 border-2 border-violet-200 px-3 py-1 font-extrabold text-sm"
                  >
                    {b.emoji} {pick(b.name, uiLang)}
                  </span>
                )
              })}
            </div>
          </div>
        )}

        {nextUnit && (
          <div className="rounded-2xl bg-emerald-50 border-2 border-emerald-200 p-3 font-extrabold text-emerald-800">
            {t('nextUnit')} {nextUnit.emoji} {pick(nextUnit.title, uiLang)}
          </div>
        )}

        <div className="flex flex-col gap-2 pt-2">
          <button
            type="button"
            className="btn-kid btn-primary w-full"
            onClick={() => navigate('/')}
          >
            {t('home')}
          </button>
          <Link to="/shop" className="btn-kid btn-secondary w-full text-center">
            {t('shop')} 🛍️
          </Link>
        </div>
      </div>
    </div>
  )
}
