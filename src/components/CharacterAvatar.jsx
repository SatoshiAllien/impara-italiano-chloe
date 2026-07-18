import { useState } from 'react'
import {
  getCharacterEmoji,
  getCharacterIconUrl,
  tryNextCharacterIcon,
} from '../lib/characterIcons'

/**
 * Displays a character icon from public/assets.
 * Falls back through extensions, then emoji.
 */
export default function CharacterAvatar({
  characterId,
  size = 'md',
  className = '',
  alt = '',
  ring = true,
  style,
}) {
  const [failed, setFailed] = useState(false)
  const sizeClass =
    size === 'lg'
      ? 'w-24 h-24 text-4xl'
      : size === 'sm'
        ? 'w-12 h-12 text-xl'
        : size === 'xs'
          ? 'w-9 h-9 text-base'
          : 'w-16 h-16 text-2xl'

  const src = getCharacterIconUrl(characterId)
  const emoji = getCharacterEmoji(characterId)

  if (failed || !src) {
    return (
      <span
        className={`inline-flex items-center justify-center rounded-full bg-gradient-to-br from-violet-200 to-pink-200 font-black ${sizeClass} ${className}`}
        style={style}
        role="img"
        aria-label={alt || characterId}
      >
        {emoji}
      </span>
    )
  }

  return (
    <img
      src={src}
      alt={alt || characterId}
      className={`rounded-full object-cover shrink-0 ${ring ? 'ring-4 ring-white shadow-md' : ''} ${sizeClass} ${className}`}
      style={style}
      onError={(e) => {
        if (!tryNextCharacterIcon(characterId, e.currentTarget)) {
          setFailed(true)
        }
      }}
    />
  )
}
