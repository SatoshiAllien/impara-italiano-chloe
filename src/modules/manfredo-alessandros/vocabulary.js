/**
 * A1 vocabulary for Manfredo & Alessandros module.
 * audioUrl: null → Web Speech API fallback (see src/lib/audio.js)
 */

const t = (it, en) => ({ it, en })

export const VOCABULARY = {
  greetings: {
    id: 'greetings',
    title: t('Saluti', 'Greetings'),
    level: 'A1',
    words: [
      { id: 'ciao', it: 'ciao', en: 'hello / hi', emoji: '👋', audioUrl: null },
      { id: 'buongiorno', it: 'buongiorno', en: 'good morning', emoji: '☀️', audioUrl: null },
      { id: 'buonasera', it: 'buonasera', en: 'good evening', emoji: '🌆', audioUrl: null },
      { id: 'buonanotte', it: 'buonanotte', en: 'good night', emoji: '🌙', audioUrl: null },
      { id: 'arrivederci', it: 'arrivederci', en: 'goodbye', emoji: '👋', audioUrl: null },
      { id: 'come-stai', it: 'come stai?', en: 'how are you?', emoji: '😊', audioUrl: null },
    ],
  },
  politeness: {
    id: 'politeness',
    title: t('Cortesia', 'Politeness'),
    level: 'A1',
    words: [
      { id: 'per-favore', it: 'per favore', en: 'please', emoji: '🙏', audioUrl: null },
      { id: 'grazie', it: 'grazie', en: 'thank you', emoji: '💖', audioUrl: null },
      { id: 'prego', it: 'prego', en: "you're welcome", emoji: '✨', audioUrl: null },
      { id: 'scusa', it: 'scusa', en: 'sorry / excuse me', emoji: '🙈', audioUrl: null },
      { id: 'di-niente', it: 'di niente', en: "it's nothing / no problem", emoji: '😊', audioUrl: null },
    ],
  },
  feelings: {
    id: 'feelings',
    title: t('Emozioni', 'Feelings'),
    level: 'A1',
    words: [
      { id: 'felice', it: 'felice', en: 'happy', emoji: '😄', audioUrl: null },
      { id: 'stanco', it: 'stanco/a', en: 'tired', emoji: '😴', audioUrl: null },
      { id: 'emozionato', it: 'emozionato/a', en: 'excited', emoji: '🤩', audioUrl: null },
      { id: 'bene', it: 'bene', en: 'well / fine', emoji: '👍', audioUrl: null },
      { id: 'cosi-cosi', it: 'così così', en: 'so-so', emoji: '😐', audioUrl: null },
      { id: 'amico', it: 'amico/a', en: 'friend', emoji: '🤝', audioUrl: null },
    ],
  },
  rainbowFamily: {
    id: 'rainbow-family',
    title: t('Famiglia arcobaleno', 'Rainbow family'),
    level: 'A1',
    words: [
      { id: 'famiglia', it: 'famiglia', en: 'family', emoji: '👨‍👩‍👧‍👦', audioUrl: null },
      { id: 'amore', it: 'amore', en: 'love', emoji: '💕', audioUrl: null },
      { id: 'insieme', it: 'insieme', en: 'together', emoji: '🌈', audioUrl: null },
      { id: 'tutti', it: 'tutti', en: 'everyone', emoji: '🌍', audioUrl: null },
      { id: 'benvenuto', it: 'benvenuto/a', en: 'welcome', emoji: '🚪', audioUrl: null },
    ],
  },
}

export const VOCAB_LISTS = Object.values(VOCABULARY)

export function getAllWords() {
  return VOCAB_LISTS.flatMap((list) =>
    list.words.map((w) => ({ ...w, listId: list.id, listTitle: list.title }))
  )
}
