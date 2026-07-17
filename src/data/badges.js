/** Achievement / badge definitions */
export const BADGES = [
  {
    id: 'first-lesson',
    name: { it: 'Prima lezione!', en: 'First lesson!' },
    description: {
      it: 'Hai completato la tua prima lezione',
      en: 'You finished your first lesson',
    },
    emoji: '🌟',
  },
  {
    id: 'first-unit',
    name: { it: 'Unità superata!', en: 'Unit complete!' },
    description: {
      it: 'Hai finito la tua prima unità',
      en: 'You finished your first unit',
    },
    emoji: '🏆',
  },
  {
    id: 'streak-3',
    name: { it: '3 giorni di fila', en: '3-day streak' },
    description: {
      it: 'Hai praticato 3 giorni di seguito',
      en: 'Practiced 3 days in a row',
    },
    emoji: '🔥',
  },
  {
    id: 'streak-7',
    name: { it: 'Settimana magica', en: 'Magic week' },
    description: {
      it: '7 giorni di pratica di fila!',
      en: '7 days of practice in a row!',
    },
    emoji: '🌈',
  },
  {
    id: 'perfect-lesson',
    name: { it: 'Senza errori!', en: 'Perfect!' },
    description: {
      it: 'Una lezione al 100% corretta',
      en: 'A lesson with 100% correct answers',
    },
    emoji: '💎',
  },
  {
    id: 'xp-100',
    name: { it: '100 XP', en: '100 XP' },
    description: {
      it: 'Hai guadagnato 100 punti esperienza',
      en: 'You earned 100 experience points',
    },
    emoji: '⭐',
  },
  {
    id: 'xp-500',
    name: { it: '500 XP', en: '500 XP' },
    description: {
      it: 'Sei una stella della lingua!',
      en: "You're a language star!",
    },
    emoji: '🚀',
  },
  {
    id: 'shopper',
    name: { it: 'Stilista di Chloe', en: "Chloe's stylist" },
    description: {
      it: 'Hai comprato qualcosa nello shop',
      en: 'You bought something in the shop',
    },
    emoji: '🛍️',
  },
]

export function getBadge(id) {
  return BADGES.find((b) => b.id === id)
}
