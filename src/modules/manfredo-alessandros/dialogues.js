/**
 * Beginner dialogues — fun, simple, friendly (A1).
 */

const t = (it, en) => ({ it, en })

export const DIALOGUES = [
  {
    id: 'dlg-hello-park',
    title: t('Al parco', 'At the park'),
    level: 'A1',
    characterIds: ['manfredo', 'alessandro-1'],
    lines: [
      {
        speakerId: 'manfredo',
        it: 'Ciao Alessandro!',
        en: 'Hi Alessandro!',
        audioUrl: null,
      },
      {
        speakerId: 'alessandro-1',
        it: 'Ciao Manfredo! Come stai?',
        en: 'Hi Manfredo! How are you?',
        audioUrl: null,
      },
      {
        speakerId: 'manfredo',
        it: 'Sto bene, grazie! E tu?',
        en: "I'm fine, thanks! And you?",
        audioUrl: null,
      },
      {
        speakerId: 'alessandro-1',
        it: 'Anch’io bene! Andiamo a giocare?',
        en: "I'm good too! Shall we go play?",
        audioUrl: null,
      },
      {
        speakerId: 'manfredo',
        it: 'Sì! Che bello imparare insieme.',
        en: "Yes! It's wonderful to learn together.",
        audioUrl: null,
      },
    ],
  },
  {
    id: 'dlg-please-thanks',
    title: t('Per favore e grazie', 'Please and thank you'),
    level: 'A1',
    characterIds: ['alessandro-2', 'alessandro-3'],
    lines: [
      {
        speakerId: 'alessandro-3',
        it: 'Posso avere un gelato, per favore?',
        en: 'Can I have an ice cream, please?',
        audioUrl: null,
      },
      {
        speakerId: 'alessandro-2',
        it: 'Certo! Ecco a te.',
        en: 'Of course! Here you go.',
        audioUrl: null,
      },
      {
        speakerId: 'alessandro-3',
        it: 'Grazie mille!',
        en: 'Thank you so much!',
        audioUrl: null,
      },
      {
        speakerId: 'alessandro-2',
        it: 'Prego! Di niente.',
        en: "You're welcome! No problem.",
        audioUrl: null,
      },
    ],
  },
  {
    id: 'dlg-feelings',
    title: t('Come ti senti?', 'How do you feel?'),
    level: 'A1',
    characterIds: ['manfredo', 'alessandro-3'],
    lines: [
      {
        speakerId: 'manfredo',
        it: 'Oggi sono felice!',
        en: "Today I'm happy!",
        audioUrl: null,
      },
      {
        speakerId: 'alessandro-3',
        it: 'Io sono un po’ stanco… ma contento.',
        en: "I'm a bit tired… but glad.",
        audioUrl: null,
      },
      {
        speakerId: 'manfredo',
        it: 'Va bene così. Siamo amici!',
        en: "That's okay. We're friends!",
        audioUrl: null,
      },
      {
        speakerId: 'alessandro-3',
        it: 'Sì! Tutti sono i benvenuti nella nostra famiglia.',
        en: 'Yes! Everyone is welcome in our family.',
        audioUrl: null,
      },
    ],
  },
]

export function getDialogue(id) {
  return DIALOGUES.find((d) => d.id === id) || null
}
