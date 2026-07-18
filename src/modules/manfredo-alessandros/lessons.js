/**
 * Lessons + unit test for Manfredo & Alessandros.
 * Compatible with existing ExerciseRenderer exercise types.
 */

const t = (it, en) => ({ it, en })

export const MANFREDO_UNIT = {
  id: 'manfredo-alessandros',
  order: 10,
  moduleId: 'manfredo-alessandros',
  unlockedByDefault: true,
  title: t(
    'Manfredo e gli Alessandri',
    'Manfredo & the Alessandros'
  ),
  description: t(
    'Saluti, cortesia ed emozioni con la famiglia arcobaleno!',
    'Greetings, politeness and feelings with the rainbow family!'
  ),
  emoji: '🌈',
  color: '#FF6B9D',
  lessons: [
    // ── Lesson 1: Ciao con Manfredo ──────────────────────────
    {
      id: 'manfredo-1',
      title: t('Ciao con Manfredo', 'Hello with Manfredo'),
      intro: t(
        'Manfredo ti saluta! Impara ciao, buongiorno e come stai.',
        'Manfredo greets you! Learn ciao, buongiorno and come stai.'
      ),
      exercises: [
        {
          id: 'm1-e1',
          type: 'multiple-choice-image',
          prompt: t("Quale immagine mostra 'ciao'?", "Which picture means 'ciao'?"),
          options: [
            { id: 'a', emoji: '👋', label: t('Ciao', 'Hello'), correct: true },
            { id: 'b', emoji: '🌙', label: t('Notte', 'Night'), correct: false },
            { id: 'c', emoji: '🍕', label: t('Pizza', 'Pizza'), correct: false },
            { id: 'd', emoji: '📚', label: t('Libro', 'Book'), correct: false },
          ],
          word: { it: 'ciao', en: 'hello', audioUrl: null },
        },
        {
          id: 'm1-e2',
          type: 'audio-match',
          prompt: t('Ascolta e scegli', 'Listen and choose'),
          word: { it: 'buongiorno', en: 'good morning', audioUrl: null },
          options: [
            { id: 'a', label: t('Buongiorno', 'Good morning'), correct: true },
            { id: 'b', label: t('Buonanotte', 'Good night'), correct: false },
            { id: 'c', label: t('Grazie', 'Thank you'), correct: false },
          ],
        },
        {
          id: 'm1-e3',
          type: 'fill-blank',
          prompt: t('Completa', 'Fill in'),
          sentence: t('____, mi chiamo Manfredo!', '____, my name is Manfredo!'),
          blank: 'Ciao',
          options: ['Ciao', 'Gatto', 'Rosso', 'Acqua'],
          translation: t('Ciao, mi chiamo Manfredo', 'Hi, my name is Manfredo'),
        },
        {
          id: 'm1-e4',
          type: 'true-false',
          prompt: t('"Come stai?" significa "How are you?"', '"Come stai?" means "How are you?"'),
          statement: t('"Come stai?" = How are you?', '"Come stai?" = How are you?'),
          correct: true,
          explanation: t('Esatto! È un saluto amichevole.', "Exactly! It's a friendly greeting."),
        },
        {
          id: 'm1-e5',
          type: 'translation',
          prompt: t('Come si dice "hello" in italiano?', 'How do you say "ciao" in English?'),
          direction: 'en-to-it',
          source: 'hello',
          answer: 'ciao',
          alternatives: ['Ciao'],
        },
        {
          id: 'm1-e6',
          type: 'order-words',
          prompt: t('Ordina le parole', 'Order the words'),
          words: ['Ciao', 'sono', 'Manfredo'],
          answer: ['Ciao', 'sono', 'Manfredo'],
          translation: t('Ciao, sono Manfredo', "Hi, I'm Manfredo"),
        },
        {
          id: 'm1-e7',
          type: 'match-word-image',
          prompt: t('Abbina', 'Match'),
          pairs: [
            { word: t('Ciao', 'Hello'), emoji: '👋' },
            { word: t('Buongiorno', 'Good morning'), emoji: '☀️' },
            { word: t('Buonanotte', 'Good night'), emoji: '🌙' },
          ],
        },
        {
          id: 'm1-e8',
          type: 'multiple-choice-image',
          prompt: t("Cosa dici di sera? 'Buonasera'", "What do you say in the evening? 'Buonasera'"),
          options: [
            { id: 'a', emoji: '🌆', label: t('Buonasera', 'Good evening'), correct: true },
            { id: 'b', emoji: '☀️', label: t('Buongiorno', 'Good morning'), correct: false },
            { id: 'c', emoji: '🐶', label: t('Cane', 'Dog'), correct: false },
            { id: 'd', emoji: '🍎', label: t('Mela', 'Apple'), correct: false },
          ],
          word: { it: 'buonasera', en: 'good evening', audioUrl: null },
        },
      ],
    },

    // ── Lesson 2: Cortesia con Alessandro Verde ──────────────
    {
      id: 'manfredo-2',
      title: t('Grazie con Alessandro Verde', 'Thanks with Alessandro Green'),
      intro: t(
        'Alessandro Verde insegna per favore, grazie e prego.',
        'Alessandro Green teaches please, thank you and you\'re welcome.'
      ),
      exercises: [
        {
          id: 'm2-e1',
          type: 'multiple-choice-image',
          prompt: t("Quale significa 'grazie'?", "Which means 'thank you'?"),
          options: [
            { id: 'a', emoji: '💖', label: t('Grazie', 'Thank you'), correct: true },
            { id: 'b', emoji: '😴', label: t('Notte', 'Night'), correct: false },
            { id: 'c', emoji: '🍕', label: t('Pizza', 'Pizza'), correct: false },
            { id: 'd', emoji: '🐱', label: t('Gatto', 'Cat'), correct: false },
          ],
          word: { it: 'grazie', en: 'thank you', audioUrl: null },
        },
        {
          id: 'm2-e2',
          type: 'fill-blank',
          prompt: t('Completa', 'Fill in'),
          sentence: t('Un gelato, ____?', 'An ice cream, ____?'),
          blank: 'per favore',
          options: ['per favore', 'gatto', 'rosso', 'notte'],
          translation: t('Un gelato, per favore?', 'An ice cream, please?'),
        },
        {
          id: 'm2-e3',
          type: 'true-false',
          prompt: t('"Prego" può significare "You\'re welcome".', '"Prego" can mean "You\'re welcome".'),
          statement: t('"Prego" = You\'re welcome', '"Prego" = You\'re welcome'),
          correct: true,
          explanation: t('Sì! Dopo un "grazie" rispondiamo "prego".', 'Yes! After "thank you" we say "prego".'),
        },
        {
          id: 'm2-e4',
          type: 'translation',
          prompt: t('Traduci: "please"', 'Traduci: "per favore"'),
          direction: 'en-to-it',
          source: 'please',
          answer: 'per favore',
          alternatives: ['Per favore', 'perpiacere', 'per piacere'],
        },
        {
          id: 'm2-e5',
          type: 'audio-match',
          prompt: t('Ascolta', 'Listen'),
          word: { it: 'grazie', en: 'thank you', audioUrl: null },
          options: [
            { id: 'a', label: t('Grazie', 'Thank you'), correct: true },
            { id: 'b', label: t('Ciao', 'Hello'), correct: false },
            { id: 'c', label: t('Acqua', 'Water'), correct: false },
          ],
        },
        {
          id: 'm2-e6',
          type: 'order-words',
          prompt: t('Ordina', 'Order'),
          words: ['Grazie', 'mille', '!'],
          answer: ['Grazie', 'mille', '!'],
          translation: t('Grazie mille!', 'Thank you so much!'),
        },
        {
          id: 'm2-e7',
          type: 'match-word-image',
          prompt: t('Abbina', 'Match'),
          pairs: [
            { word: t('Grazie', 'Thank you'), emoji: '💖' },
            { word: t('Per favore', 'Please'), emoji: '🙏' },
            { word: t('Prego', "You're welcome"), emoji: '✨' },
          ],
        },
        {
          id: 'm2-e8',
          type: 'fill-blank',
          prompt: t('Completa la risposta', 'Complete the reply'),
          sentence: t('— Grazie! — ____!', '— Thank you! — ____!'),
          blank: 'Prego',
          options: ['Prego', 'Buongiorno', 'Cane', 'Tre'],
          translation: t('Prego!', "You're welcome!"),
        },
      ],
    },

    // ── Lesson 3: Emozioni con Alessandro Rosa ───────────────
    {
      id: 'manfredo-3',
      title: t('Emozioni con Alessandro Rosa', 'Feelings with Alessandro Pink'),
      intro: t(
        'Parliamo di emozioni: felice, stanco, emozionato…',
        "Let's talk about feelings: happy, tired, excited…"
      ),
      exercises: [
        {
          id: 'm3-e1',
          type: 'multiple-choice-image',
          prompt: t("Quale faccia è 'felice'?", "Which face is 'happy'?"),
          options: [
            { id: 'a', emoji: '😄', label: t('Felice', 'Happy'), correct: true },
            { id: 'b', emoji: '😢', label: t('Triste', 'Sad'), correct: false },
            { id: 'c', emoji: '😴', label: t('Stanco', 'Tired'), correct: false },
            { id: 'd', emoji: '🤒', label: t('Malato', 'Sick'), correct: false },
          ],
          word: { it: 'felice', en: 'happy', audioUrl: null },
        },
        {
          id: 'm3-e2',
          type: 'fill-blank',
          prompt: t('Completa', 'Fill in'),
          sentence: t('Oggi sono ____!', 'Today I am ____!'),
          blank: 'felice',
          options: ['felice', 'libro', 'tavolo', 'blu'],
          translation: t('Oggi sono felice!', 'Today I am happy!'),
        },
        {
          id: 'm3-e3',
          type: 'true-false',
          prompt: t('"Stanco" significa "tired".', '"Stanco" means "tired".'),
          statement: t('"Stanco/a" = tired', '"Stanco/a" = tired'),
          correct: true,
          explanation: t('Sì! Si dice stanco (m) o stanca (f).', 'Yes! stanco (m) or stanca (f).'),
        },
        {
          id: 'm3-e4',
          type: 'translation',
          prompt: t('Traduci: "friend"', 'Traduci: "amico"'),
          direction: 'en-to-it',
          source: 'friend',
          answer: 'amico',
          alternatives: ['Amico', 'amica', 'Amica'],
        },
        {
          id: 'm3-e5',
          type: 'audio-match',
          prompt: t('Ascolta', 'Listen'),
          word: { it: 'felice', en: 'happy', audioUrl: null },
          options: [
            { id: 'a', label: t('Felice', 'Happy'), correct: true },
            { id: 'b', label: t('Triste', 'Sad'), correct: false },
            { id: 'c', label: t('Pizza', 'Pizza'), correct: false },
          ],
        },
        {
          id: 'm3-e6',
          type: 'order-words',
          prompt: t('Ordina', 'Order'),
          words: ['Sono', 'felice', 'oggi'],
          answer: ['Sono', 'felice', 'oggi'],
          translation: t('Sono felice oggi', 'I am happy today'),
        },
        {
          id: 'm3-e7',
          type: 'match-word-image',
          prompt: t('Abbina le emozioni', 'Match the feelings'),
          pairs: [
            { word: t('Felice', 'Happy'), emoji: '😄' },
            { word: t('Stanco', 'Tired'), emoji: '😴' },
            { word: t('Emozionato', 'Excited'), emoji: '🤩' },
          ],
        },
        {
          id: 'm3-e8',
          type: 'multiple-choice-image',
          prompt: t("Siamo ____! (amici)", "We are ____! (friends)"),
          options: [
            { id: 'a', emoji: '🤝', label: t('Amici', 'Friends'), correct: true },
            { id: 'b', emoji: '🐟', label: t('Pesci', 'Fish'), correct: false },
            { id: 'c', emoji: '🚗', label: t('Auto', 'Cars'), correct: false },
            { id: 'd', emoji: '🌙', label: t('Notti', 'Nights'), correct: false },
          ],
          word: { it: 'amici', en: 'friends', audioUrl: null },
        },
      ],
    },

    // ── Lesson 4: Famiglia arcobaleno ────────────────────────
    {
      id: 'manfredo-4',
      title: t('Famiglia arcobaleno', 'Rainbow family'),
      intro: t(
        'Tutti sono i benvenuti. Impara parole di inclusione e amore.',
        'Everyone is welcome. Learn words of inclusion and love.'
      ),
      exercises: [
        {
          id: 'm4-e1',
          type: 'multiple-choice-image',
          prompt: t("Quale immagine mostra 'famiglia'?", "Which picture shows 'family'?"),
          options: [
            { id: 'a', emoji: '👨‍👩‍👧‍👦', label: t('Famiglia', 'Family'), correct: true },
            { id: 'b', emoji: '🚲', label: t('Bici', 'Bike'), correct: false },
            { id: 'c', emoji: '🍎', label: t('Mela', 'Apple'), correct: false },
            { id: 'd', emoji: '⚽', label: t('Palla', 'Ball'), correct: false },
          ],
          word: { it: 'famiglia', en: 'family', audioUrl: null },
        },
        {
          id: 'm4-e2',
          type: 'fill-blank',
          prompt: t('Completa', 'Fill in'),
          sentence: t('Impariamo ____!', 'We learn ____!'),
          blank: 'insieme',
          options: ['insieme', 'gatto', 'tavolo', 'sette'],
          translation: t('Impariamo insieme!', 'We learn together!'),
        },
        {
          id: 'm4-e3',
          type: 'true-false',
          prompt: t('"Benvenuto/a" significa "Welcome".', '"Benvenuto/a" means "Welcome".'),
          statement: t('"Benvenuto/a" = Welcome', '"Benvenuto/a" = Welcome'),
          correct: true,
          explanation: t('Sì! Tutti sono i benvenuti qui.', 'Yes! Everyone is welcome here.'),
        },
        {
          id: 'm4-e4',
          type: 'translation',
          prompt: t('Traduci: "love"', 'Traduci: "amore"'),
          direction: 'en-to-it',
          source: 'love',
          answer: 'amore',
          alternatives: ['Amore'],
        },
        {
          id: 'm4-e5',
          type: 'order-words',
          prompt: t('Ordina', 'Order'),
          words: ['Tutti', 'sono', 'i', 'benvenuti'],
          answer: ['Tutti', 'sono', 'i', 'benvenuti'],
          translation: t('Tutti sono i benvenuti', 'Everyone is welcome'),
        },
        {
          id: 'm4-e6',
          type: 'audio-match',
          prompt: t('Ascolta', 'Listen'),
          word: { it: 'insieme', en: 'together', audioUrl: null },
          options: [
            { id: 'a', label: t('Insieme', 'Together'), correct: true },
            { id: 'b', label: t('Sole', 'Sun'), correct: false },
            { id: 'c', label: t('Libro', 'Book'), correct: false },
          ],
        },
        {
          id: 'm4-e7',
          type: 'match-word-image',
          prompt: t('Abbina', 'Match'),
          pairs: [
            { word: t('Famiglia', 'Family'), emoji: '👨‍👩‍👧‍👦' },
            { word: t('Amore', 'Love'), emoji: '💕' },
            { word: t('Insieme', 'Together'), emoji: '🌈' },
          ],
        },
        {
          id: 'm4-e8',
          type: 'multiple-choice-image',
          prompt: t('La nostra famiglia è…', 'Our family is…'),
          options: [
            { id: 'a', emoji: '🌈', label: t('Colorata!', 'Colorful!'), correct: true },
            { id: 'b', emoji: '🧊', label: t('Fredda', 'Cold'), correct: false },
            { id: 'c', emoji: '🪨', label: t('Di pietra', 'Made of stone'), correct: false },
            { id: 'd', emoji: '🔇', label: t('Silenziosa', 'Silent'), correct: false },
          ],
          word: { it: 'arcobaleno', en: 'rainbow', audioUrl: null },
        },
      ],
    },
  ],

  unitTest: {
    id: 'manfredo-test',
    title: t('Test arcobaleno', 'Rainbow test'),
    exercises: [
      {
        id: 'mt-1',
        type: 'multiple-choice-image',
        prompt: t("Come si dice 'hello'?", "How do you say 'ciao'?"),
        options: [
          { id: 'a', emoji: '👋', label: t('Ciao', 'Hello'), correct: true },
          { id: 'b', emoji: '🍎', label: t('Mela', 'Apple'), correct: false },
          { id: 'c', emoji: '🐶', label: t('Cane', 'Dog'), correct: false },
        ],
      },
      {
        id: 'mt-2',
        type: 'translation',
        prompt: t('Traduci: "thank you"', 'Traduci: "grazie"'),
        direction: 'en-to-it',
        source: 'thank you',
        answer: 'grazie',
        alternatives: ['Grazie'],
      },
      {
        id: 'mt-3',
        type: 'fill-blank',
        prompt: t('Completa', 'Fill in'),
        sentence: t('____ stai?', '____ are you?'),
        blank: 'Come',
        options: ['Come', 'Cane', 'Casa', 'Cibo'],
        translation: t('Come stai?', 'How are you?'),
      },
      {
        id: 'mt-4',
        type: 'true-false',
        prompt: t('Tutti sono i benvenuti nella famiglia di Manfredo.', 'Everyone is welcome in Manfredo\'s family.'),
        statement: t('Inclusione = sì!', 'Inclusion = yes!'),
        correct: true,
        explanation: t('Proprio così! 🌈', "That's right! 🌈"),
      },
      {
        id: 'mt-5',
        type: 'order-words',
        prompt: t('Ordina', 'Order'),
        words: ['Grazie', 'mille'],
        answer: ['Grazie', 'mille'],
        translation: t('Grazie mille', 'Thank you so much'),
      },
      {
        id: 'mt-6',
        type: 'audio-match',
        prompt: t('Ascolta', 'Listen'),
        word: { it: 'felice', en: 'happy', audioUrl: null },
        options: [
          { id: 'a', label: t('Felice', 'Happy'), correct: true },
          { id: 'b', label: t('Triste', 'Sad'), correct: false },
        ],
      },
    ],
  },
}
