import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Chloe from '../components/Chloe'
import { useGameStore } from '../store/gameStore'
import { unlockAudio } from '../lib/audio'

export default function Onboarding() {
  const completeOnboarding = useGameStore((s) => s.completeOnboarding)
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [name, setName] = useState('')
  const [direction, setDirection] = useState('it-for-en')
  const [uiLang, setUiLang] = useState('it')

  const finish = () => {
    unlockAudio()
    completeOnboarding({
      childName: name.trim() || (uiLang === 'en' ? 'Friend' : 'Amico'),
      direction,
      uiLang,
    })
    navigate('/', { replace: true })
  }

  return (
    <div className="min-h-dvh flex flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-md space-y-6">
        <Chloe
          mood={step === 0 ? 'wave' : step === 2 ? 'celebrate' : 'happy'}
          size="lg"
          message={
            step === 0
              ? uiLang === 'en'
                ? "Hi! I'm Chloe the owl 🦉"
                : 'Ciao! Io sono Chloe la civetta 🦉'
              : step === 1
                ? uiLang === 'en'
                  ? 'What should I call you?'
                  : 'Come ti chiami?'
                : uiLang === 'en'
                  ? 'What do you want to learn?'
                  : 'Cosa vuoi imparare?'
          }
        />

        <div className="card-kid p-6 space-y-4 animate-pop-in">
          {step === 0 && (
            <>
              <h1 className="text-2xl sm:text-3xl font-black text-center text-chloe-purple">
                {uiLang === 'en'
                  ? 'Learn Italian with Chloe'
                  : "Impara l'italiano con Chloe"}
              </h1>
              <p className="text-center font-bold text-chloe-ink/70">
                {uiLang === 'en'
                  ? 'Short, fun lessons for kids ages 6–12. No stress, only smiles!'
                  : 'Lezioni brevi e divertenti per bambini 6–12 anni. Zero stress, solo sorrisi!'}
              </p>
              <div className="flex gap-2 justify-center">
                <button
                  type="button"
                  className={`btn-kid px-4 ${uiLang === 'it' ? 'btn-primary' : 'btn-secondary'}`}
                  onClick={() => setUiLang('it')}
                >
                  🇮🇹 Italiano
                </button>
                <button
                  type="button"
                  className={`btn-kid px-4 ${uiLang === 'en' ? 'btn-primary' : 'btn-secondary'}`}
                  onClick={() => setUiLang('en')}
                >
                  🇬🇧 English
                </button>
              </div>
              <button
                type="button"
                className="btn-kid btn-primary w-full"
                onClick={() => setStep(1)}
              >
                {uiLang === 'en' ? 'Start!' : 'Iniziamo!'}
              </button>
            </>
          )}

          {step === 1 && (
            <>
              <label className="block space-y-2">
                <span className="font-extrabold text-lg">
                  {uiLang === 'en' ? 'Your name' : 'Il tuo nome'}
                </span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  maxLength={20}
                  className="w-full rounded-2xl border-3 border-violet-200 px-4 py-4 text-xl font-bold text-center focus:border-chloe-purple outline-none"
                  placeholder={uiLang === 'en' ? 'e.g. Emma' : 'es. Luca'}
                  autoFocus
                />
              </label>
              <button
                type="button"
                className="btn-kid btn-primary w-full"
                onClick={() => setStep(2)}
              >
                {uiLang === 'en' ? 'Continue' : 'Continua'}
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <p className="font-extrabold text-lg text-center">
                {uiLang === 'en'
                  ? 'What do you want to learn?'
                  : 'Cosa vuoi imparare?'}
              </p>
              <button
                type="button"
                onClick={() => setDirection('it-for-en')}
                className={`btn-kid w-full text-left px-4 py-4 ${
                  direction === 'it-for-en' ? 'btn-primary' : 'btn-secondary'
                }`}
              >
                🇮🇹{' '}
                {uiLang === 'en'
                  ? 'Italian (for English speakers)'
                  : 'Italiano (per chi parla inglese)'}
              </button>
              <button
                type="button"
                onClick={() => setDirection('en-for-it')}
                className={`btn-kid w-full text-left px-4 py-4 ${
                  direction === 'en-for-it' ? 'btn-primary' : 'btn-secondary'
                }`}
              >
                🇬🇧{' '}
                {uiLang === 'en'
                  ? 'English (for Italian speakers)'
                  : 'Inglese (per chi parla italiano)'}
              </button>
              <button
                type="button"
                className="btn-kid btn-success w-full"
                onClick={finish}
              >
                {uiLang === 'en' ? "Let's go! 🚀" : 'Andiamo! 🚀'}
              </button>
            </>
          )}
        </div>

        <p className="text-center text-xs font-bold text-chloe-ink/40">
          {uiLang === 'en'
            ? 'No ads · No trackers · Kid-safe by design'
            : 'Niente pubblicità · Niente tracker · Sicura per i bambini'}
        </p>
      </div>
    </div>
  )
}
