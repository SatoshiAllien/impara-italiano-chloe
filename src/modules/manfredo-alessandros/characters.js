/**
 * Character profiles for Manfredo and his Alessandros.
 * Icons: replace files in public/assets/manfredo/ and public/assets/alessandros/
 */

const t = (it, en) => ({ it, en })

export const CHARACTERS = {
  manfredo: {
    id: 'manfredo',
    iconKey: 'manfredo',
    name: t('Manfredo', 'Manfredo'),
    role: t('Star buffa · brand principale', 'Funny star · main brand'),
    emoji: '🎬',
    color: '#FF6B9D',
    gradient: 'linear-gradient(135deg, #ff6b9d, #c084fc, #38bdf8, #4ade80)',
    bio: t(
      'Manfredo è la star del video! Curioso, gentile e un po’ clown: insegna le lingue ridendo.',
      'Manfredo is the video star! Curious, kind and a bit of a clown: he teaches languages with laughs.'
    ),
    catchphrase: t(
      'Impariamo ridendo! 🤣🌈',
      "Let's learn while laughing! 🤣🌈"
    ),
    pronouns: t('lui / loro (come preferisci)', 'he / they (as you prefer)'),
    brandVideo: true,
  },
  'alessandro-1': {
    id: 'alessandro-1',
    iconKey: 'alessandro-1',
    name: t('Alessandro', 'Alessandro'),
    role: t('Compagno di Manfredo · saluti', "Manfredo's companion · greetings"),
    emoji: '💙',
    color: '#38BDF8',
    gradient: 'linear-gradient(135deg, #38bdf8, #818cf8)',
    bio: t(
      'Alessandro è il sorriso del team! Insieme a Manfredo insegna i saluti in italiano e in inglese.',
      "Alessandro is the smile of the team! With Manfredo he teaches greetings in Italian and English."
    ),
    catchphrase: t('Ciao a tutti! 👋', 'Hi everyone! 👋'),
    pronouns: t('lui', 'he'),
  },
  'alessandro-2': {
    id: 'alessandro-2',
    iconKey: 'alessandro-2',
    name: t('Alessandro Verde', 'Alessandro Green'),
    role: t('Maestro di cortesia', 'Politeness coach'),
    emoji: '💚',
    color: '#4ADE80',
    gradient: 'linear-gradient(135deg, #4ade80, #2dd4bf)',
    bio: t(
      'Alessandro Verde ricorda sempre di dire per favore e grazie. È super gentile!',
      'Alessandro Green always remembers please and thank you. He is super kind!'
    ),
    catchphrase: t('Per favore… e grazie! 🙏', 'Please… and thank you! 🙏'),
    pronouns: t('lui', 'he'),
  },
  'alessandro-3': {
    id: 'alessandro-3',
    iconKey: 'alessandro-3',
    name: t('Alessandro Rosa', 'Alessandro Pink'),
    role: t('Amico delle emozioni', 'Feelings friend'),
    emoji: '💗',
    color: '#F472B6',
    gradient: 'linear-gradient(135deg, #f472b6, #fb7185)',
    bio: t(
      'Alessandro Rosa aiuta a parlare di emozioni: sono felice, sono stanco, sono emozionato!',
      'Alessandro Pink helps talk about feelings: I am happy, I am tired, I am excited!'
    ),
    catchphrase: t('Come stai oggi? 😊', 'How are you today? 😊'),
    pronouns: t('lui / loro', 'he / they'),
  },
}

export const CHARACTER_LIST = Object.values(CHARACTERS)

export function getCharacter(id) {
  return CHARACTERS[id] || null
}
