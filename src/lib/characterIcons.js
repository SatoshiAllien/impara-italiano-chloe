/**
 * Character icon loader.
 * Drop PNG/SVG files into public/assets/manfredo/ and public/assets/alessandros/
 * using the filenames below — no code changes required.
 *
 * Supported extensions tried in order: .svg, .png, .webp, .jpg
 */

const EXT_ORDER = ['png', 'svg', 'webp', 'jpg', 'jpeg']

/**
 * Preferred extension per character (custom photos first).
 * Manfredo: public/assets/manfredo/manfredo.png
 * Alessandro (main companion): public/assets/alessandros/alessandro-1.png
 */
const PREFERRED_EXT = {
  manfredo: 'png',
  'alessandro-1': 'png',
  'alessandro-blue': 'png',
}

/** Canonical character keys → preferred public path (without extension) */
export const CHARACTER_ICON_BASES = {
  manfredo: '/assets/manfredo/manfredo',
  'alessandro-1': '/assets/alessandros/alessandro-1',
  'alessandro-2': '/assets/alessandros/alessandro-2',
  'alessandro-3': '/assets/alessandros/alessandro-3',
  'alessandro-blue': '/assets/alessandros/alessandro-1',
  'alessandro-green': '/assets/alessandros/alessandro-2',
  'alessandro-pink': '/assets/alessandros/alessandro-3',
}

/** Main brand icons (pair) + funny looping brand video */
export const APP_ICON_MANFREDO = '/assets/manfredo/manfredo.png'
export const APP_ICON_ALESSANDRO = '/assets/alessandros/alessandro-1.png'
/** Drop-in brand video: public/assets/manfredo/manfredo-brand.mp4 */
export const MANFREDO_BRAND_VIDEO = '/assets/manfredo/manfredo-brand.mp4'
export const FAVICON_MANFREDO = '/favicon-manfredo.png'
export const BRAND_ICONS = [APP_ICON_MANFREDO, APP_ICON_ALESSANDRO]

/** Fallback emoji when image fails or is missing */
export const CHARACTER_EMOJI_FALLBACK = {
  manfredo: '🌈',
  'alessandro-1': '💙',
  'alessandro-2': '💚',
  'alessandro-3': '💗',
  'alessandro-blue': '💙',
  'alessandro-green': '💚',
  'alessandro-pink': '💗',
}

const cache = new Map()

/**
 * Resolve icon URL for a character key.
 * Prefers .svg placeholders shipped with the app; user can replace with PNG etc.
 * @param {string} characterId
 * @param {{ ext?: string }} [opts]
 * @returns {string} public URL
 */
export function getCharacterIconUrl(characterId, opts = {}) {
  const base = CHARACTER_ICON_BASES[characterId]
  if (!base) return ''
  if (opts.ext) return `${base}.${opts.ext}`
  if (cache.has(characterId)) return cache.get(characterId)
  const ext = PREFERRED_EXT[characterId] || 'svg'
  const url = `${base}.${ext}`
  cache.set(characterId, url)
  return url
}

/**
 * Try alternate extensions when an image fails to load.
 * Call from onError on <img>.
 * @param {string} characterId
 * @param {HTMLImageElement} img
 */
export function tryNextCharacterIcon(characterId, img) {
  const base = CHARACTER_ICON_BASES[characterId]
  if (!base || !img) return false
  const current = img.getAttribute('src') || ''
  const currentExt = current.split('.').pop()?.toLowerCase()
  const start = Math.max(0, EXT_ORDER.indexOf(currentExt) + 1)
  for (let i = start; i < EXT_ORDER.length; i++) {
    const next = `${base}.${EXT_ORDER[i]}`
    if (next !== current) {
      cache.set(characterId, next)
      img.src = next
      return true
    }
  }
  return false
}

export function getCharacterEmoji(characterId) {
  return CHARACTER_EMOJI_FALLBACK[characterId] || '✨'
}

/**
 * List of icon slots users can replace.
 * Documented in README.
 */
export const CUSTOM_ICON_SLOTS = [
  {
    id: 'manfredo',
    folder: 'public/assets/manfredo/',
    files: ['manfredo.svg', 'manfredo.png'],
    label: 'Manfredo',
  },
  {
    id: 'alessandro-1',
    folder: 'public/assets/alessandros/',
    files: ['alessandro-1.svg', 'alessandro-1.png'],
    label: 'Alessandro (blue)',
  },
  {
    id: 'alessandro-2',
    folder: 'public/assets/alessandros/',
    files: ['alessandro-2.svg', 'alessandro-2.png'],
    label: 'Alessandro (green)',
  },
  {
    id: 'alessandro-3',
    folder: 'public/assets/alessandros/',
    files: ['alessandro-3.svg', 'alessandro-3.png'],
    label: 'Alessandro (pink)',
  },
]
