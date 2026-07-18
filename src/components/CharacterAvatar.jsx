import { useEffect, useRef, useState } from 'react'
import {
  getCharacterEmoji,
  getCharacterIconUrl,
  tryNextCharacterIcon,
  MANFREDO_BRAND_VIDEO,
  APP_ICON_MANFREDO,
} from '../lib/characterIcons'

/**
 * Displays a character icon from public/assets.
 * Manfredo uses the funny brand video when available.
 */
export default function CharacterAvatar({
  characterId,
  size = 'md',
  className = '',
  alt = '',
  ring = true,
  style,
  preferVideo = true,
}) {
  const [failed, setFailed] = useState(false)
  const videoRef = useRef(null)
  const sizeClass =
    size === 'lg'
      ? 'w-24 h-24 text-4xl'
      : size === 'sm'
        ? 'w-12 h-12 text-xl'
        : size === 'xs'
          ? 'w-9 h-9 text-base'
          : 'w-16 h-16 text-2xl'

  const isManfredo = characterId === 'manfredo' && preferVideo
  const src = getCharacterIconUrl(characterId)
  const emoji = getCharacterEmoji(characterId)
  const ringCls = ring ? 'ring-4 ring-white shadow-md' : ''

  useEffect(() => {
    if (!isManfredo || failed) return
    const v = videoRef.current
    if (!v) return
    v.muted = true
    v.play()?.catch?.(() => {})
  }, [isManfredo, failed])

  if (isManfredo && !failed) {
    return (
      <video
        ref={videoRef}
        src={MANFREDO_BRAND_VIDEO}
        poster={APP_ICON_MANFREDO}
        className={`rounded-full object-cover shrink-0 ${ringCls} ${sizeClass} ${className}`}
        style={style}
        autoPlay
        muted
        loop
        playsInline
        aria-label={alt || 'Manfredo'}
        onError={() => setFailed(true)}
      />
    )
  }

  if (failed || !src) {
    if (isManfredo) {
      return (
        <img
          src={APP_ICON_MANFREDO}
          alt={alt || 'Manfredo'}
          className={`rounded-full object-cover shrink-0 ${ringCls} ${sizeClass} ${className}`}
          style={style}
        />
      )
    }
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
      className={`rounded-full object-cover shrink-0 ${ringCls} ${sizeClass} ${className}`}
      style={style}
      onError={(e) => {
        if (!tryNextCharacterIcon(characterId, e.currentTarget)) {
          setFailed(true)
        }
      }}
    />
  )
}
