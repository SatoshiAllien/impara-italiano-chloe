/**
 * Template for future lessons.
 * Copy this file into a new module folder and customize.
 *
 * Learning direction:
 * - Content stores both IT and EN; UI adapts via direction / uiLang.
 *
 * Exercise types (ExerciseRenderer):
 * multiple-choice-image | match-word-image | fill-blank |
 * order-words | translation | true-false | audio-match
 */

/** @typedef {{ it: string, en: string }} Bi */

/** Helper bilingual label */
export const t = (it, en) => ({ it, en })

/**
 * Example lesson skeleton — replace ids and content.
 * @type {import('../registry').LessonDef}
 */
export const LESSON_TEMPLATE = {
  id: 'module-lesson-1',
  title: t('Titolo lezione', 'Lesson title'),
  // Optional intro shown before exercises (module pages)
  intro: t(
    'Breve introduzione alla lezione…',
    'Short introduction to the lesson…'
  ),
  exercises: [
    {
      id: 'ex-1',
      type: 'multiple-choice-image',
      prompt: t("Quale immagine mostra 'ciao'?", "Which picture means 'ciao'?"),
      options: [
        { id: 'a', emoji: '👋', label: t('Ciao', 'Hello'), correct: true },
        { id: 'b', emoji: '🍎', label: t('Mela', 'Apple'), correct: false },
        { id: 'c', emoji: '🐶', label: t('Cane', 'Dog'), correct: false },
        { id: 'd', emoji: '🌙', label: t('Notte', 'Night'), correct: false },
      ],
      word: { it: 'ciao', en: 'hello', audioUrl: null },
    },
    {
      id: 'ex-2',
      type: 'fill-blank',
      prompt: t('Completa la frase', 'Complete the sentence'),
      sentence: t('____, mi chiamo Anna.', '____, my name is Anna.'),
      blank: 'Ciao',
      options: ['Ciao', 'Gatto', 'Rosso', 'Tre'],
      translation: t('Ciao, mi chiamo Anna', 'Hi, my name is Anna'),
    },
    {
      id: 'ex-3',
      type: 'translation',
      prompt: t('Come si dice "hello" in italiano?', 'How do you say "ciao" in English?'),
      direction: 'en-to-it',
      source: 'hello',
      answer: 'ciao',
      alternatives: ['Ciao'],
    },
    {
      id: 'ex-4',
      type: 'true-false',
      prompt: t('"Grazie" significa "Thank you".', '"Grazie" means "Thank you".'),
      statement: t('"Grazie" = Thank you', '"Grazie" = Thank you'),
      correct: true,
      explanation: t('Sì! Grazie = thank you.', 'Yes! Grazie = thank you.'),
    },
    {
      id: 'ex-5',
      type: 'audio-match',
      prompt: t('Ascolta e scegli la parola giusta', 'Listen and pick the right word'),
      word: { it: 'ciao', en: 'hello', audioUrl: null },
      options: [
        { id: 'a', label: t('Ciao', 'Hello'), correct: true },
        { id: 'b', label: t('Grazie', 'Thank you'), correct: false },
        { id: 'c', label: t('Acqua', 'Water'), correct: false },
      ],
    },
  ],
}

/**
 * Unit skeleton wrapping one or more lessons + optional unit test.
 */
export const UNIT_TEMPLATE = {
  id: 'example-unit',
  order: 1,
  title: t('Unità esempio', 'Example unit'),
  description: t('Descrizione breve', 'Short description'),
  emoji: '✨',
  color: '#7C5CFC',
  moduleId: 'example-module',
  lessons: [LESSON_TEMPLATE],
  unitTest: {
    id: 'example-unit-test',
    title: t('Test unità', 'Unit test'),
    exercises: [
      {
        id: 'ut-1',
        type: 'true-false',
        prompt: t('Questo è un test.', 'This is a test.'),
        statement: t('Esempio di test', 'Test example'),
        correct: true,
        explanation: t('Bravo!', 'Well done!'),
      },
    ],
  },
}
