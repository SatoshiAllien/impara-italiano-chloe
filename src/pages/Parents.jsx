import { useState } from 'react'
import { Shield } from 'lucide-react'
import Chloe from '../components/Chloe'
import { UNITS } from '../data/units'
import { useGameStore } from '../store/gameStore'
import { pick, useT } from '../lib/i18n'

export default function Parents() {
  const uiLang = useGameStore((s) => s.uiLang)
  const stats = useGameStore((s) => s.stats)
  const xp = useGameStore((s) => s.xp)
  const streak = useGameStore((s) => s.streak)
  const completedLessons = useGameStore((s) => s.completedLessons)
  const parentSettings = useGameStore((s) => s.parentSettings)
  const updateParentSettings = useGameStore((s) => s.updateParentSettings)
  const verifyParentPin = useGameStore((s) => s.verifyParentPin)
  const setParentPin = useGameStore((s) => s.setParentPin)
  const setDirection = useGameStore((s) => s.setDirection)
  const setUiLang = useGameStore((s) => s.setUiLang)
  const direction = useGameStore((s) => s.direction)
  const resetProgress = useGameStore((s) => s.resetProgress)
  const t = useT(uiLang)

  const [unlocked, setUnlocked] = useState(false)
  const [pin, setPin] = useState('')
  const [error, setError] = useState('')
  const [newPin, setNewPin] = useState('')

  const unlock = (e) => {
    e.preventDefault()
    if (verifyParentPin(pin)) {
      setUnlocked(true)
      setError('')
      setPin('')
    } else {
      setError(t('wrongPin'))
    }
  }

  if (!unlocked) {
    return (
      <div className="max-w-md mx-auto space-y-5 py-6">
        <Chloe
          mood="idle"
          size="md"
          message={
            uiLang === 'en'
              ? 'This area is for grown-ups only.'
              : "Quest'area è solo per i grandi."
          }
        />
        <form onSubmit={unlock} className="card-kid p-6 space-y-4">
          <div className="flex items-center gap-2 justify-center text-chloe-purple">
            <Shield className="w-6 h-6" />
            <h2 className="text-xl font-black">{t('parents')}</h2>
          </div>
          <p className="text-center font-bold text-chloe-ink/60 text-sm">
            {t('enterPin')}
            <br />
            <span className="text-xs opacity-70">
              ({uiLang === 'en' ? 'Demo default' : 'Demo predefinito'}: 1234)
            </span>
          </p>
          <input
            type="password"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={6}
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            className="w-full rounded-2xl border-3 border-violet-200 px-4 py-4 text-2xl font-black text-center tracking-[0.5em] focus:border-chloe-purple outline-none"
            placeholder="••••"
            autoComplete="off"
          />
          {error && (
            <p className="text-center font-bold text-rose-500" role="alert">
              {error}
            </p>
          )}
          <button type="submit" className="btn-kid btn-primary w-full">
            {uiLang === 'en' ? 'Unlock' : 'Sblocca'}
          </button>
        </form>
      </div>
    )
  }

  const minutes = Math.round(stats.timeSpentSec / 60)
  const accuracy =
    stats.totalCorrect + stats.totalWrong > 0
      ? Math.round(
          (stats.totalCorrect / (stats.totalCorrect + stats.totalWrong)) * 100
        )
      : 0

  const hardUnits = Object.entries(stats.difficultyByUnit || {})
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)

  return (
    <div className="space-y-5">
      <header className="card-kid p-5">
        <h2 className="text-2xl font-black text-chloe-purple flex items-center gap-2">
          <Shield className="w-6 h-6" /> {t('parents')}
        </h2>
        <p className="font-bold text-chloe-ink/60 mt-1 text-sm">
          {uiLang === 'en'
            ? 'Progress overview and kid-safe settings. No ads, no external links for children.'
            : 'Panoramica progressi e impostazioni sicure. Niente ads, niente link esterni per i bambini.'}
        </p>
      </header>

      <section className="card-kid p-5 space-y-3">
        <h3 className="text-xl font-black">{t('progress')}</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Metric label="XP" value={xp} />
          <Metric label={t('streak')} value={`${streak} 🔥`} />
          <Metric
            label={uiLang === 'en' ? 'Lessons' : 'Lezioni'}
            value={stats.lessonsCompleted}
          />
          <Metric label={t('timeSpent')} value={`${minutes} min`} />
          <Metric
            label={uiLang === 'en' ? 'Accuracy' : 'Precisione'}
            value={`${accuracy}%`}
          />
          <Metric
            label={uiLang === 'en' ? 'Correct' : 'Giuste'}
            value={stats.totalCorrect}
          />
          <Metric
            label={uiLang === 'en' ? 'Wrong' : 'Sbagliate'}
            value={stats.totalWrong}
          />
          <Metric
            label={uiLang === 'en' ? 'Activities' : 'Attività'}
            value={completedLessons.length}
          />
        </div>
      </section>

      <section className="card-kid p-5 space-y-3">
        <h3 className="text-xl font-black">{t('hardAreas')}</h3>
        {hardUnits.length === 0 ? (
          <p className="font-bold text-chloe-ink/50">
            {uiLang === 'en'
              ? 'Not enough data yet.'
              : 'Ancora pochi dati.'}
          </p>
        ) : (
          <ul className="space-y-2">
            {hardUnits.map(([unitId, wrongs]) => {
              const unit = UNITS.find((u) => u.id === unitId)
              return (
                <li
                  key={unitId}
                  className="flex justify-between rounded-xl bg-amber-50 border-2 border-amber-100 px-3 py-2 font-bold"
                >
                  <span>
                    {unit?.emoji} {unit ? pick(unit.title, uiLang) : unitId}
                  </span>
                  <span className="text-amber-700">
                    {wrongs} {uiLang === 'en' ? 'mistakes' : 'errori'}
                  </span>
                </li>
              )
            })}
          </ul>
        )}
      </section>

      <section className="card-kid p-5 space-y-4">
        <h3 className="text-xl font-black">{t('settings')}</h3>

        <Toggle
          label={t('timer')}
          checked={parentSettings.timerEnabled}
          onChange={(v) => updateParentSettings({ timerEnabled: v })}
          hint={
            uiLang === 'en'
              ? 'Off by default so kids never feel rushed.'
              : 'Disattivato di default: i bambini non devono sentirsi di fretta.'
          }
        />

        {parentSettings.timerEnabled && (
          <label className="block font-bold">
            {uiLang === 'en' ? 'Seconds per exercise' : 'Secondi per esercizio'}
            <input
              type="range"
              min={10}
              max={60}
              step={5}
              value={parentSettings.timerSeconds}
              onChange={(e) =>
                updateParentSettings({ timerSeconds: Number(e.target.value) })
              }
              className="w-full mt-2"
            />
            <span className="text-chloe-purple font-black">
              {parentSettings.timerSeconds}s
            </span>
          </label>
        )}

        <Toggle
          label={t('sound')}
          checked={parentSettings.soundEnabled}
          onChange={(v) => updateParentSettings({ soundEnabled: v })}
        />

        <Toggle
          label={uiLang === 'en' ? 'Gentle reminders' : 'Promemoria gentili'}
          checked={parentSettings.gentleReminders}
          onChange={(v) => updateParentSettings({ gentleReminders: v })}
        />

        <div className="space-y-2">
          <p className="font-extrabold">
            {uiLang === 'en' ? 'Learning language' : 'Lingua da imparare'}
          </p>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              className={`btn-kid px-4 ${direction === 'it-for-en' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setDirection('it-for-en')}
            >
              🇮🇹 Italiano
            </button>
            <button
              type="button"
              className={`btn-kid px-4 ${direction === 'en-for-it' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setDirection('en-for-it')}
            >
              🇬🇧 English
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <p className="font-extrabold">
            {uiLang === 'en' ? 'App language' : 'Lingua app'}
          </p>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              className={`btn-kid px-4 ${uiLang === 'it' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setUiLang('it')}
            >
              Italiano
            </button>
            <button
              type="button"
              className={`btn-kid px-4 ${uiLang === 'en' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setUiLang('en')}
            >
              English
            </button>
          </div>
        </div>

        <div className="space-y-2 pt-2 border-t-2 border-violet-100">
          <p className="font-extrabold">{t('pin')}</p>
          <div className="flex gap-2">
            <input
              type="password"
              inputMode="numeric"
              maxLength={6}
              value={newPin}
              onChange={(e) => setNewPin(e.target.value)}
              className="flex-1 rounded-2xl border-3 border-violet-200 px-3 py-3 font-bold text-center"
              placeholder={uiLang === 'en' ? 'New PIN' : 'Nuovo PIN'}
            />
            <button
              type="button"
              className="btn-kid btn-secondary px-4"
              onClick={() => {
                if (newPin.length >= 4) {
                  setParentPin(newPin)
                  setNewPin('')
                }
              }}
            >
              {t('save')}
            </button>
          </div>
        </div>

        <button
          type="button"
          className="btn-kid w-full bg-rose-100 text-rose-700 border-2 border-rose-200"
          onClick={() => {
            const ok = window.confirm(
              uiLang === 'en'
                ? 'Reset all progress? This cannot be undone.'
                : 'Azzera tutti i progressi? Non si può annullare.'
            )
            if (ok) resetProgress()
          }}
        >
          {t('resetProgress')}
        </button>
      </section>
    </div>
  )
}

function Metric({ label, value }) {
  return (
    <div className="rounded-2xl bg-violet-50 border-2 border-violet-100 p-3 text-center">
      <p className="text-xl font-black text-chloe-purple">{value}</p>
      <p className="text-xs font-bold text-chloe-ink/50">{label}</p>
    </div>
  )
}

function Toggle({ label, checked, onChange, hint }) {
  return (
    <label className="flex items-start gap-3 cursor-pointer">
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`mt-0.5 relative h-8 w-14 rounded-full transition-colors shrink-0 ${
          checked ? 'bg-chloe-purple' : 'bg-gray-300'
        }`}
      >
        <span
          className={`absolute top-1 left-1 h-6 w-6 rounded-full bg-white shadow transition-transform ${
            checked ? 'translate-x-6' : ''
          }`}
        />
      </button>
      <span>
        <span className="font-extrabold block">{label}</span>
        {hint && (
          <span className="text-xs font-bold text-chloe-ink/50">{hint}</span>
        )}
      </span>
    </label>
  )
}
