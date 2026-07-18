import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { X } from 'lucide-react'
import Chloe from '../components/Chloe'
import HeartBar from '../components/HeartBar'
import ProgressBar from '../components/ProgressBar'
import ExerciseRenderer, {
  canCheck,
  isAnswerCorrect,
} from '../components/exercises/ExerciseRenderer'
import { getLesson, getUnit } from '../data/units'
import { useGameStore } from '../store/gameStore'
import { pick, useT } from '../lib/i18n'
import { playTone, unlockAudio } from '../lib/audio'

export default function Lesson() {
  const { unitId, lessonId } = useParams()
  const [search] = useSearchParams()
  const isUnitTest = search.get('test') === '1'
  const navigate = useNavigate()

  const unit = getUnit(unitId)
  const lesson = getLesson(unitId, lessonId)

  const uiLang = useGameStore((s) => s.uiLang)
  const hearts = useGameStore((s) => s.hearts)
  const resetHearts = useGameStore((s) => s.resetHearts)
  const recordAnswer = useGameStore((s) => s.recordAnswer)
  const completeLesson = useGameStore((s) => s.completeLesson)
  const addTimeSpent = useGameStore((s) => s.addTimeSpent)
  const soundEnabled = useGameStore((s) => s.parentSettings.soundEnabled)
  const timerEnabled = useGameStore((s) => s.parentSettings.timerEnabled)
  const timerSeconds = useGameStore((s) => s.parentSettings.timerSeconds)
  const t = useT(uiLang)

  const exercises = lesson?.exercises || []
  const [index, setIndex] = useState(0)
  const [selection, setSelection] = useState(null)
  const [phase, setPhase] = useState('answer') // answer | feedback | hearts-out
  const [lastCorrect, setLastCorrect] = useState(null)
  const [correctCount, setCorrectCount] = useState(0)
  const [timerLeft, setTimerLeft] = useState(null)
  const startedAt = useRef(Date.now())

  const exercise = exercises[index]

  useEffect(() => {
    unlockAudio()
    resetHearts()
    startedAt.current = Date.now()
    return () => {
      const sec = Math.round((Date.now() - startedAt.current) / 1000)
      if (sec > 0) addTimeSpent(sec)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lessonId])

  // Optional timer per exercise
  useEffect(() => {
    if (!timerEnabled || phase !== 'answer' || !exercise) {
      setTimerLeft(null)
      return
    }
    setTimerLeft(timerSeconds)
    const id = setInterval(() => {
      setTimerLeft((prev) => {
        if (prev == null) return prev
        if (prev <= 1) {
          clearInterval(id)
          // time's up — treat as wrong if not answered
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(id)
  }, [index, timerEnabled, timerSeconds, phase, exercise?.id])

  useEffect(() => {
    if (timerLeft === 0 && phase === 'answer') {
      handleCheck(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timerLeft])

  // Reset selection when exercise changes
  useEffect(() => {
    setSelection(null)
    setPhase('answer')
    setLastCorrect(null)
  }, [index, exercise?.id])

  const progressValue = index + (phase === 'feedback' ? 1 : 0)

  const chloeMood = useMemo(() => {
    if (phase === 'hearts-out') return 'encourage'
    if (phase !== 'feedback') return 'think'
    return lastCorrect ? 'happy' : 'sad'
  }, [phase, lastCorrect])

  if (!unit || !lesson) {
    return (
      <div className="text-center space-y-4 py-12">
        <p className="font-black text-xl">Lezione non trovata</p>
        <Link to="/" className="btn-kid btn-primary inline-flex px-6">
          Home
        </Link>
      </div>
    )
  }

  function handleCheck(fromTimer = false) {
    if (phase !== 'answer') return
    if (!fromTimer && !canCheck(exercise, selection)) return

    const correct = fromTimer ? false : isAnswerCorrect(exercise, selection)
    setLastCorrect(correct)
    setPhase('feedback')

    if (correct) {
      setCorrectCount((c) => c + 1)
      if (soundEnabled) playTone('success')
    } else {
      if (soundEnabled) playTone('error')
    }

    recordAnswer({ correct, unitId })
    const remaining = useGameStore.getState().hearts
    if (!correct && remaining <= 0) {
      // show hearts-out after brief feedback
      setTimeout(() => setPhase('hearts-out'), 900)
    }
  }

  function handleContinue() {
    if (phase === 'hearts-out') {
      navigate('/')
      return
    }
    if (hearts <= 0 && !lastCorrect) {
      setPhase('hearts-out')
      return
    }

    if (index >= exercises.length - 1) {
      // Finish lesson
      const result = completeLesson({
        lessonId: lesson.id,
        unitId: unit.id,
        correctCount,
        totalCount: exercises.length,
        isUnitTest,
      })
      navigate('/lesson-complete', {
        state: {
          ...result,
          correctCount,
          totalCount: exercises.length,
          unitTitle: pick(unit.title, uiLang),
          lessonTitle: pick(lesson.title, uiLang),
          unitId: unit.id,
        },
      })
      return
    }

    setIndex((i) => i + 1)
  }

  if (phase === 'hearts-out') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] space-y-6 px-2">
        <Chloe mood="encourage" size="lg" message={t('chloeEncourage')} />
        <div className="card-kid p-6 text-center space-y-3 max-w-md">
          <h2 className="text-2xl font-black text-chloe-purple">
            {t('heartsGone')}
          </h2>
          <p className="font-bold text-chloe-ink/70">
            {uiLang === 'en'
              ? 'You can try this lesson again anytime — no pressure!'
              : 'Puoi riprovare questa lezione quando vuoi — senza pressione!'}
          </p>
          <button
            type="button"
            className="btn-kid btn-primary w-full"
            onClick={() => {
              resetHearts()
              navigate('/')
            }}
          >
            {t('tryAgain')}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-[calc(100dvh-8rem)]">
      {/* Top lesson bar */}
      <div className="flex items-center gap-3 mb-4">
        <Link
          to="/"
          className="btn-kid btn-secondary p-2 min-w-0"
          aria-label={t('skip')}
        >
          <X className="w-6 h-6" />
        </Link>
        <ProgressBar
          className="flex-1"
          value={progressValue}
          max={exercises.length}
          color="bg-chloe-mint"
        />
        <HeartBar />
      </div>

      {timerEnabled && timerLeft != null && phase === 'answer' && (
        <div className="mb-3 text-center">
          <span
            className={`inline-block font-black rounded-full px-3 py-1 text-sm ${
              timerLeft <= 5
                ? 'bg-rose-100 text-rose-600'
                : 'bg-violet-100 text-chloe-purple'
            }`}
          >
            ⏱️ {timerLeft}s
          </span>
        </div>
      )}

      <div className="flex-1 space-y-4">
        <div className="flex justify-center">
          <Chloe mood={chloeMood} size="sm" showBubble={phase === 'feedback'} />
        </div>

        <div className="card-kid p-4 sm:p-6">
          <ExerciseRenderer
            exercise={exercise}
            selection={selection}
            setSelection={setSelection}
            locked={phase !== 'answer'}
            reveal={phase === 'feedback'}
          />
        </div>

        {phase === 'feedback' && (
          <div
            className={`rounded-2xl px-4 py-3 font-extrabold text-center animate-pop-in ${
              lastCorrect
                ? 'bg-green-100 text-green-800 border-2 border-green-300'
                : 'bg-amber-50 text-amber-900 border-2 border-amber-200'
            }`}
            role="status"
          >
            {lastCorrect ? t('correct') : t('wrong')}
          </div>
        )}
      </div>

      <div className="sticky bottom-20 sm:bottom-24 pt-4 pb-2 bg-gradient-to-t from-white/80 via-white/50 to-transparent backdrop-blur-[2px]">
        {phase === 'answer' ? (
          <button
            type="button"
            className="btn-kid btn-primary w-full"
            disabled={!canCheck(exercise, selection)}
            onClick={() => handleCheck(false)}
          >
            {t('check')}
          </button>
        ) : (
          <button
            type="button"
            className="btn-kid btn-success w-full"
            onClick={handleContinue}
          >
            {index >= exercises.length - 1
              ? uiLang === 'en'
                ? 'Finish 🎉'
                : 'Fine 🎉'
              : t('continue')}
          </button>
        )}
      </div>
    </div>
  )
}
