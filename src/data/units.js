/**
 * Curriculum: Saluti, Famiglia, Animali
 * Each unit has 4 lessons + unit test.
 * Exercise types never repeat twice in a row within a lesson.
 *
 * Learning direction:
 * - it-for-en: learn Italian (prompts mostly EN, answers IT)
 * - en-for-it: learn English (prompts mostly IT, answers EN)
 * Content stores both languages; UI adapts via direction.
 */

/** @typedef {'multiple-choice-image'|'match-word-image'|'fill-blank'|'order-words'|'translation'|'true-false'|'audio-match'} ExerciseType */

/**
 * Helper to build bilingual labels
 */
const t = (it, en) => ({ it, en })

export const UNITS = [
  // ═══════════════════════════════════════════
  // UNIT 1 — Saluti
  // ═══════════════════════════════════════════
  {
    id: 'saluti',
    order: 1,
    title: t('Saluti', 'Greetings'),
    description: t(
      'Ciao, buongiorno e come stai!',
      'Hello, good morning and how are you!'
    ),
    emoji: '👋',
    color: '#7C5CFC',
    lessons: [
      {
        id: 'saluti-1',
        title: t('Ciao e hello', 'Ciao and hello'),
        exercises: [
          {
            id: 's1-e1',
            type: 'multiple-choice-image',
            prompt: t("Quale immagine mostra 'ciao'?", "Which picture means 'ciao'?"),
            promptEn: "Which picture shows a friendly hello?",
            options: [
              { id: 'a', emoji: '👋', label: t('Ciao', 'Hello'), correct: true },
              { id: 'b', emoji: '😴', label: t('Notte', 'Night'), correct: false },
              { id: 'c', emoji: '🍎', label: t('Mela', 'Apple'), correct: false },
              { id: 'd', emoji: '🐶', label: t('Cane', 'Dog'), correct: false },
            ],
            word: { it: 'ciao', en: 'hello', audioUrl: null },
          },
          {
            id: 's1-e2',
            type: 'audio-match',
            prompt: t('Ascolta e scegli la parola giusta', 'Listen and pick the right word'),
            word: { it: 'ciao', en: 'hello', audioUrl: null },
            options: [
              { id: 'a', label: t('Ciao', 'Hello'), correct: true },
              { id: 'b', label: t('Grazie', 'Thank you'), correct: false },
              { id: 'c', label: t('Acqua', 'Water'), correct: false },
            ],
          },
          {
            id: 's1-e3',
            type: 'translation',
            prompt: t('Come si dice "hello" in italiano?', 'How do you say "ciao" in English?'),
            direction: 'en-to-it',
            source: 'hello',
            answer: 'ciao',
            alternatives: ['Ciao'],
          },
          {
            id: 's1-e4',
            type: 'true-false',
            prompt: t('"Buongiorno" significa "Good morning".', '"Buongiorno" means "Good morning".'),
            statement: t('"Buongiorno" = Good morning', '"Buongiorno" = Good morning'),
            correct: true,
            explanation: t(
              'Sì! Buongiorno si usa di giorno per salutare.',
              'Yes! Buongiorno is used to greet someone during the day.'
            ),
          },
          {
            id: 's1-e5',
            type: 'order-words',
            prompt: t('Metti le parole in ordine', 'Put the words in order'),
            words: ['Ciao', 'mi', 'chiamo', 'Chloe'],
            answer: ['Ciao', 'mi', 'chiamo', 'Chloe'],
            translation: t('Ciao, mi chiamo Chloe', 'Hi, my name is Chloe'),
          },
          {
            id: 's1-e6',
            type: 'fill-blank',
            prompt: t('Completa la frase', 'Complete the sentence'),
            sentence: t('____, mi chiamo Anna.', '____, my name is Anna.'),
            blank: 'Ciao',
            options: ['Ciao', 'Gatto', 'Rosso', 'Tre'],
            translation: t('Ciao, mi chiamo Anna', 'Hi, my name is Anna'),
          },
          {
            id: 's1-e7',
            type: 'match-word-image',
            prompt: t('Abbina le parole alle immagini', 'Match the words to the pictures'),
            pairs: [
              { word: t('Ciao', 'Hello'), emoji: '👋' },
              { word: t('Buonanotte', 'Good night'), emoji: '🌙' },
              { word: t('Grazie', 'Thank you'), emoji: '🙏' },
            ],
          },
          {
            id: 's1-e8',
            type: 'multiple-choice-image',
            prompt: t("Cosa dici di sera? 'Buonanotte'", "What do you say at night? 'Buonanotte'"),
            options: [
              { id: 'a', emoji: '🌙', label: t('Buonanotte', 'Good night'), correct: true },
              { id: 'b', emoji: '☀️', label: t('Buongiorno', 'Good morning'), correct: false },
              { id: 'c', emoji: '🍕', label: t('Pizza', 'Pizza'), correct: false },
              { id: 'd', emoji: '📚', label: t('Libro', 'Book'), correct: false },
            ],
            word: { it: 'buonanotte', en: 'good night', audioUrl: null },
          },
        ],
      },
      {
        id: 'saluti-2',
        title: t('Come stai?', 'How are you?'),
        exercises: [
          {
            id: 's2-e1',
            type: 'translation',
            prompt: t('Traduci: "How are you?"', 'Traduci: "Come stai?"'),
            direction: 'en-to-it',
            source: 'How are you?',
            answer: 'Come stai?',
            alternatives: ['Come stai', 'come stai?', 'Come stai?'],
          },
          {
            id: 's2-e2',
            type: 'multiple-choice-image',
            prompt: t("Quale faccia dice 'Bene!'?", "Which face says 'I'm fine!'?"),
            options: [
              { id: 'a', emoji: '😊', label: t('Bene!', "I'm fine!"), correct: true },
              { id: 'b', emoji: '😢', label: t('Male', 'Bad'), correct: false },
              { id: 'c', emoji: '😴', label: t('Stanco', 'Tired'), correct: false },
              { id: 'd', emoji: '🤒', label: t('Malato', 'Sick'), correct: false },
            ],
            word: { it: 'bene', en: 'fine / well', audioUrl: null },
          },
          {
            id: 's2-e3',
            type: 'audio-match',
            prompt: t('Ascolta: quale frase senti?', 'Listen: which phrase do you hear?'),
            word: { it: 'Come stai?', en: 'How are you?', audioUrl: null },
            options: [
              { id: 'a', label: t('Come stai?', 'How are you?'), correct: true },
              { id: 'b', label: t('Come ti chiami?', 'What is your name?'), correct: false },
              { id: 'c', label: t('Buonanotte', 'Good night'), correct: false },
            ],
          },
          {
            id: 's2-e4',
            type: 'order-words',
            prompt: t('Ordina: "Sto bene, grazie"', 'Order: "I am fine, thank you"'),
            words: ['Sto', 'bene', 'grazie'],
            answer: ['Sto', 'bene', 'grazie'],
            translation: t('Sto bene, grazie', "I'm fine, thank you"),
          },
          {
            id: 's2-e5',
            type: 'true-false',
            prompt: t('"Grazie" significa "Please".', '"Grazie" means "Please".'),
            statement: t('"Grazie" = Please', '"Grazie" = Please'),
            correct: false,
            explanation: t(
              'No: "Grazie" significa "Thank you". "Please" è "Per favore".',
              'No: "Grazie" means "Thank you". "Please" is "Per favore".'
            ),
          },
          {
            id: 's2-e6',
            type: 'fill-blank',
            prompt: t('Completa', 'Fill in'),
            sentence: t('Come ____?', 'How ____ you?'),
            blank: 'stai',
            options: ['stai', 'cane', 'rosso', 'mamma'],
            translation: t('Come stai?', 'How are you?'),
          },
          {
            id: 's2-e7',
            type: 'match-word-image',
            prompt: t('Abbina', 'Match'),
            pairs: [
              { word: t('Bene', 'Fine'), emoji: '😊' },
              { word: t('Male', 'Bad'), emoji: '😢' },
              { word: t('Grazie', 'Thanks'), emoji: '🙏' },
            ],
          },
          {
            id: 's2-e8',
            type: 'translation',
            prompt: t('Come si dice "thank you"?', 'How do you say "grazie"?'),
            direction: 'en-to-it',
            source: 'thank you',
            answer: 'grazie',
            alternatives: ['Grazie', 'grazie!'],
          },
        ],
      },
      {
        id: 'saluti-3',
        title: t('Presentarsi', 'Introducing yourself'),
        exercises: [
          {
            id: 's3-e1',
            type: 'multiple-choice-image',
            prompt: t("Cosa usi per dire il tuo nome?", 'What do you use to say your name?'),
            options: [
              { id: 'a', emoji: '🪪', label: t('Mi chiamo…', 'My name is…'), correct: true },
              { id: 'b', emoji: '🍕', label: t('Ho fame', "I'm hungry"), correct: false },
              { id: 'c', emoji: '⚽', label: t('Calcio', 'Soccer'), correct: false },
              { id: 'd', emoji: '🌧️', label: t('Piove', "It's raining"), correct: false },
            ],
            word: { it: 'mi chiamo', en: 'my name is', audioUrl: null },
          },
          {
            id: 's3-e2',
            type: 'order-words',
            prompt: t('Ordina la frase', 'Order the sentence'),
            words: ['Mi', 'chiamo', 'Luca'],
            answer: ['Mi', 'chiamo', 'Luca'],
            translation: t('Mi chiamo Luca', 'My name is Luca'),
          },
          {
            id: 's3-e3',
            type: 'audio-match',
            prompt: t('Ascolta e scegli', 'Listen and choose'),
            word: { it: 'Piacere', en: 'Nice to meet you', audioUrl: null },
            options: [
              { id: 'a', label: t('Piacere', 'Nice to meet you'), correct: true },
              { id: 'b', label: t('Arrivederci', 'Goodbye'), correct: false },
              { id: 'c', label: t('Buongiorno', 'Good morning'), correct: false },
            ],
          },
          {
            id: 's3-e4',
            type: 'fill-blank',
            prompt: t('Completa', 'Fill in'),
            sentence: t('Mi ____ Chloe.', 'My ____ is Chloe.'),
            blank: 'chiamo',
            options: ['chiamo', 'gatto', 'casa', 'blu'],
            translation: t('Mi chiamo Chloe', 'My name is Chloe'),
          },
          {
            id: 's3-e5',
            type: 'true-false',
            prompt: t('"Arrivederci" significa "Goodbye".', '"Arrivederci" means "Goodbye".'),
            statement: t('"Arrivederci" = Goodbye', '"Arrivederci" = Goodbye'),
            correct: true,
            explanation: t(
              'Sì! Arrivederci si usa quando si saluta andando via.',
              'Yes! Arrivederci is used when saying goodbye.'
            ),
          },
          {
            id: 's3-e6',
            type: 'translation',
            prompt: t('Traduci: "Nice to meet you"', 'Traduci: "Piacere"'),
            direction: 'en-to-it',
            source: 'Nice to meet you',
            answer: 'Piacere',
            alternatives: ['piacere', 'Piacere di conoscerti', 'piacere di conoscerti'],
          },
          {
            id: 's3-e7',
            type: 'match-word-image',
            prompt: t('Abbina', 'Match'),
            pairs: [
              { word: t('Ciao', 'Hi'), emoji: '👋' },
              { word: t('Arrivederci', 'Bye'), emoji: '🚪' },
              { word: t('Piacere', 'Nice to meet you'), emoji: '🤝' },
            ],
          },
          {
            id: 's3-e8',
            type: 'order-words',
            prompt: t('Ordina: "Piacere di conoscerti"', 'Order the greeting'),
            words: ['Piacere', 'di', 'conoscerti'],
            answer: ['Piacere', 'di', 'conoscerti'],
            translation: t('Piacere di conoscerti', 'Nice to meet you'),
          },
        ],
      },
      {
        id: 'saluti-4',
        title: t('Saluti del giorno', 'Greetings of the day'),
        exercises: [
          {
            id: 's4-e1',
            type: 'multiple-choice-image',
            prompt: t('Cosa dici di mattina?', 'What do you say in the morning?'),
            options: [
              { id: 'a', emoji: '☀️', label: t('Buongiorno', 'Good morning'), correct: true },
              { id: 'b', emoji: '🌙', label: t('Buonanotte', 'Good night'), correct: false },
              { id: 'c', emoji: '🍕', label: t('Buon appetito', 'Enjoy your meal'), correct: false },
              { id: 'd', emoji: '🎂', label: t('Buon compleanno', 'Happy birthday'), correct: false },
            ],
            word: { it: 'buongiorno', en: 'good morning', audioUrl: null },
          },
          {
            id: 's4-e2',
            type: 'true-false',
            prompt: t('"Buonasera" si dice di sera.', '"Buonasera" is said in the evening.'),
            statement: t('"Buonasera" = Good evening', '"Buonasera" = Good evening'),
            correct: true,
            explanation: t(
              'Perfetto! Buonasera è il saluto della sera.',
              'Perfect! Buonasera is the evening greeting.'
            ),
          },
          {
            id: 's4-e3',
            type: 'audio-match',
            prompt: t('Ascolta', 'Listen'),
            word: { it: 'Buonasera', en: 'Good evening', audioUrl: null },
            options: [
              { id: 'a', label: t('Buonasera', 'Good evening'), correct: true },
              { id: 'b', label: t('Buongiorno', 'Good morning'), correct: false },
              { id: 'c', label: t('Ciao', 'Hi'), correct: false },
            ],
          },
          {
            id: 's4-e4',
            type: 'fill-blank',
            prompt: t('Completa', 'Fill in'),
            sentence: t('____ sera!', 'Good ____!'),
            blank: 'Buona',
            options: ['Buona', 'Cane', 'Verde', 'Mamma'],
            translation: t('Buona sera!', 'Good evening!'),
          },
          {
            id: 's4-e5',
            type: 'translation',
            prompt: t('Traduci: "Good night"', 'Traduci: "Buonanotte"'),
            direction: 'en-to-it',
            source: 'Good night',
            answer: 'Buonanotte',
            alternatives: ['buonanotte', 'Buona notte', 'buona notte'],
          },
          {
            id: 's4-e6',
            type: 'order-words',
            prompt: t('Ordina', 'Order'),
            words: ['Buongiorno', 'a', 'tutti'],
            answer: ['Buongiorno', 'a', 'tutti'],
            translation: t('Buongiorno a tutti', 'Good morning everyone'),
          },
          {
            id: 's4-e7',
            type: 'match-word-image',
            prompt: t('Abbina i saluti', 'Match the greetings'),
            pairs: [
              { word: t('Buongiorno', 'Good morning'), emoji: '☀️' },
              { word: t('Buonasera', 'Good evening'), emoji: '🌆' },
              { word: t('Buonanotte', 'Good night'), emoji: '🌙' },
            ],
          },
          {
            id: 's4-e8',
            type: 'multiple-choice-image',
            prompt: t('Quale saluto per la notte?', 'Which greeting for bedtime?'),
            options: [
              { id: 'a', emoji: '🌙', label: t('Buonanotte', 'Good night'), correct: true },
              { id: 'b', emoji: '☀️', label: t('Buongiorno', 'Good morning'), correct: false },
              { id: 'c', emoji: '👋', label: t('Ciao', 'Hi'), correct: false },
              { id: 'd', emoji: '⚽', label: t('Forza!', 'Go!'), correct: false },
            ],
            word: { it: 'buonanotte', en: 'good night', audioUrl: null },
          },
        ],
      },
    ],
    unitTest: {
      id: 'saluti-test',
      title: t('Test Saluti', 'Greetings Test'),
      exercises: [
        {
          id: 'st-1',
          type: 'translation',
          prompt: t('Traduci: "Hello"', 'Traduci: "Ciao"'),
          direction: 'en-to-it',
          source: 'Hello',
          answer: 'Ciao',
          alternatives: ['ciao'],
        },
        {
          id: 'st-2',
          type: 'multiple-choice-image',
          prompt: t('Cosa dici di mattina?', 'Morning greeting?'),
          options: [
            { id: 'a', emoji: '☀️', label: t('Buongiorno', 'Good morning'), correct: true },
            { id: 'b', emoji: '🌙', label: t('Buonanotte', 'Good night'), correct: false },
            { id: 'c', emoji: '🍕', label: t('Pizza', 'Pizza'), correct: false },
          ],
        },
        {
          id: 'st-3',
          type: 'order-words',
          prompt: t('Ordina', 'Order'),
          words: ['Come', 'stai'],
          answer: ['Come', 'stai'],
          translation: t('Come stai?', 'How are you?'),
        },
        {
          id: 'st-4',
          type: 'true-false',
          prompt: t('"Grazie" = Thank you', '"Grazie" = Thank you'),
          statement: t('"Grazie" significa Thank you', '"Grazie" means Thank you'),
          correct: true,
          explanation: t('Esatto!', 'Exactly!'),
        },
        {
          id: 'st-5',
          type: 'fill-blank',
          prompt: t('Completa', 'Fill in'),
          sentence: t('Mi ____ Leo.', 'My name is Leo.'),
          blank: 'chiamo',
          options: ['chiamo', 'gatto', 'rosso'],
          translation: t('Mi chiamo Leo', 'My name is Leo'),
        },
        {
          id: 'st-6',
          type: 'audio-match',
          prompt: t('Ascolta', 'Listen'),
          word: { it: 'Arrivederci', en: 'Goodbye', audioUrl: null },
          options: [
            { id: 'a', label: t('Arrivederci', 'Goodbye'), correct: true },
            { id: 'b', label: t('Buongiorno', 'Good morning'), correct: false },
          ],
        },
      ],
    },
  },

  // ═══════════════════════════════════════════
  // UNIT 2 — Famiglia
  // ═══════════════════════════════════════════
  {
    id: 'famiglia',
    order: 2,
    title: t('Famiglia', 'Family'),
    description: t(
      'Mamma, papà, fratello e sorella',
      'Mom, dad, brother and sister'
    ),
    emoji: '👨‍👩‍👧',
    color: '#FF6B9D',
    lessons: [
      {
        id: 'famiglia-1',
        title: t('Mamma e papà', 'Mom and dad'),
        exercises: [
          {
            id: 'f1-e1',
            type: 'multiple-choice-image',
            prompt: t("Quale immagine mostra 'la mamma'?", "Which shows 'mom'?"),
            options: [
              { id: 'a', emoji: '👩', label: t('Mamma', 'Mom'), correct: true },
              { id: 'b', emoji: '👨', label: t('Papà', 'Dad'), correct: false },
              { id: 'c', emoji: '🐶', label: t('Cane', 'Dog'), correct: false },
              { id: 'd', emoji: '🚗', label: t('Auto', 'Car'), correct: false },
            ],
            word: { it: 'la mamma', en: 'mom', audioUrl: null },
          },
          {
            id: 'f1-e2',
            type: 'audio-match',
            prompt: t('Ascolta e scegli', 'Listen and choose'),
            word: { it: 'papà', en: 'dad', audioUrl: null },
            options: [
              { id: 'a', label: t('Papà', 'Dad'), correct: true },
              { id: 'b', label: t('Mamma', 'Mom'), correct: false },
              { id: 'c', label: t('Nonna', 'Grandma'), correct: false },
            ],
          },
          {
            id: 'f1-e3',
            type: 'translation',
            prompt: t('Come si dice "mom" in italiano?', 'How do you say "mamma"?'),
            direction: 'en-to-it',
            source: 'mom',
            answer: 'mamma',
            alternatives: ['Mamma', 'la mamma', 'La mamma'],
          },
          {
            id: 'f1-e4',
            type: 'true-false',
            prompt: t('"Il papà" significa "the dad".', '"Il papà" means "the dad".'),
            statement: t('"Il papà" = the dad', '"Il papà" = the dad'),
            correct: true,
            explanation: t('Sì! Papà è il padre.', 'Yes! Papà is the father.'),
          },
          {
            id: 'f1-e5',
            type: 'match-word-image',
            prompt: t('Abbina la famiglia', 'Match the family'),
            pairs: [
              { word: t('Mamma', 'Mom'), emoji: '👩' },
              { word: t('Papà', 'Dad'), emoji: '👨' },
              { word: t('Bambino', 'Child'), emoji: '🧒' },
            ],
          },
          {
            id: 'f1-e6',
            type: 'fill-blank',
            prompt: t('Completa', 'Fill in'),
            sentence: t('Questa è la mia ____.', 'This is my ____.'),
            blank: 'mamma',
            options: ['mamma', 'gatto', 'casa', 'blu'],
            translation: t('Questa è la mia mamma', 'This is my mom'),
          },
          {
            id: 'f1-e7',
            type: 'order-words',
            prompt: t('Ordina', 'Order'),
            words: ['Amo', 'la', 'mia', 'mamma'],
            answer: ['Amo', 'la', 'mia', 'mamma'],
            translation: t('Amo la mia mamma', 'I love my mom'),
          },
          {
            id: 'f1-e8',
            type: 'multiple-choice-image',
            prompt: t("Quale immagine mostra 'il papà'?", "Which shows 'dad'?"),
            options: [
              { id: 'a', emoji: '👨', label: t('Papà', 'Dad'), correct: true },
              { id: 'b', emoji: '👩', label: t('Mamma', 'Mom'), correct: false },
              { id: 'c', emoji: '🐱', label: t('Gatto', 'Cat'), correct: false },
              { id: 'd', emoji: '🌳', label: t('Albero', 'Tree'), correct: false },
            ],
            word: { it: 'il papà', en: 'dad', audioUrl: null },
          },
        ],
      },
      {
        id: 'famiglia-2',
        title: t('Fratello e sorella', 'Brother and sister'),
        exercises: [
          {
            id: 'f2-e1',
            type: 'multiple-choice-image',
            prompt: t("Chi è 'il fratello'?", "Who is 'brother'?"),
            options: [
              { id: 'a', emoji: '👦', label: t('Fratello', 'Brother'), correct: true },
              { id: 'b', emoji: '👧', label: t('Sorella', 'Sister'), correct: false },
              { id: 'c', emoji: '👵', label: t('Nonna', 'Grandma'), correct: false },
              { id: 'd', emoji: '🐶', label: t('Cane', 'Dog'), correct: false },
            ],
            word: { it: 'il fratello', en: 'brother', audioUrl: null },
          },
          {
            id: 'f2-e2',
            type: 'translation',
            prompt: t('Traduci: "sister"', 'Traduci: "sorella"'),
            direction: 'en-to-it',
            source: 'sister',
            answer: 'sorella',
            alternatives: ['Sorella', 'la sorella', 'La sorella'],
          },
          {
            id: 'f2-e3',
            type: 'audio-match',
            prompt: t('Ascolta', 'Listen'),
            word: { it: 'sorella', en: 'sister', audioUrl: null },
            options: [
              { id: 'a', label: t('Sorella', 'Sister'), correct: true },
              { id: 'b', label: t('Fratello', 'Brother'), correct: false },
              { id: 'c', label: t('Mamma', 'Mom'), correct: false },
            ],
          },
          {
            id: 'f2-e4',
            type: 'true-false',
            prompt: t('"Fratello" e "sorella" sono la stessa cosa.', '"Fratello" and "sorella" are the same.'),
            statement: t('Fratello = Sorella', 'Brother = Sister'),
            correct: false,
            explanation: t(
              'No: fratello è un ragazzo, sorella è una ragazza.',
              'No: brother is a boy, sister is a girl.'
            ),
          },
          {
            id: 'f2-e5',
            type: 'order-words',
            prompt: t('Ordina', 'Order'),
            words: ['Ho', 'un', 'fratello'],
            answer: ['Ho', 'un', 'fratello'],
            translation: t('Ho un fratello', 'I have a brother'),
          },
          {
            id: 'f2-e6',
            type: 'fill-blank',
            prompt: t('Completa', 'Fill in'),
            sentence: t('Lei è mia ____.', 'She is my ____.'),
            blank: 'sorella',
            options: ['sorella', 'papà', 'cane', 'blu'],
            translation: t('Lei è mia sorella', 'She is my sister'),
          },
          {
            id: 'f2-e7',
            type: 'match-word-image',
            prompt: t('Abbina', 'Match'),
            pairs: [
              { word: t('Fratello', 'Brother'), emoji: '👦' },
              { word: t('Sorella', 'Sister'), emoji: '👧' },
              { word: t('Amico', 'Friend'), emoji: '🤝' },
            ],
          },
          {
            id: 'f2-e8',
            type: 'multiple-choice-image',
            prompt: t("Quale mostra 'la sorella'?", "Which shows 'sister'?"),
            options: [
              { id: 'a', emoji: '👧', label: t('Sorella', 'Sister'), correct: true },
              { id: 'b', emoji: '👦', label: t('Fratello', 'Brother'), correct: false },
              { id: 'c', emoji: '👴', label: t('Nonno', 'Grandpa'), correct: false },
              { id: 'd', emoji: '🐠', label: t('Pesce', 'Fish'), correct: false },
            ],
            word: { it: 'la sorella', en: 'sister', audioUrl: null },
          },
        ],
      },
      {
        id: 'famiglia-3',
        title: t('Nonni e famiglia', 'Grandparents & family'),
        exercises: [
          {
            id: 'f3-e1',
            type: 'multiple-choice-image',
            prompt: t("Chi è 'la nonna'?", "Who is 'grandma'?"),
            options: [
              { id: 'a', emoji: '👵', label: t('Nonna', 'Grandma'), correct: true },
              { id: 'b', emoji: '👩', label: t('Mamma', 'Mom'), correct: false },
              { id: 'c', emoji: '👧', label: t('Sorella', 'Sister'), correct: false },
              { id: 'd', emoji: '🐱', label: t('Gatto', 'Cat'), correct: false },
            ],
            word: { it: 'la nonna', en: 'grandma', audioUrl: null },
          },
          {
            id: 'f3-e2',
            type: 'audio-match',
            prompt: t('Ascolta', 'Listen'),
            word: { it: 'nonno', en: 'grandpa', audioUrl: null },
            options: [
              { id: 'a', label: t('Nonno', 'Grandpa'), correct: true },
              { id: 'b', label: t('Papà', 'Dad'), correct: false },
              { id: 'c', label: t('Fratello', 'Brother'), correct: false },
            ],
          },
          {
            id: 'f3-e3',
            type: 'translation',
            prompt: t('Traduci: "family"', 'Traduci: "famiglia"'),
            direction: 'en-to-it',
            source: 'family',
            answer: 'famiglia',
            alternatives: ['Famiglia', 'la famiglia', 'La famiglia'],
          },
          {
            id: 'f3-e4',
            type: 'order-words',
            prompt: t('Ordina', 'Order'),
            words: ['Amo', 'la', 'mia', 'famiglia'],
            answer: ['Amo', 'la', 'mia', 'famiglia'],
            translation: t('Amo la mia famiglia', 'I love my family'),
          },
          {
            id: 'f3-e5',
            type: 'true-false',
            prompt: t('"Nonno" significa "grandpa".', '"Nonno" means "grandpa".'),
            statement: t('"Nonno" = grandpa', '"Nonno" = grandpa'),
            correct: true,
            explanation: t('Bravo/a! Il nonno è il papà del papà o della mamma.', 'Great! Grandpa is dad or mom\'s father.'),
          },
          {
            id: 'f3-e6',
            type: 'fill-blank',
            prompt: t('Completa', 'Fill in'),
            sentence: t('Il ____ legge un libro.', 'Grandpa reads a book.'),
            blank: 'nonno',
            options: ['nonno', 'gatto', 'sole', 'pane'],
            translation: t('Il nonno legge un libro', 'Grandpa reads a book'),
          },
          {
            id: 'f3-e7',
            type: 'match-word-image',
            prompt: t('Abbina', 'Match'),
            pairs: [
              { word: t('Nonna', 'Grandma'), emoji: '👵' },
              { word: t('Nonno', 'Grandpa'), emoji: '👴' },
              { word: t('Famiglia', 'Family'), emoji: '👨‍👩‍👧‍👦' },
            ],
          },
          {
            id: 'f3-e8',
            type: 'multiple-choice-image',
            prompt: t('Chi è tutta insieme?', 'Who is all together?'),
            options: [
              { id: 'a', emoji: '👨‍👩‍👧‍👦', label: t('Famiglia', 'Family'), correct: true },
              { id: 'b', emoji: '🏫', label: t('Scuola', 'School'), correct: false },
              { id: 'c', emoji: '🚌', label: t('Bus', 'Bus'), correct: false },
              { id: 'd', emoji: '🍎', label: t('Mela', 'Apple'), correct: false },
            ],
            word: { it: 'la famiglia', en: 'the family', audioUrl: null },
          },
        ],
      },
      {
        id: 'famiglia-4',
        title: t('La mia famiglia', 'My family'),
        exercises: [
          {
            id: 'f4-e1',
            type: 'order-words',
            prompt: t('Ordina', 'Order'),
            words: ['Questa', 'è', 'la', 'mia', 'famiglia'],
            answer: ['Questa', 'è', 'la', 'mia', 'famiglia'],
            translation: t('Questa è la mia famiglia', 'This is my family'),
          },
          {
            id: 'f4-e2',
            type: 'multiple-choice-image',
            prompt: t('Chi cucina spesso a casa?', 'Who often cooks at home?'),
            options: [
              { id: 'a', emoji: '👩‍🍳', label: t('Mamma / Papà', 'Mom / Dad'), correct: true },
              { id: 'b', emoji: '🦁', label: t('Leone', 'Lion'), correct: false },
              { id: 'c', emoji: '🚀', label: t('Razzo', 'Rocket'), correct: false },
              { id: 'd', emoji: '⛄', label: t('Neve', 'Snow'), correct: false },
            ],
            word: { it: 'cucinare', en: 'to cook', audioUrl: null },
          },
          {
            id: 'f4-e3',
            type: 'translation',
            prompt: t('Traduci: "I love my family"', 'Traduci: "Amo la mia famiglia"'),
            direction: 'en-to-it',
            source: 'I love my family',
            answer: 'Amo la mia famiglia',
            alternatives: ['amo la mia famiglia', 'Io amo la mia famiglia'],
          },
          {
            id: 'f4-e4',
            type: 'audio-match',
            prompt: t('Ascolta', 'Listen'),
            word: { it: 'famiglia', en: 'family', audioUrl: null },
            options: [
              { id: 'a', label: t('Famiglia', 'Family'), correct: true },
              { id: 'b', label: t('Scuola', 'School'), correct: false },
              { id: 'c', label: t('Amico', 'Friend'), correct: false },
            ],
          },
          {
            id: 'f4-e5',
            type: 'fill-blank',
            prompt: t('Completa', 'Fill in'),
            sentence: t('Ho una ____ grande.', 'I have a big ____.'),
            blank: 'famiglia',
            options: ['famiglia', 'pizza', 'luna', 'scarpa'],
            translation: t('Ho una famiglia grande', 'I have a big family'),
          },
          {
            id: 'f4-e6',
            type: 'true-false',
            prompt: t('In famiglia ci sono mamma, papà e i figli.', 'A family can include mom, dad and kids.'),
            statement: t('Mamma + papà + figli = famiglia', 'Mom + dad + kids = family'),
            correct: true,
            explanation: t(
              'Sì! E ogni famiglia può essere diversa e speciale.',
              'Yes! And every family can be different and special.'
            ),
          },
          {
            id: 'f4-e7',
            type: 'match-word-image',
            prompt: t('Abbina tutti', 'Match them all'),
            pairs: [
              { word: t('Mamma', 'Mom'), emoji: '👩' },
              { word: t('Papà', 'Dad'), emoji: '👨' },
              { word: t('Fratello', 'Brother'), emoji: '👦' },
              { word: t('Sorella', 'Sister'), emoji: '👧' },
            ],
          },
          {
            id: 'f4-e8',
            type: 'order-words',
            prompt: t('Ordina', 'Order'),
            words: ['Il', 'nonno', 'è', 'gentile'],
            answer: ['Il', 'nonno', 'è', 'gentile'],
            translation: t('Il nonno è gentile', 'Grandpa is kind'),
          },
        ],
      },
    ],
    unitTest: {
      id: 'famiglia-test',
      title: t('Test Famiglia', 'Family Test'),
      exercises: [
        {
          id: 'ft-1',
          type: 'translation',
          prompt: t('Traduci: "mom"', 'Traduci: "mamma"'),
          direction: 'en-to-it',
          source: 'mom',
          answer: 'mamma',
          alternatives: ['Mamma', 'la mamma'],
        },
        {
          id: 'ft-2',
          type: 'multiple-choice-image',
          prompt: t("Chi è 'il fratello'?", "Who is 'brother'?"),
          options: [
            { id: 'a', emoji: '👦', label: t('Fratello', 'Brother'), correct: true },
            { id: 'b', emoji: '👧', label: t('Sorella', 'Sister'), correct: false },
            { id: 'c', emoji: '👵', label: t('Nonna', 'Grandma'), correct: false },
          ],
        },
        {
          id: 'ft-3',
          type: 'order-words',
          prompt: t('Ordina', 'Order'),
          words: ['Amo', 'la', 'mia', 'famiglia'],
          answer: ['Amo', 'la', 'mia', 'famiglia'],
          translation: t('Amo la mia famiglia', 'I love my family'),
        },
        {
          id: 'ft-4',
          type: 'true-false',
          prompt: t('"Nonna" = grandma', '"Nonna" = grandma'),
          statement: t('"Nonna" significa grandma', '"Nonna" means grandma'),
          correct: true,
          explanation: t('Perfetto!', 'Perfect!'),
        },
        {
          id: 'ft-5',
          type: 'fill-blank',
          prompt: t('Completa', 'Fill in'),
          sentence: t('Il ____ gioca con me.', 'Dad plays with me.'),
          blank: 'papà',
          options: ['papà', 'casa', 'sole'],
          translation: t('Il papà gioca con me', 'Dad plays with me'),
        },
        {
          id: 'ft-6',
          type: 'audio-match',
          prompt: t('Ascolta', 'Listen'),
          word: { it: 'sorella', en: 'sister', audioUrl: null },
          options: [
            { id: 'a', label: t('Sorella', 'Sister'), correct: true },
            { id: 'b', label: t('Mamma', 'Mom'), correct: false },
          ],
        },
      ],
    },
  },

  // ═══════════════════════════════════════════
  // UNIT 3 — Animali
  // ═══════════════════════════════════════════
  {
    id: 'animali',
    order: 3,
    title: t('Animali', 'Animals'),
    description: t(
      'Cani, gatti, uccelli e amici pelosi',
      'Dogs, cats, birds and furry friends'
    ),
    emoji: '🐾',
    color: '#34D399',
    lessons: [
      {
        id: 'animali-1',
        title: t('Cane e gatto', 'Dog and cat'),
        exercises: [
          {
            id: 'a1-e1',
            type: 'multiple-choice-image',
            prompt: t("Quale immagine mostra 'il cane'?", "Which picture shows 'the dog'?"),
            options: [
              { id: 'a', emoji: '🐶', label: t('Cane', 'Dog'), correct: true },
              { id: 'b', emoji: '🐱', label: t('Gatto', 'Cat'), correct: false },
              { id: 'c', emoji: '🐟', label: t('Pesce', 'Fish'), correct: false },
              { id: 'd', emoji: '🐦', label: t('Uccello', 'Bird'), correct: false },
            ],
            word: { it: 'il cane', en: 'the dog', audioUrl: null },
          },
          {
            id: 'a1-e2',
            type: 'audio-match',
            prompt: t('Ascolta e scegli l\'animale', 'Listen and pick the animal'),
            word: { it: 'gatto', en: 'cat', audioUrl: null },
            options: [
              { id: 'a', label: t('Gatto', 'Cat'), correct: true },
              { id: 'b', label: t('Cane', 'Dog'), correct: false },
              { id: 'c', label: t('Cavallo', 'Horse'), correct: false },
            ],
          },
          {
            id: 'a1-e3',
            type: 'translation',
            prompt: t('Come si dice "cat" in italiano?', 'How do you say "gatto"?'),
            direction: 'en-to-it',
            source: 'cat',
            answer: 'gatto',
            alternatives: ['Gatto', 'il gatto', 'Il gatto'],
          },
          {
            id: 'a1-e4',
            type: 'true-false',
            prompt: t('"Il cane" significa "the cat".', '"Il cane" means "the cat".'),
            statement: t('"Il cane" = the cat', '"Il cane" = the cat'),
            correct: false,
            explanation: t(
              'No: "il cane" è the dog. "Il gatto" è the cat.',
              'No: "il cane" is the dog. "Il gatto" is the cat.'
            ),
          },
          {
            id: 'a1-e5',
            type: 'match-word-image',
            prompt: t('Abbina gli animali', 'Match the animals'),
            pairs: [
              { word: t('Cane', 'Dog'), emoji: '🐶' },
              { word: t('Gatto', 'Cat'), emoji: '🐱' },
              { word: t('Pesce', 'Fish'), emoji: '🐟' },
            ],
          },
          {
            id: 'a1-e6',
            type: 'fill-blank',
            prompt: t('Completa', 'Fill in'),
            sentence: t('Il ____ abbaia: bau bau!', 'The ____ barks: woof!'),
            blank: 'cane',
            options: ['cane', 'gatto', 'pesce', 'uccello'],
            translation: t('Il cane abbaia', 'The dog barks'),
          },
          {
            id: 'a1-e7',
            type: 'order-words',
            prompt: t('Ordina', 'Order'),
            words: ['Il', 'gatto', 'è', 'morbido'],
            answer: ['Il', 'gatto', 'è', 'morbido'],
            translation: t('Il gatto è morbido', 'The cat is soft'),
          },
          {
            id: 'a1-e8',
            type: 'multiple-choice-image',
            prompt: t("Quale mostra 'il gatto'?", "Which shows 'the cat'?"),
            options: [
              { id: 'a', emoji: '🐱', label: t('Gatto', 'Cat'), correct: true },
              { id: 'b', emoji: '🐶', label: t('Cane', 'Dog'), correct: false },
              { id: 'c', emoji: '🐰', label: t('Coniglio', 'Rabbit'), correct: false },
              { id: 'd', emoji: '🐢', label: t('Tartaruga', 'Turtle'), correct: false },
            ],
            word: { it: 'il gatto', en: 'the cat', audioUrl: null },
          },
        ],
      },
      {
        id: 'animali-2',
        title: t('Animali della fattoria', 'Farm animals'),
        exercises: [
          {
            id: 'a2-e1',
            type: 'multiple-choice-image',
            prompt: t("Quale immagine mostra 'la mucca'?", "Which shows 'the cow'?"),
            options: [
              { id: 'a', emoji: '🐄', label: t('Mucca', 'Cow'), correct: true },
              { id: 'b', emoji: '🐷', label: t('Maiale', 'Pig'), correct: false },
              { id: 'c', emoji: '🐔', label: t('Gallina', 'Hen'), correct: false },
              { id: 'd', emoji: '🐴', label: t('Cavallo', 'Horse'), correct: false },
            ],
            word: { it: 'la mucca', en: 'the cow', audioUrl: null },
          },
          {
            id: 'a2-e2',
            type: 'audio-match',
            prompt: t('Ascolta', 'Listen'),
            word: { it: 'cavallo', en: 'horse', audioUrl: null },
            options: [
              { id: 'a', label: t('Cavallo', 'Horse'), correct: true },
              { id: 'b', label: t('Mucca', 'Cow'), correct: false },
              { id: 'c', label: t('Pecora', 'Sheep'), correct: false },
            ],
          },
          {
            id: 'a2-e3',
            type: 'translation',
            prompt: t('Traduci: "pig"', 'Traduci: "maiale"'),
            direction: 'en-to-it',
            source: 'pig',
            answer: 'maiale',
            alternatives: ['Maiale', 'il maiale', 'Il maiale'],
          },
          {
            id: 'a2-e4',
            type: 'order-words',
            prompt: t('Ordina', 'Order'),
            words: ['La', 'mucca', 'fa', 'il', 'latte'],
            answer: ['La', 'mucca', 'fa', 'il', 'latte'],
            translation: t('La mucca fa il latte', 'The cow makes milk'),
          },
          {
            id: 'a2-e5',
            type: 'true-false',
            prompt: t('"Il cavallo" è un animale della fattoria.', '"Il cavallo" is a farm animal.'),
            statement: t('Il cavallo vive spesso in fattoria', 'Horses often live on farms'),
            correct: true,
            explanation: t('Sì! Il cavallo è grande e corre veloce.', 'Yes! Horses are big and run fast.'),
          },
          {
            id: 'a2-e6',
            type: 'fill-blank',
            prompt: t('Completa', 'Fill in'),
            sentence: t('La ____ fa le uova.', 'The ____ lays eggs.'),
            blank: 'gallina',
            options: ['gallina', 'mucca', 'cane', 'gatto'],
            translation: t('La gallina fa le uova', 'The hen lays eggs'),
          },
          {
            id: 'a2-e7',
            type: 'match-word-image',
            prompt: t('Abbina la fattoria', 'Match the farm'),
            pairs: [
              { word: t('Mucca', 'Cow'), emoji: '🐄' },
              { word: t('Maiale', 'Pig'), emoji: '🐷' },
              { word: t('Gallina', 'Hen'), emoji: '🐔' },
              { word: t('Cavallo', 'Horse'), emoji: '🐴' },
            ],
          },
          {
            id: 'a2-e8',
            type: 'multiple-choice-image',
            prompt: t("Quale è 'la pecora'?", "Which is 'the sheep'?"),
            options: [
              { id: 'a', emoji: '🐑', label: t('Pecora', 'Sheep'), correct: true },
              { id: 'b', emoji: '🐐', label: t('Capra', 'Goat'), correct: false },
              { id: 'c', emoji: '🦆', label: t('Anatra', 'Duck'), correct: false },
              { id: 'd', emoji: '🐸', label: t('Rana', 'Frog'), correct: false },
            ],
            word: { it: 'la pecora', en: 'the sheep', audioUrl: null },
          },
        ],
      },
      {
        id: 'animali-3',
        title: t('Animali selvatici', 'Wild animals'),
        exercises: [
          {
            id: 'a3-e1',
            type: 'multiple-choice-image',
            prompt: t("Quale immagine mostra 'il leone'?", "Which shows 'the lion'?"),
            options: [
              { id: 'a', emoji: '🦁', label: t('Leone', 'Lion'), correct: true },
              { id: 'b', emoji: '🐯', label: t('Tigre', 'Tiger'), correct: false },
              { id: 'c', emoji: '🐻', label: t('Orso', 'Bear'), correct: false },
              { id: 'd', emoji: '🐵', label: t('Scimmia', 'Monkey'), correct: false },
            ],
            word: { it: 'il leone', en: 'the lion', audioUrl: null },
          },
          {
            id: 'a3-e2',
            type: 'translation',
            prompt: t('Traduci: "elephant"', 'Traduci: "elefante"'),
            direction: 'en-to-it',
            source: 'elephant',
            answer: 'elefante',
            alternatives: ['Elefante', "l'elefante", "L'elefante"],
          },
          {
            id: 'a3-e3',
            type: 'audio-match',
            prompt: t('Ascolta', 'Listen'),
            word: { it: 'scimmia', en: 'monkey', audioUrl: null },
            options: [
              { id: 'a', label: t('Scimmia', 'Monkey'), correct: true },
              { id: 'b', label: t('Leone', 'Lion'), correct: false },
              { id: 'c', label: t('Orso', 'Bear'), correct: false },
            ],
          },
          {
            id: 'a3-e4',
            type: 'order-words',
            prompt: t('Ordina', 'Order'),
            words: ['Il', 'leone', 'ruggisce'],
            answer: ['Il', 'leone', 'ruggisce'],
            translation: t('Il leone ruggisce', 'The lion roars'),
          },
          {
            id: 'a3-e5',
            type: 'true-false',
            prompt: t('"L\'elefante" è piccolo come un gatto.', '"The elephant" is as small as a cat.'),
            statement: t("L'elefante è piccolissimo", 'The elephant is tiny'),
            correct: false,
            explanation: t(
              'No! L\'elefante è molto grande. Ha una proboscide lunga.',
              'No! The elephant is very big. It has a long trunk.'
            ),
          },
          {
            id: 'a3-e6',
            type: 'fill-blank',
            prompt: t('Completa', 'Fill in'),
            sentence: t('La ____ ha le strisce.', 'The ____ has stripes.'),
            blank: 'tigre',
            options: ['tigre', 'mucca', 'cane', 'pecora'],
            translation: t('La tigre ha le strisce', 'The tiger has stripes'),
          },
          {
            id: 'a3-e7',
            type: 'match-word-image',
            prompt: t('Abbina gli animali selvatici', 'Match wild animals'),
            pairs: [
              { word: t('Leone', 'Lion'), emoji: '🦁' },
              { word: t('Elefante', 'Elephant'), emoji: '🐘' },
              { word: t('Scimmia', 'Monkey'), emoji: '🐵' },
            ],
          },
          {
            id: 'a3-e8',
            type: 'multiple-choice-image',
            prompt: t("Quale è 'l'orso'?", "Which is 'the bear'?"),
            options: [
              { id: 'a', emoji: '🐻', label: t('Orso', 'Bear'), correct: true },
              { id: 'b', emoji: '🦊', label: t('Volpe', 'Fox'), correct: false },
              { id: 'c', emoji: '🐺', label: t('Lupo', 'Wolf'), correct: false },
              { id: 'd', emoji: '🐼', label: t('Panda', 'Panda'), correct: false },
            ],
            word: { it: "l'orso", en: 'the bear', audioUrl: null },
          },
        ],
      },
      {
        id: 'animali-4',
        title: t('Animali amici', 'Animal friends'),
        exercises: [
          {
            id: 'a4-e1',
            type: 'multiple-choice-image',
            prompt: t("Quale mostra 'il coniglio'?", "Which shows 'the rabbit'?"),
            options: [
              { id: 'a', emoji: '🐰', label: t('Coniglio', 'Rabbit'), correct: true },
              { id: 'b', emoji: '🐹', label: t('Criceto', 'Hamster'), correct: false },
              { id: 'c', emoji: '🐢', label: t('Tartaruga', 'Turtle'), correct: false },
              { id: 'd', emoji: '🦜', label: t('Pappagallo', 'Parrot'), correct: false },
            ],
            word: { it: 'il coniglio', en: 'the rabbit', audioUrl: null },
          },
          {
            id: 'a4-e2',
            type: 'order-words',
            prompt: t('Ordina', 'Order'),
            words: ['Amo', 'gli', 'animali'],
            answer: ['Amo', 'gli', 'animali'],
            translation: t('Amo gli animali', 'I love animals'),
          },
          {
            id: 'a4-e3',
            type: 'audio-match',
            prompt: t('Ascolta', 'Listen'),
            word: { it: 'uccello', en: 'bird', audioUrl: null },
            options: [
              { id: 'a', label: t('Uccello', 'Bird'), correct: true },
              { id: 'b', label: t('Pesce', 'Fish'), correct: false },
              { id: 'c', label: t('Cane', 'Dog'), correct: false },
            ],
          },
          {
            id: 'a4-e4',
            type: 'translation',
            prompt: t('Traduci: "I have a dog"', 'Traduci: "Ho un cane"'),
            direction: 'en-to-it',
            source: 'I have a dog',
            answer: 'Ho un cane',
            alternatives: ['ho un cane', 'Io ho un cane'],
          },
          {
            id: 'a4-e5',
            type: 'fill-blank',
            prompt: t('Completa', 'Fill in'),
            sentence: t("L'____ vola nel cielo.", 'The ____ flies in the sky.'),
            blank: 'uccello',
            options: ['uccello', 'pesce', 'cane', 'gatto'],
            translation: t("L'uccello vola nel cielo", 'The bird flies in the sky'),
          },
          {
            id: 'a4-e6',
            type: 'true-false',
            prompt: t('I pesci nuotano nell\'acqua.', 'Fish swim in water.'),
            statement: t('Il pesce nuota', 'The fish swims'),
            correct: true,
            explanation: t('Sì! I pesci vivono nell\'acqua.', 'Yes! Fish live in water.'),
          },
          {
            id: 'a4-e7',
            type: 'match-word-image',
            prompt: t('Abbina gli amici', 'Match the friends'),
            pairs: [
              { word: t('Coniglio', 'Rabbit'), emoji: '🐰' },
              { word: t('Uccello', 'Bird'), emoji: '🐦' },
              { word: t('Pesce', 'Fish'), emoji: '🐟' },
              { word: t('Tartaruga', 'Turtle'), emoji: '🐢' },
            ],
          },
          {
            id: 'a4-e8',
            type: 'multiple-choice-image',
            prompt: t('Quale animale ha il guscio?', 'Which animal has a shell?'),
            options: [
              { id: 'a', emoji: '🐢', label: t('Tartaruga', 'Turtle'), correct: true },
              { id: 'b', emoji: '🐶', label: t('Cane', 'Dog'), correct: false },
              { id: 'c', emoji: '🐱', label: t('Gatto', 'Cat'), correct: false },
              { id: 'd', emoji: '🦁', label: t('Leone', 'Lion'), correct: false },
            ],
            word: { it: 'la tartaruga', en: 'the turtle', audioUrl: null },
          },
        ],
      },
    ],
    unitTest: {
      id: 'animali-test',
      title: t('Test Animali', 'Animals Test'),
      exercises: [
        {
          id: 'at-1',
          type: 'multiple-choice-image',
          prompt: t("Quale è 'il cane'?", "Which is 'the dog'?"),
          options: [
            { id: 'a', emoji: '🐶', label: t('Cane', 'Dog'), correct: true },
            { id: 'b', emoji: '🐱', label: t('Gatto', 'Cat'), correct: false },
            { id: 'c', emoji: '🐟', label: t('Pesce', 'Fish'), correct: false },
          ],
        },
        {
          id: 'at-2',
          type: 'translation',
          prompt: t('Traduci: "cat"', 'Traduci: "gatto"'),
          direction: 'en-to-it',
          source: 'cat',
          answer: 'gatto',
          alternatives: ['Gatto', 'il gatto'],
        },
        {
          id: 'at-3',
          type: 'order-words',
          prompt: t('Ordina', 'Order'),
          words: ['Il', 'leone', 'è', 'forte'],
          answer: ['Il', 'leone', 'è', 'forte'],
          translation: t('Il leone è forte', 'The lion is strong'),
        },
        {
          id: 'at-4',
          type: 'true-false',
          prompt: t('"La mucca" = the cow', '"La mucca" = the cow'),
          statement: t('"La mucca" significa the cow', '"La mucca" means the cow'),
          correct: true,
          explanation: t('Esatto!', 'Exactly!'),
        },
        {
          id: 'at-5',
          type: 'fill-blank',
          prompt: t('Completa', 'Fill in'),
          sentence: t('Il ____ miagola: miao!', 'The ____ meows!'),
          blank: 'gatto',
          options: ['gatto', 'cane', 'pesce'],
          translation: t('Il gatto miagola', 'The cat meows'),
        },
        {
          id: 'at-6',
          type: 'audio-match',
          prompt: t('Ascolta', 'Listen'),
          word: { it: 'elefante', en: 'elephant', audioUrl: null },
          options: [
            { id: 'a', label: t('Elefante', 'Elephant'), correct: true },
            { id: 'b', label: t('Topo', 'Mouse'), correct: false },
          ],
        },
      ],
    },
  },
]

export function getUnit(unitId) {
  return UNITS.find((u) => u.id === unitId)
}

export function getLesson(unitId, lessonId) {
  const unit = getUnit(unitId)
  if (!unit) return null
  if (lessonId === unit.unitTest?.id) return unit.unitTest
  return unit.lessons.find((l) => l.id === lessonId) || null
}

export function getUnitProgress(unit, completedLessons) {
  const total = unit.lessons.length + 1 // + unit test
  const done =
    unit.lessons.filter((l) => completedLessons.includes(l.id)).length +
    (completedLessons.includes(unit.unitTest.id) ? 1 : 0)
  return { done, total, pct: Math.round((done / total) * 100) }
}
