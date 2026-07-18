/**
 * Module: Learn with Manfredo and his Alessandros
 * LGBTQ+ friendly rainbow path — parallel to classic Chloe units.
 */

import { INTRO } from './intro.js'
import { CHARACTERS, CHARACTER_LIST } from './characters.js'
import { DIALOGUES } from './dialogues.js'
import { VOCABULARY, VOCAB_LISTS } from './vocabulary.js'
import { MANFREDO_UNIT } from './lessons.js'

const t = (it, en) => ({ it, en })

/** @type {import('../registry').ModuleDef} */
const manfredoModule = {
  id: 'manfredo-alessandros',
  title: t(
    'Manfredo & Alessandri',
    'Manfredo & Alessandros'
  ),
  description: t(
    'Impara con Manfredo e i suoi Alessandri — colori, gentilezza e divertimento!',
    'Learn with Manfredo and his Alessandros — color, kindness and fun!'
  ),
  emoji: '🌈',
  color: '#FF6B9D',
  gradient:
    'linear-gradient(135deg, #ff6b9d 0%, #fbbf24 20%, #4ade80 40%, #38bdf8 60%, #a78bfa 80%, #f472b6 100%)',
  rainbowFriendly: true,
  unlockedByDefault: true,
  navLabel: 'manfredo',
  route: '/manfredo',
  units: [MANFREDO_UNIT],
  intro: INTRO,
  characters: CHARACTERS,
  characterList: CHARACTER_LIST,
  dialogues: DIALOGUES,
  vocabulary: VOCABULARY,
  vocabLists: VOCAB_LISTS,
}

export default manfredoModule
export {
  INTRO,
  CHARACTERS,
  CHARACTER_LIST,
  DIALOGUES,
  VOCABULARY,
  VOCAB_LISTS,
  MANFREDO_UNIT,
}
