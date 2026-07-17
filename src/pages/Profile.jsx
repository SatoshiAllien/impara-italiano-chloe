import Chloe from '../components/Chloe'
import ProgressBar from '../components/ProgressBar'
import { BADGES } from '../data/badges'
import { useGameStore, getLevel, xpToNextLevel } from '../store/gameStore'
import { pick, useT } from '../lib/i18n'

export default function Profile() {
  const uiLang = useGameStore((s) => s.uiLang)
  const childName = useGameStore((s) => s.childName)
  const xp = useGameStore((s) => s.xp)
  const gems = useGameStore((s) => s.gems)
  const streak = useGameStore((s) => s.streak)
  const badges = useGameStore((s) => s.badges)
  const stats = useGameStore((s) => s.stats)
  const completedLessons = useGameStore((s) => s.completedLessons)
  const t = useT(uiLang)

  const level = getLevel(xp)
  const next = xpToNextLevel(xp)
  const minutes = Math.round(stats.timeSpentSec / 60)

  return (
    <div className="space-y-5">
      <section className="card-kid p-5 flex flex-col sm:flex-row items-center gap-4">
        <Chloe
          mood="happy"
          size="md"
          message={
            uiLang === 'en'
              ? `You're level ${level}, ${childName}!`
              : `Sei al livello ${level}, ${childName}!`
          }
        />
        <div className="flex-1 w-full space-y-3">
          <h2 className="text-2xl font-black text-chloe-purple text-center sm:text-left">
            {childName || 'Profilo'}
          </h2>
          <div className="grid grid-cols-3 gap-2 text-center">
            <Stat emoji="⭐" value={xp} label={t('xp')} />
            <Stat emoji="💎" value={gems} label={t('gems')} />
            <Stat emoji="🔥" value={streak} label={t('streak')} />
          </div>
          <div>
            <p className="font-extrabold mb-1">
              {t('level')} {level}
            </p>
            <ProgressBar
              value={next.current}
              max={next.needed}
              showPct
              color="bg-chloe-yellow"
            />
          </div>
        </div>
      </section>

      <section className="card-kid p-5 space-y-3">
        <h3 className="text-xl font-black">{t('progress')}</h3>
        <ul className="grid grid-cols-2 gap-3 font-bold">
          <li className="rounded-2xl bg-violet-50 p-3">
            <p className="text-2xl font-black text-chloe-purple">
              {stats.lessonsCompleted}
            </p>
            <p className="text-sm text-chloe-ink/60">{t('lessons')}</p>
          </li>
          <li className="rounded-2xl bg-emerald-50 p-3">
            <p className="text-2xl font-black text-emerald-600">
              {stats.totalCorrect}
            </p>
            <p className="text-sm text-chloe-ink/60">
              {uiLang === 'en' ? 'Correct answers' : 'Risposte giuste'}
            </p>
          </li>
          <li className="rounded-2xl bg-sky-50 p-3">
            <p className="text-2xl font-black text-sky-600">{minutes}</p>
            <p className="text-sm text-chloe-ink/60">{t('minutes')}</p>
          </li>
          <li className="rounded-2xl bg-amber-50 p-3">
            <p className="text-2xl font-black text-amber-600">
              {completedLessons.length}
            </p>
            <p className="text-sm text-chloe-ink/60">
              {uiLang === 'en' ? 'Activities done' : 'Attività fatte'}
            </p>
          </li>
        </ul>
      </section>

      <section className="card-kid p-5 space-y-3">
        <h3 className="text-xl font-black">{t('badges')}</h3>
        {badges.length === 0 ? (
          <p className="font-bold text-chloe-ink/50">{t('noBadges')}</p>
        ) : null}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {BADGES.map((b) => {
            const unlocked = badges.includes(b.id)
            return (
              <div
                key={b.id}
                className={`rounded-2xl border-2 p-3 text-center ${
                  unlocked
                    ? 'border-violet-200 bg-white'
                    : 'border-gray-100 bg-gray-50 opacity-45 grayscale'
                }`}
              >
                <div className="text-3xl mb-1">{b.emoji}</div>
                <p className="font-extrabold text-sm">{pick(b.name, uiLang)}</p>
                <p className="text-xs font-bold text-chloe-ink/50 mt-1">
                  {pick(b.description, uiLang)}
                </p>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}

function Stat({ emoji, value, label }) {
  return (
    <div className="rounded-2xl bg-white border-2 border-violet-100 p-2">
      <div className="text-xl" aria-hidden>
        {emoji}
      </div>
      <p className="text-xl font-black">{value}</p>
      <p className="text-xs font-bold text-chloe-ink/50">{label}</p>
    </div>
  )
}
