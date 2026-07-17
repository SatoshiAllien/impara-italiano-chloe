import { useState, useEffect, useMemo } from 'react'
import { Volume2 } from 'lucide-react'
import { pick } from '../../lib/i18n'
import { playPronunciation } from '../../lib/audio'
import { useGameStore } from '../../store/gameStore'

/**
 * Renders one exercise and reports answer via onAnswered(isCorrect, detail).
 * Parent controls Check/Continue flow via checked + revealCorrect props.
 */

function SpeakButton({ text, lang = 'it', audioUrl }) {
  const t = useGameStore((s) => s.uiLang)
  const label = t === 'en' ? 'Listen' : 'Ascolta'
  return (
    <button
      type="button"
      className="btn-kid btn-secondary inline-flex items-center gap-2 px-4"
      onClick={() => playPronunciation({ text, lang, audioUrl })}
      aria-label={label}
    >
      <Volume2 className="w-5 h-5" />
      {label}
    </button>
  )
}

function OptionCard({ selected, correct, wrong, disabled, onClick, children, className = '' }) {
  let border = 'border-violet-200 hover:border-chloe-purple'
  if (selected && !correct && !wrong) border = 'border-chloe-purple bg-violet-50'
  if (correct) border = 'border-success bg-green-50'
  if (wrong) border = 'border-rose-400 bg-rose-50'

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`card-kid p-4 text-center font-extrabold text-lg transition-all min-h-[72px] ${border} ${className} ${
        disabled && !correct && !wrong ? 'opacity-60' : ''
      }`}
    >
      {children}
    </button>
  )
}

/* ─── Multiple choice with images/emoji ─── */
function MultipleChoiceImage({ exercise, uiLang, locked, selection, setSelection, reveal }) {
  const options = exercise.options || []
  return (
    <div className="space-y-4">
      <p className="text-xl sm:text-2xl font-black text-center text-chloe-ink">
        {pick(exercise.prompt, uiLang)}
      </p>
      {exercise.word && (
        <div className="flex justify-center">
          <SpeakButton
            text={exercise.word.it}
            lang="it"
            audioUrl={exercise.word.audioUrl}
          />
        </div>
      )}
      <div className="grid grid-cols-2 gap-3">
        {options.map((opt) => {
          const isSel = selection === opt.id
          const isCorrect = reveal && opt.correct
          const isWrong = reveal && isSel && !opt.correct
          return (
            <OptionCard
              key={opt.id}
              selected={isSel}
              correct={isCorrect}
              wrong={isWrong}
              disabled={locked}
              onClick={() => setSelection(opt.id)}
            >
              <div className="text-4xl sm:text-5xl mb-2" aria-hidden>
                {opt.emoji}
              </div>
              <div>{pick(opt.label, uiLang)}</div>
            </OptionCard>
          )
        })}
      </div>
    </div>
  )
}

/* ─── Audio match ─── */
function AudioMatch({ exercise, uiLang, locked, selection, setSelection, reveal }) {
  const word = exercise.word
  return (
    <div className="space-y-4">
      <p className="text-xl sm:text-2xl font-black text-center">
        {pick(exercise.prompt, uiLang)}
      </p>
      <div className="flex justify-center">
        <button
          type="button"
          className="btn-kid btn-primary px-8 py-4 text-2xl animate-pulse-glow"
          onClick={() =>
            playPronunciation({
              text: word?.it,
              lang: 'it',
              audioUrl: word?.audioUrl,
            })
          }
        >
          <Volume2 className="w-8 h-8 inline mr-2" />
          🔊
        </button>
      </div>
      <div className="grid gap-3">
        {(exercise.options || []).map((opt) => {
          const isSel = selection === opt.id
          return (
            <OptionCard
              key={opt.id}
              selected={isSel}
              correct={reveal && opt.correct}
              wrong={reveal && isSel && !opt.correct}
              disabled={locked}
              onClick={() => setSelection(opt.id)}
            >
              {pick(opt.label, uiLang)}
            </OptionCard>
          )
        })}
      </div>
    </div>
  )
}

