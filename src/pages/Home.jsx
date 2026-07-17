import { Link } from 'react-router-dom'
import { Lock, CheckCircle2, Star } from 'lucide-react'
import Chloe from '../components/Chloe'
import ProgressBar from '../components/ProgressBar'
import { UNITS, getUnitProgress } from '../data/units'
import { useGameStore } from '../store/gameStore'
import { pick, useT } from '../lib/i18n'
import { useEffect } from 'react'

export default function Home() {
  const uiLang = useGameStore((s) => s.uiLang)
  const childName = useGameStore((s) => s.childName)
  const completedLessons = useGameStore((s) => s.completedLessons)
  const unlockedUnits = useGameStore((s) => s.unlockedUnits)
  const isUnitTestUnlocked = useGameStore((s) => s.isUnitTestUnlocked)
  const touchStreak = useGameStore((s) => s.touchStreak)
  const t = useT(uiLang)

  useEffect(() => {
    touchStreak()
  }, [touchStreak])

  return (
    <div className="space-y-6">
      <section className="flex flex-col sm:flex-row items-center gap-4 card-kid p-4 sm:p-5">
        <Chloe
          mood="wave"
          size="md"
          message={
            uiLang === 'en'
              ? `Hi ${childName || 'friend'}! Pick a lesson 🌟`
              : `Ciao ${childName || 'amico'}! Scegli una lezione 🌟`
          }
        />
        <div className="flex-1 text-center sm:text-left">
          <h2 className="text-2xl font-black text-chloe-purple">
            {uiLang === 'en' ? 'Your learning path' : 'Il tuo percorso'}
          </h2>
          <p className="font-bold text-chloe-ink/60 mt-1">
            {uiLang === 'en'
              ? 'Complete lessons to unlock the next unit!'
              : "Completa le lezioni per sbloccare l'unità successiva!"}
          </p>
        </div>
      </section>

      <div className="relative space-y-8">
        {/* Decorative path line */}
        <div
          className="absolute left-8 top-4 bottom-4 w-1 bg-gradient-to-b from-violet-300 via-pink-300 to-emerald-300 rounded-full hidden sm:block"
          aria-hidden
        />

        {UNITS.map((unit, uIdx) => {
          const unlocked = unlockedUnits.includes(unit.id)
          const prog = getUnitProgress(unit, completedLessons)
          const testReady = isUnitTestUnlocked(unit.id)
          const testDone = completedLessons.includes(unit.unitTest.id)

          return (
            <section
              key={unit.id}
              className={`relative sm:pl-16 ${!unlocked ? 'opacity-70' : ''}`}
            >
              <div
                className="absolute left-5 top-6 w-7 h-7 rounded-full border-4 border-white shadow hidden sm:flex items-center justify-center text-sm"
                style={{ background: unlocked ? unit.color : '#d1d5db' }}
                aria-hidden
              >
                {unlocked ? unit.emoji : '🔒'}
              </div>

              <div className="card-kid overflow-hidden">
                <div
                  className="px-4 py-3 flex items-center justify-between gap-2"
                  style={{ background: `${unit.color}22` }}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-3xl" aria-hidden>
                      {unit.emoji}
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-xl font-black truncate">
                        {uIdx + 1}. {pick(unit.title, uiLang)}
                      </h3>
                      <p className="text-sm font-bold text-chloe-ink/60 truncate">
                        {pick(unit.description, uiLang)}
                      </p>
                    </div>
                  </div>
                  {!unlocked && (
                    <span className="inline-flex items-center gap-1 font-extrabold text-sm text-chloe-ink/50">
                      <Lock className="w-4 h-4" /> {t('locked')}
                    </span>
                  )}
                </div>

                <div className="p-4 space-y-3">
                  <ProgressBar
                    value={prog.done}
                    max={prog.total}
                    label={`${prog.done}/${prog.total}`}
                    showPct
                    color="bg-chloe-purple"
                  />

                  <ul className="space-y-2">
                    {unit.lessons.map((lesson, lIdx) => {
                      const done = completedLessons.includes(lesson.id)
                      // Sequential unlock within unit: first lesson free, next needs previous
                      const prevDone =
                        lIdx === 0 ||
                        completedLessons.includes(unit.lessons[lIdx - 1].id)
                      const canPlay = unlocked && prevDone

                      return (
                        <li key={lesson.id}>
                          {canPlay ? (
                            <Link
                              to={`/lesson/${unit.id}/${lesson.id}`}
                              className="flex items-center gap-3 rounded-2xl border-2 border-violet-100 bg-white hover:border-chloe-purple hover:bg-violet-50 px-3 py-3 transition-colors min-h-[56px]"
                            >
                              <span
                                className="flex h-10 w-10 items-center justify-center rounded-full font-black text-white shrink-0"
                                style={{ background: unit.color }}
                              >
                                {done ? (
                                  <CheckCircle2 className="w-6 h-6" />
                                ) : (
                                  lIdx + 1
                                )}
                              </span>
                              <div className="flex-1 min-w-0">
                                <p className="font-extrabold truncate">
                                  {pick(lesson.title, uiLang)}
                                </p>
                                <p className="text-xs font-bold text-chloe-ink/50">
                                  {lesson.exercises.length}{' '}
                                  {uiLang === 'en' ? 'exercises' : 'esercizi'}
                                  {done ? ` · ${t('completed')}` : ''}
                                </p>
                              </div>
                              <span className="btn-kid btn-primary px-3 py-2 text-sm shrink-0">
                                {done ? '↻' : t('startLesson')}
                              </span>
                            </Link>
                          ) : (
                            <div className="flex items-center gap-3 rounded-2xl border-2 border-gray-100 bg-gray-50 px-3 py-3 min-h-[56px] opacity-70">
                              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-300 text-white shrink-0">
                                <Lock className="w-5 h-5" />
                              </span>
                              <p className="font-extrabold text-chloe-ink/50 truncate">
                                {pick(lesson.title, uiLang)}
                              </p>
                            </div>
                          )}
                        </li>
                      )
                    })}

                    {/* Unit test */}
                    <li>
                      {unlocked && testReady ? (
                        <Link
                          to={`/lesson/${unit.id}/${unit.unitTest.id}?test=1`}
                          className="flex items-center gap-3 rounded-2xl border-2 border-amber-200 bg-amber-50 hover:border-amber-400 px-3 py-3 transition-colors min-h-[56px]"
                        >
                          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-400 text-white shrink-0">
                            {testDone ? (
                              <CheckCircle2 className="w-6 h-6" />
                            ) : (
                              <Star className="w-6 h-6" />
                            )}
                          </span>
                          <div className="flex-1 min-w-0">
                            <p className="font-extrabold truncate">
                              {pick(unit.unitTest.title, uiLang)}
                            </p>
                            <p className="text-xs font-bold text-amber-700/70">
                              {t('unitTest')}
                              {testDone ? ` · ${t('completed')}` : ''}
                            </p>
                          </div>
                          <span className="btn-kid btn-success px-3 py-2 text-sm shrink-0">
                            {testDone ? '↻' : t('startTest')}
                          </span>
                        </Link>
                      ) : (
                        <div className="flex items-center gap-3 rounded-2xl border-2 border-gray-100 bg-gray-50 px-3 py-3 min-h-[56px] opacity-70">
                          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-300 text-white shrink-0">
                            <Lock className="w-5 h-5" />
                          </span>
                          <p className="font-extrabold text-chloe-ink/50">
                            {t('unitTest')} — {t('locked')}
                          </p>
                        </div>
                      )}
                    </li>
                  </ul>
                </div>
              </div>
            </section>
          )
        })}
      </div>
    </div>
  )
}
