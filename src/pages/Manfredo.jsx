import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle2, Lock, MessageCircle, BookOpen, Star, Sparkles } from 'lucide-react'
import CharacterAvatar from '../components/CharacterAvatar'
import ProgressBar from '../components/ProgressBar'
import manfredoModule from '../modules/manfredo-alessandros'
import { getUnitProgress } from '../data/units'
import { useGameStore } from '../store/gameStore'
import { pick, useT } from '../lib/i18n'
import { speak } from '../lib/audio'

export default function Manfredo() {
  const uiLang = useGameStore((s) => s.uiLang)
  const completedLessons = useGameStore((s) => s.completedLessons)
  const unlockedUnits = useGameStore((s) => s.unlockedUnits)
  const isUnitTestUnlocked = useGameStore((s) => s.isUnitTestUnlocked)
  const soundEnabled = useGameStore((s) => s.parentSettings.soundEnabled)
  const t = useT(uiLang)

  const [sceneIdx, setSceneIdx] = useState(0)
  const [tab, setTab] = useState('lessons') // lessons | characters | dialogues | vocab

  const unit = manfredoModule.units[0]
  const unlocked = unlockedUnits.includes(unit.id)
  const prog = getUnitProgress(unit, completedLessons)
  const testReady = isUnitTestUnlocked(unit.id)
  const testDone = completedLessons.includes(unit.unitTest.id)
  const intro = manfredoModule.intro
  const scene = intro.scenes[sceneIdx]

  function playLine(text) {
    if (!soundEnabled || !text) return
    speak(text, uiLang === 'en' ? 'en' : 'it')
  }

  return (
    <div className="space-y-5">
      {/* Hero */}
      <section
        className="card-kid overflow-hidden relative"
        style={{ borderColor: '#f9a8d4' }}
      >
        <div
          className="absolute inset-0 opacity-90"
          style={{ background: manfredoModule.gradient }}
          aria-hidden
        />
        <div className="relative p-5 sm:p-6 text-white space-y-3">
          <div className="flex items-start gap-3">
            <CharacterAvatar characterId="manfredo" size="lg" />
            <div className="min-w-0 flex-1">
              <p className="font-extrabold text-white/90 text-sm flex items-center gap-1">
                <Sparkles className="w-4 h-4" /> {t('manfredoModule')}
              </p>
              <h2 className="text-2xl sm:text-3xl font-black drop-shadow-sm">
                {pick(intro.title, uiLang)}
              </h2>
              <p className="font-bold text-white/95 mt-1">
                {pick(intro.subtitle, uiLang)}
              </p>
            </div>
          </div>

          {/* Intro scene bubble */}
          <div className="bg-white/95 text-chloe-ink rounded-2xl p-4 shadow-lg animate-pop-in">
            <div className="flex items-center gap-2 mb-2">
              <CharacterAvatar characterId={scene.speakerId} size="xs" ring={false} />
              <span className="font-black text-sm text-chloe-purple">
                {pick(manfredoModule.characters[scene.speakerId]?.name, uiLang) ||
                  scene.speakerId}
              </span>
            </div>
            <p className="font-extrabold text-lg leading-snug">
              {pick(scene.text, uiLang)}
            </p>
            <div className="flex flex-wrap gap-2 mt-3">
              <button
                type="button"
                className="btn-kid btn-secondary px-3 py-2 text-sm"
                onClick={() => playLine(pick(scene.text, uiLang))}
              >
                🔊 {t('listen')}
              </button>
              <button
                type="button"
                className="btn-kid btn-primary px-3 py-2 text-sm"
                disabled={sceneIdx >= intro.scenes.length - 1}
                onClick={() =>
                  setSceneIdx((i) => Math.min(intro.scenes.length - 1, i + 1))
                }
              >
                {sceneIdx >= intro.scenes.length - 1 ? '✨' : t('continue')}
              </button>
              {sceneIdx > 0 && (
                <button
                  type="button"
                  className="btn-kid btn-secondary px-3 py-2 text-sm"
                  onClick={() => setSceneIdx((i) => Math.max(0, i - 1))}
                >
                  {t('back')}
                </button>
              )}
            </div>
            <div className="flex gap-1 mt-3 justify-center">
              {intro.scenes.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  aria-label={`Scene ${i + 1}`}
                  className={`h-2 rounded-full transition-all ${
                    i === sceneIdx ? 'w-6 bg-chloe-purple' : 'w-2 bg-violet-200'
                  }`}
                  onClick={() => setSceneIdx(i)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {[
          { id: 'lessons', label: t('lessons'), icon: Star },
          { id: 'characters', label: t('characters'), icon: Sparkles },
          { id: 'dialogues', label: t('dialogues'), icon: MessageCircle },
          { id: 'vocab', label: t('vocabulary'), icon: BookOpen },
        ].map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => setTab(id)}
            className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 font-extrabold text-sm whitespace-nowrap border-2 transition-all ${
              tab === id
                ? 'btn-rainbow text-white border-transparent shadow-md'
                : 'bg-white border-violet-100 text-chloe-ink/70 hover:border-pink-200'
            }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>

      {tab === 'lessons' && (
        <section className="card-kid overflow-hidden">
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
                  {pick(unit.title, uiLang)}
                </h3>
                <p className="text-sm font-bold text-chloe-ink/60 truncate">
                  {pick(unit.description, uiLang)}
                </p>
              </div>
            </div>
          </div>
          <div className="p-4 space-y-3">
            <ProgressBar
              value={prog.done}
              max={prog.total}
              label={`${prog.done}/${prog.total}`}
              showPct
              color="bg-gradient-to-r from-pink-400 via-amber-400 to-emerald-400"
            />
            <ul className="space-y-2">
              {unit.lessons.map((lesson, lIdx) => {
                const done = completedLessons.includes(lesson.id)
                const prevDone =
                  lIdx === 0 ||
                  completedLessons.includes(unit.lessons[lIdx - 1].id)
                const canPlay = unlocked && prevDone
                return (
                  <li key={lesson.id}>
                    {canPlay ? (
                      <Link
                        to={`/lesson/${unit.id}/${lesson.id}`}
                        className="flex items-center gap-3 rounded-2xl border-2 border-pink-100 bg-white hover:border-pink-400 hover:bg-pink-50 px-3 py-3 transition-all min-h-[56px] hover:scale-[1.01]"
                      >
                        <span
                          className="flex h-10 w-10 items-center justify-center rounded-full font-black text-white shrink-0"
                          style={{
                            background:
                              'linear-gradient(135deg,#ff6b9d,#a78bfa,#38bdf8)',
                          }}
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
                        <span className="btn-kid btn-rainbow px-3 py-2 text-sm shrink-0 text-white">
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
        </section>
      )}

      {tab === 'characters' && (
        <div className="grid gap-3 sm:grid-cols-2">
          {manfredoModule.characterList.map((c) => (
            <article
              key={c.id}
              className="card-kid p-4 space-y-2 hover:scale-[1.01] transition-transform"
              style={{ borderColor: `${c.color}55` }}
            >
              <div className="flex items-center gap-3">
                <CharacterAvatar characterId={c.iconKey} size="md" />
                <div>
                  <h3 className="font-black text-lg">{pick(c.name, uiLang)}</h3>
                  <p className="text-sm font-bold" style={{ color: c.color }}>
                    {pick(c.role, uiLang)}
                  </p>
                </div>
              </div>
              <p className="font-bold text-chloe-ink/70 text-sm">
                {pick(c.bio, uiLang)}
              </p>
              <p className="font-extrabold text-chloe-purple">
                “{pick(c.catchphrase, uiLang)}”
              </p>
            </article>
          ))}
        </div>
      )}

      {tab === 'dialogues' && (
        <div className="space-y-4">
          {manfredoModule.dialogues.map((dlg) => (
            <article key={dlg.id} className="card-kid p-4 space-y-3">
              <h3 className="font-black text-lg text-chloe-purple">
                {pick(dlg.title, uiLang)}{' '}
                <span className="text-xs font-bold text-chloe-ink/40">
                  · {dlg.level}
                </span>
              </h3>
              <ul className="space-y-2">
                {dlg.lines.map((line, i) => (
                  <li
                    key={`${dlg.id}-${i}`}
                    className="flex gap-2 items-start rounded-2xl bg-violet-50/80 px-3 py-2"
                  >
                    <CharacterAvatar
                      characterId={line.speakerId}
                      size="xs"
                      ring={false}
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-black text-chloe-ink/50">
                        {pick(
                          manfredoModule.characters[line.speakerId]?.name,
                          uiLang
                        )}
                      </p>
                      <p className="font-extrabold">
                        {uiLang === 'en' ? line.en : line.it}
                      </p>
                      <p className="text-sm font-bold text-chloe-ink/45">
                        {uiLang === 'en' ? line.it : line.en}
                      </p>
                    </div>
                    <button
                      type="button"
                      className="text-lg shrink-0"
                      aria-label={t('listen')}
                      onClick={() =>
                        playLine(uiLang === 'en' ? line.en : line.it)
                      }
                    >
                      🔊
                    </button>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      )}

      {tab === 'vocab' && (
        <div className="space-y-4">
          {manfredoModule.vocabLists.map((list) => (
            <section key={list.id} className="card-kid p-4 space-y-3">
              <h3 className="font-black text-lg">
                {pick(list.title, uiLang)}{' '}
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                  {list.level}
                </span>
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {list.words.map((w) => (
                  <li
                    key={w.id}
                    className="flex items-center gap-2 rounded-2xl border-2 border-violet-100 bg-white px-3 py-2"
                  >
                    <span className="text-2xl" aria-hidden>
                      {w.emoji}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="font-black truncate">{w.it}</p>
                      <p className="text-sm font-bold text-chloe-ink/50 truncate">
                        {w.en}
                      </p>
                    </div>
                    <button
                      type="button"
                      className="text-lg"
                      aria-label={t('listen')}
                      onClick={() => playLine(w.it)}
                    >
                      🔊
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
    </div>
  )
}