/* ─── True / False ─── */
function TrueFalse({ exercise, uiLang, locked, selection, setSelection, reveal }) {
  return (
    <div className="space-y-4">
      <p className="text-xl sm:text-2xl font-black text-center">
        {pick(exercise.statement || exercise.prompt, uiLang)}
      </p>
      <div className="grid grid-cols-2 gap-3">
        {[
          { id: true, label: uiLang === 'en' ? 'True ✓' : 'Vero ✓', emoji: '✅' },
          { id: false, label: uiLang === 'en' ? 'False ✗' : 'Falso ✗', emoji: '❌' },
        ].map((opt) => {
          const isSel = selection === opt.id
          const isCorrect = reveal && exercise.correct === opt.id
          const isWrong = reveal && isSel && exercise.correct !== opt.id
          return (
            <OptionCard
              key={String(opt.id)}
              selected={isSel}
              correct={isCorrect}
              wrong={isWrong}
              disabled={locked}
              onClick={() => setSelection(opt.id)}
              className="text-2xl py-6"
            >
              <div className="text-4xl mb-2">{opt.emoji}</div>
              {opt.label}
            </OptionCard>
          )
        })}
      </div>
      {reveal && exercise.explanation && (
        <p className="text-center font-bold text-chloe-purple animate-pop-in">
          {pick(exercise.explanation, uiLang)}
        </p>
      )}
    </div>
  )
}

/* ─── Translation (typed) ─── */
function Translation({ exercise, uiLang, locked, selection, setSelection, reveal }) {
  const isCorrect =
    reveal &&
    normalize(selection) &&
    [exercise.answer, ...(exercise.alternatives || [])]
      .map(normalize)
      .includes(normalize(selection))

  return (
    <div className="space-y-4">
      <p className="text-xl sm:text-2xl font-black text-center">
        {pick(exercise.prompt, uiLang)}
      </p>
      <div className="card-kid p-4 text-center">
        <p className="text-2xl font-black text-chloe-purple">{exercise.source}</p>
      </div>
      <label className="block">
        <span className="sr-only">Risposta</span>
        <input
          type="text"
          value={selection || ''}
          disabled={locked}
          onChange={(e) => setSelection(e.target.value)}
          className={`w-full text-xl font-bold rounded-2xl border-3 px-4 py-4 text-center outline-none ${
            reveal
              ? isCorrect
                ? 'border-success bg-green-50'
                : 'border-rose-400 bg-rose-50'
              : 'border-violet-200 focus:border-chloe-purple'
          }`}
          placeholder={uiLang === 'en' ? 'Type your answer…' : 'Scrivi la risposta…'}
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
        />
      </label>
      {reveal && !isCorrect && (
        <p className="text-center font-bold text-success animate-pop-in">
          {uiLang === 'en' ? 'Correct answer:' : 'Risposta corretta:'}{' '}
          <span className="text-chloe-purple">{exercise.answer}</span>
        </p>
      )}
    </div>
  )
}

function normalize(s) {
  return String(s || '')
    .trim()
    .toLowerCase()
    .replace(/[!.?¿¡]/g, '')
}

/* ─── Fill blank ─── */
function FillBlank({ exercise, uiLang, locked, selection, setSelection, reveal }) {
  const sentence = pick(exercise.sentence, uiLang)
  return (
    <div className="space-y-4">
      <p className="text-xl sm:text-2xl font-black text-center">
        {pick(exercise.prompt, uiLang)}
      </p>
      <p className="text-2xl font-black text-center text-chloe-ink">
        {sentence.replace('____', selection ? `「${selection}」` : '______')}
      </p>
      <div className="flex flex-wrap justify-center gap-2">
        {(exercise.options || []).map((opt) => {
          const isSel = selection === opt
          const isCorrect = reveal && opt === exercise.blank
          const isWrong = reveal && isSel && opt !== exercise.blank
          return (
            <OptionCard
              key={opt}
              selected={isSel}
              correct={isCorrect}
              wrong={isWrong}
              disabled={locked}
              onClick={() => setSelection(opt)}
              className="px-5 py-3 min-h-[56px]"
            >
              {opt}
            </OptionCard>
          )
        })}
      </div>
      {exercise.translation && (
        <p className="text-center text-sm font-bold text-chloe-ink/50">
          {pick(exercise.translation, uiLang === 'it' ? 'en' : 'it')}
        </p>
      )}
    </div>
  )
}

