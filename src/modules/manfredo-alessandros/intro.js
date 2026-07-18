/**
 * Intro scene for Manfredo & Alessandros module.
 */

const t = (it, en) => ({ it, en })

export const INTRO = {
  id: 'manfredo-intro',
  title: t(
    'Impara con Manfredo e i suoi Alessandri',
    'Learn with Manfredo and his Alessandros'
  ),
  subtitle: t(
    'Un percorso colorato, inclusivo e pieno di sorrisi!',
    'A colorful, inclusive path full of smiles!'
  ),
  heroEmoji: '🌈',
  scenes: [
    {
      id: 'scene-1',
      speakerId: 'manfredo',
      text: t(
        'Ciao! Io sono Manfredo. Benvenuto/a nella nostra famiglia arcobaleno!',
        "Hi! I'm Manfredo. Welcome to our rainbow family!"
      ),
    },
    {
      id: 'scene-2',
      speakerId: 'alessandro-1',
      text: t(
        'Io sono Alessandro Blu. Ti insegno a salutare in italiano e in inglese!',
        "I'm Alessandro Blue. I'll teach you how to greet in Italian and English!"
      ),
    },
    {
      id: 'scene-3',
      speakerId: 'alessandro-2',
      text: t(
        'Io sono Alessandro Verde. Parliamo di cortesia: per favore, grazie, prego!',
        "I'm Alessandro Green. We'll learn politeness: please, thank you, you're welcome!"
      ),
    },
    {
      id: 'scene-4',
      speakerId: 'alessandro-3',
      text: t(
        'Io sono Alessandro Rosa. Insieme parliamo di emozioni e amicizia!',
        "I'm Alessandro Pink. Together we'll talk about feelings and friendship!"
      ),
    },
    {
      id: 'scene-5',
      speakerId: 'manfredo',
      text: t(
        'Pronto/a? Scegli una lezione e impariamo giocando. Tutti sono i benvenuti qui! 🏳️‍🌈',
        "Ready? Pick a lesson and let's learn by playing. Everyone is welcome here! 🏳️‍🌈"
      ),
    },
  ],
  tips: [
    t('Ascolta le parole e ripetile ad alta voce.', 'Listen to the words and say them out loud.'),
    t('Non c’è fretta: puoi ripetere ogni lezione.', 'No rush: you can replay every lesson.'),
    t('Sii gentile con te stesso/a — ogni errore è un passo!', 'Be kind to yourself — every mistake is a step!'),
  ],
}
