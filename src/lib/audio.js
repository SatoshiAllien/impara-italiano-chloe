/**
 * Audio helpers: Speech Synthesis fallback + optional audioUrl playback.
 * No third-party trackers. Kid-safe.
 */

let unlocked = false

/** Call once on first user gesture so browsers allow speech. */
export function unlockAudio() {
  unlocked = true
  try {
    if (window.speechSynthesis) {
      window.speechSynthesis.getVoices()
    }
  } catch {
    /* ignore */
  }
}

/**
 * Speak text (Italian or English) via Web Speech API.
 * @param {string} text
 * @param {'it'|'en'} lang
 */
export function speak(text, lang = 'it') {
  if (!text || typeof window === 'undefined') return
  try {
    window.speechSynthesis?.cancel()
    const u = new SpeechSynthesisUtterance(text)
    u.lang = lang === 'en' ? 'en-US' : 'it-IT'
    u.rate = 0.9
    u.pitch = 1.05
    const voices = window.speechSynthesis?.getVoices?.() || []
    const match = voices.find((v) =>
      lang === 'en'
        ? v.lang.startsWith('en')
        : v.lang.startsWith('it')
    )
    if (match) u.voice = match
    window.speechSynthesis?.speak(u)
  } catch {
    /* ignore */
  }
}

/**
 * Play audio from URL if present, otherwise speak the text.
 * @param {{ audioUrl?: string, text?: string, lang?: 'it'|'en' }} opts
 */
export function playPronunciation({ audioUrl, text, lang = 'it' } = {}) {
  if (audioUrl) {
    try {
      const a = new Audio(audioUrl)
      a.play().catch(() => {
        if (text) speak(text, lang)
      })
      return
    } catch {
      /* fall through */
    }
  }
  if (text) speak(text, lang)
}

/** Soft success / error tones via Web Audio API (no external files). */
export function playTone(type = 'success') {
  try {
    const Ctx = window.AudioContext || window.webkitAudioContext
    if (!Ctx) return
    const ctx = new Ctx()
    const o = ctx.createOscillator()
    const g = ctx.createGain()
    o.connect(g)
    g.connect(ctx.destination)
    if (type === 'success') {
      o.frequency.setValueAtTime(523.25, ctx.currentTime)
      o.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1)
      o.frequency.setValueAtTime(783.99, ctx.currentTime + 0.2)
    } else if (type === 'error') {
      o.frequency.setValueAtTime(320, ctx.currentTime)
      o.frequency.linearRampToValueAtTime(200, ctx.currentTime + 0.25)
    } else {
      o.frequency.setValueAtTime(440, ctx.currentTime)
    }
    g.gain.setValueAtTime(0.12, ctx.currentTime)
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35)
    o.start()
    o.stop(ctx.currentTime + 0.35)
    setTimeout(() => ctx.close(), 500)
  } catch {
    /* ignore */
  }
}

export function isAudioUnlocked() {
  return unlocked
}