/* ─── Order words ─── */
function OrderWords({ exercise, uiLang, locked, selection, setSelection, reveal }) {
  const pool = useMemo(() => {
    // Shuffle once per exercise id
    const words = [...(exercise.words || [])]
    for (let i = words.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[words[i], words[j]] = [words[j], words[i]]
    }
    return words
  }, [exercise.id, exercise.words])

  const selected = Array.isArray(selection) ? selection : []

  const pickWord = (word, idx) => {
    if (locked) return
    setSelection([...selected, { word, idx }])
  }

  const removeWord = (pos) => {
    if (locked) return
    setSelection(selected.filter((_, i) => i !== pos))
  }

  const answerWords = selected.map((s) => s.word)
  const isCorrect =
    reveal &&
    answerWords.length === exercise.answer.length &&
    answerWords.every((w, i) => w === exercise.answer[i])

  return (
    <div className="space-y-4">
      <p className="text-xl sm:text-2xl font-black text-center">
        {pick(exercise.prompt, uiLang)}
      </p>
      <div
        className={`min-h-[72px] card-kid p-3 flex flex-wrap gap-2 justify-center items-center ${
          reveal
            ? isCorrect
              ? 'border-success bg-green-50'
              : 'border-rose-400 bg-rose-50'
            : ''
        }`}
      >
        {selected.length === 0 && (
          <span className="text-chloe-ink/40 font-bold">
            {uiLang === 'en' ? 'Tap words below…' : 'Tocca le parole qui sotto…'}
          </span>
        )}
        {selected.map((s, i) => (
          <button
            key={`${s.word}-${s.idx}`}
            type="button"
            disabled={locked}
            onClick={() => removeWord(i)}
            className="btn-kid btn-primary px-3 py-2 text-base"
          >
            {s.word}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        {pool.map((word, idx) => {
          const used = selected.some((s) => s.idx === idx)
          if (used) {
            return (
              <span
                key={`${word}-${idx}`}
                className="px-4 py-2 rounded-xl bg-violet-50 text-transparent border-2 border-dashed border-violet-100 select-none"
              >
                {word}
              </span>
            )
          }
          return (
            <button
              key={`${word}-${idx}`}
              type="button"
              disabled={locked}
              onClick={() => pickWord(word, idx)}
              className="btn-kid btn-secondary px-4 py-2 text-base"
            >
              {word}
            </button>
          )
        })}
      </div>
      {reveal && !isCorrect && (
        <p className="text-center font-bold text-success animate-pop-in">
          {exercise.answer.join(' ')}
        </p>
      )}
      {exercise.translation && (
        <p className="text-center text-sm font-bold text-chloe-ink/50">
          {pick(exercise.translation, uiLang)}
        </p>
      )}
    </div>
  )
}

/* ─── Match word-image (tap pairs) ─── */
function MatchWordImage({ exercise, uiLang, locked, selection, setSelection, reveal }) {
  const pairs = exercise.pairs || []
  const words = useMemo(
    () =>
      pairs
        .map((p, i) => ({ ...p, id: `w${i}`, kind: 'word' }))
        .sort(() => Math.random() - 0.5),
    [exercise.id]
  )
  const images = useMemo(
    () =>
      pairs
        .map((p, i) => ({ ...p, id: `i${i}`, kind: 'image', pairIndex: i }))
        .sort(() => Math.random() - 0.5),
    [exercise.id]
  )

  // selection: { matched: number[], pending: { kind, pairIndex } | null }
  const state = selection || { matched: [], pending: null }

  const onTap = (kind, pairIndex) => {
    if (locked) return
    if (state.matched.includes(pairIndex)) return

    if (!state.pending) {
      setSelection({ matched: state.matched, pending: { kind, pairIndex } })
      return
    }
    if (state.pending.kind === kind) {
      setSelection({ matched: state.matched, pending: { kind, pairIndex } })
      return
    }
    // different kinds — check match
    if (state.pending.pairIndex === pairIndex) {
      setSelection({
        matched: [...state.matched, pairIndex],
        pending: null,
      })
    } else {
      setSelection({ matched: state.matched, pending: null })
    }
  }

  return (
    <div className="space-y-4">
      <p className="text-xl sm:text-2xl font-black text-center">
        {pick(exercise.prompt, uiLang)}
      </p>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          {words.map((w, i) => {
            const pairIndex = pairs.findIndex(
              (p) => pick(p.word, 'it') === pick(w.word, 'it')
            )
            const matched = state.matched.includes(pairIndex)
            const pending =
              state.pending?.kind === 'word' &&
              state.pending?.pairIndex === pairIndex
            return (
              <OptionCard
                key={w.id}
                selected={pending}
                correct={reveal && matched}
                disabled={locked || matched}
                onClick={() => onTap('word', pairIndex)}
                className={matched ? 'opacity-40' : ''}
              >
                {pick(w.word, uiLang)}
              </OptionCard>
            )
          })}
        </div>
        <div className="space-y-2">
          {images.map((img) => {
            const matched = state.matched.includes(img.pairIndex)
            const pending =
              state.pending?.kind === 'image' &&
              state.pending?.pairIndex === img.pairIndex
            return (
              <OptionCard
                key={img.id}
                selected={pending}
                correct={reveal && matched}
                disabled={locked || matched}
                onClick={() => onTap('image', img.pairIndex)}
                className={matched ? 'opacity-40' : ''}
              >
                <span className="text-4xl">{img.emoji}</span>
              </OptionCard>
            )
          })}
        </div>
      </div>
      <p className="text-center text-sm font-bold text-chloe-ink/50">
        {state.matched.length}/{pairs.length}{' '}
        {uiLang === 'en' ? 'matched' : 'abbinati'}
      </p>
    </div>
  )
}

/* ─── Scoring helpers ─── */
export function isAnswerCorrect(exercise, selection) {
  if (selection == null || selection === '') return false
  switch (exercise.type) {
    case 'multiple-choice-image':
    case 'audio-match': {
      const opt = (exercise.options || []).find((o) => o.id === selection)
      return !!opt?.correct
    }
    case 'true-false':
      return selection === exercise.correct
    case 'translation': {
      const ok = [exercise.answer, ...(exercise.alternatives || [])].map(normalize)
      return ok.includes(normalize(selection))
    }
    case 'fill-blank':
      return selection === exercise.blank
    case 'order-words': {
      if (!Array.isArray(selection)) return false
      const words = selection.map((s) => (typeof s === 'string' ? s : s.word))
      return (
        words.length === exercise.answer.length &&
        words.every((w, i) => w === exercise.answer[i])
      )
    }
    case 'match-word-image': {
      const matched = selection?.matched || []
      return matched.length === (exercise.pairs || []).length
    }
    default:
      return false
  }
}

export function canCheck(exercise, selection) {
  if (selection == null || selection === '') return false
  switch (exercise.type) {
    case 'order-words':
      return Array.isArray(selection) && selection.length === (exercise.words || []).length
    case 'match-word-image':
      return (selection?.matched || []).length === (exercise.pairs || []).length
    case 'translation':
      return String(selection).trim().length > 0
    default:
      return selection !== null && selection !== undefined && selection !== ''
  }
}

export default function ExerciseRenderer({
  exercise,
  selection,
  setSelection,
  locked,
  reveal,
}) {
  const uiLang = useGameStore((s) => s.uiLang)

  // Reset handled by parent when exercise changes
  useEffect(() => {
    // auto-play audio for audio-match
    if (exercise?.type === 'audio-match' && exercise.word) {
      const t = setTimeout(() => {
        playPronunciation({
          text: exercise.word.it,
          lang: 'it',
          audioUrl: exercise.word.audioUrl,
        })
      }, 400)
      return () => clearTimeout(t)
    }
  }, [exercise?.id])

  if (!exercise) return null

  const props = { exercise, uiLang, locked, selection, setSelection, reveal }

  switch (exercise.type) {
    case 'multiple-choice-image':
      return <MultipleChoiceImage {...props} />
    case 'audio-match':
      return <AudioMatch {...props} />
    case 'true-false':
      return <TrueFalse {...props} />
    case 'translation':
      return <Translation {...props} />
    case 'fill-blank':
      return <FillBlank {...props} />
    case 'order-words':
      return <OrderWords {...props} />
    case 'match-word-image':
      return <MatchWordImage {...props} />
    default:
      return (
        <p className="text-center font-bold">
          Tipo esercizio non supportato: {exercise.type}
        </p>
      )
  }
}
